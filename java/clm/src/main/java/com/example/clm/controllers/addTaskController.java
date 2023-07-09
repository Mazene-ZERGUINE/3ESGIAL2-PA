package com.example.clm.controllers;

import com.example.clm.Main;
import com.example.clm.models.Tasks;
import com.example.clm.models.Users;
import com.example.clm.utils.ApiService;
import com.example.clm.utils.NotifierService;
import com.example.clm.utils.SceneService;
import com.example.clm.utils.StorageService;
import com.github.tsohr.JSONArray;
import com.github.tsohr.JSONObject;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.stage.Stage;
import tray.notification.NotificationType;

import java.io.IOException;
import java.net.URL;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

public class addTaskController implements Initializable {

	private final NotifierService notifierService = new NotifierService() ;
	private final ApiService api = new ApiService() ;
	private final static String baseUrl = "http://localhost:3000/api/client/" ;
	@FXML
	private Button addBtn;

	@FXML
	private DatePicker startDate;

	private String categoryTitle;
	@FXML
	private DatePicker deadline;
	private final static SceneService sceneService = new SceneService();
	private Parent root;

	private List<Users> users = new ArrayList<>();
	@FXML
	private ListView<String> usersList;
	@FXML
	private Label usersNumber;

	@FXML
	private TextArea description;

	@FXML
	private Button quitBtn;

	@FXML
	private TextField title;
	@FXML
	private List<String > selectedUsers = new ArrayList<>() ;

	private int categoryId ;


	public void setData(int categoryId) {
			this.categoryId = categoryId ;
		StringBuilder response = null;
		try {
			response = api.getTypeRequest(baseUrl + "categories/project/" + categoryId);
		} catch (IOException ex) {
			notifierService.notify(NotificationType.WARNING , "Attention" , "Connection perdu vous etes en mode hros ligne");

		}
		JSONObject jsonResponse = new JSONObject(response.toString());
		JSONArray dataArray = jsonResponse.getJSONArray("projects") ;
		System.out.println(dataArray.toString());
		for (int i = 0 ; i< dataArray.length() ; i++){
			Users user = new Users(
				dataArray.getJSONObject(i).getInt("id"),
				dataArray.getJSONObject(i).getString("first_name"),
				dataArray.getJSONObject(i).getString("last_name"),
				dataArray.getJSONObject(i).getString("email"),
				dataArray.getJSONObject(i).getString("password"),
				dataArray.getJSONObject(i).getString("created_at"),
				dataArray.getJSONObject(i).getString("role")
				//dataArray.getJSONObject(i).getString("updated_at")
			);
			users.add(user) ;
			usersList.getItems().add( dataArray.getJSONObject(i).getString("first_name")) ;
		}
		usersList.getSelectionModel().setSelectionMode(SelectionMode.MULTIPLE); ;
	}

	public void setBackData(String title) {
		categoryTitle = title;
	}

	@FXML
	void onAddBtnClick(ActionEvent event) throws IOException {
		// getting text fields values
		String taskTitle = title.getText();
		String taskDescription = description.getText() ;
		LocalDate taskDeadline = deadline.getValue();
		LocalDate creationDate = startDate.getValue() ;
		// list of the selected items from the list
		ObservableList<String> selectedItems = usersList.getSelectionModel().getSelectedItems();

		// checking if the required fileds are empty or not
		if (taskTitle.isEmpty() ||taskDeadline.toString().isEmpty()  || startDate.toString().isEmpty()) {
			notifierService.notify(NotificationType.ERROR , "Erreur" , "Le titre, la description et au moins un membre sont requis.");
			return;
		}
		// checking selected date
		LocalDate now = LocalDate.now() ;
		if(creationDate.isBefore(now) || taskDeadline.isBefore(now)) {
			notifierService.notify(NotificationType.ERROR , "Erreur" , "La date de début ou la date limite ne peuvent pas être définies avant ce jour.");
			return;
		}

		if(creationDate.isAfter(taskDeadline)) {
			notifierService.notify(NotificationType.ERROR , "Erreur" , "La date de début ne peut pas dépasser la date limite.");
			return;
		}

		// creating the request json body
		JSONObject json = new JSONObject() ;
		json.put("category_id" , this.categoryId) ;
		json.put("label" , taskTitle) ;
		json.put("description" , taskDescription) ;
		json.put("deadline" , taskDeadline.toString()) ;
		json.put("startDate" , creationDate.toString());
		JSONArray members = new JSONArray(selectedItems);  // creating a json array of the list to add it to the request body
		json.put("members" , members) ;
		try {
			StringBuilder response = api.postTypeRequest(baseUrl + "tasks" , json) ;
			JSONObject jsonResponse = new JSONObject(response.toString());
			// if the request is a success notifying the user and adding clearing the filds
			if (jsonResponse.getInt("status_code") == 200) {
				FXMLLoader fxmlLoader = new FXMLLoader(Main.class.getResource("templates/tasks-view.fxml"));
				root = fxmlLoader.load() ;
				TasksController controller = fxmlLoader.getController();
				controller.refreshList();
				notifierService.notify(NotificationType.SUCCESS , "Succès" , "Tâche ajoutée.");
				this.title.clear();
				this.deadline.setValue(null);
				this.description.clear();
				this.startDate.setValue(null);

			} else {
				notifierService.notify(NotificationType.ERROR , "Erreur" , "Une erreur est survenu lors de l'ajout.");
			}
		} catch (Exception e) {
			Tasks task = new Tasks(
					0,
					taskTitle,
					taskDescription,
					creationDate.toString(),
					taskDeadline.toString(),
					"A FAIRE",
					" ",
					creationDate.toString()
			);

			if (StorageService.getInstance().getProjectTasksDict().containsKey(this.categoryTitle)) {
				List<Tasks> tasks = StorageService.getInstance().getProjectTasksDict().get(this.categoryTitle);
				tasks.add(task);
			} else {
				List<Tasks> tasks = new ArrayList<>();
				tasks.add(task);
				StorageService.getInstance().getProjectTasksDict().put(this.categoryTitle , tasks);
			}

		}
	}
	@FXML
	void onQuitBtnClick(ActionEvent event) {
		Stage stage = (Stage) quitBtn.getScene().getWindow() ;
		stage.close();
	}

	private void setTheme() throws IOException {
		if (StorageService.getInstance().getThemeName() == null) {
			StorageService.getInstance().setThemeName("mainTheme");
		}
		addBtn.sceneProperty().addListener((observable, oldValue, newValue) -> {
			if (newValue != null) {
				Scene scene = addBtn.getScene();

				StorageService.getInstance().setSelectedTheme(scene);
			}
		});
	}

	@Override
	public void initialize(URL url, ResourceBundle resourceBundle)  {
		try {
			setTheme();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
}


