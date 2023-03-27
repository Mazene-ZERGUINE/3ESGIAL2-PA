package com.example.clm.controllers;

import com.example.clm.models.Categorie;
import com.example.clm.models.Users;
import com.example.clm.utils.ApiService;
import com.example.clm.utils.NotifierService;
import com.github.tsohr.JSONArray;
import com.github.tsohr.JSONObject;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.*;
import javafx.scene.input.MouseEvent;
import javafx.stage.Stage;
import tray.notification.NotificationType;

import java.io.IOException;
import java.net.URL;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

public class addTaskController implements Initializable {

	private final NotifierService notifierService = new NotifierService() ;
	private final ApiService api = new ApiService() ;
	private final static String baseUrl = "http://localhost:3000/api/client/" ;
	@FXML
	private Button addBtn;

	@FXML
	private DatePicker deadline;

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
	}

	@FXML
	void onAddBtnClick(ActionEvent event) throws IOException {
		// getting text fields values
		String taskTitle = title.getText();
		String taskDescription = description.getText() ;
		LocalDate taskDeadline = deadline.getValue();
		LocalDate creationDate = LocalDate.now() ;
		// list of the selected items from the list
		ObservableList<String> selectedItems = usersList.getSelectionModel().getSelectedItems();

		// checking if the required fileds are empty or not
		if (taskTitle.isEmpty() ||taskDeadline.toString().isEmpty() || selectedItems.size() == 0) {
			notifierService.notify(NotificationType.ERROR , "Error" , "title and description and at least one member are required to create task");
			return;
		}
		// checking selected date
		LocalDate now = LocalDate.now() ;
		if(now.compareTo(taskDeadline) >= 0) {
			notifierService.notify(NotificationType.ERROR , "Error" , "deadline date can not be before today");
			return;
		}
		//getting the id of the selected users
		List<Integer> userIds = users.stream()
			.filter(u -> selectedItems.contains(u.getFirstName()))
			.map(Users::getId)
			.collect(Collectors.toList());

		// creating the request json body
		JSONObject json = new JSONObject() ;
		json.put("category_id" , this.categoryId) ;
		json.put("label" , taskTitle) ;
		json.put("description" , taskDescription) ;
		json.put("deadline" , taskDeadline.toString()) ;
		JSONArray members = new JSONArray(userIds);  // creating a json array of the list to add it to the request body
		json.put("members" , members) ;
		System.out.println(json);
		StringBuilder response = api.patchTypeRequest(baseUrl + "tasks" , json) ;
		JSONObject jsonResponse = new JSONObject(response.toString());

		// if the request is a success notifying the user and adding clearing the filds
		if (jsonResponse.getInt("status_code") == 200) {
			notifierService.notify(NotificationType.SUCCESS , "Success" , "New task added");
			this.title.clear();
			this.deadline.setValue(null);
			this.description.clear();
		} else {
			notifierService.notify(NotificationType.ERROR , "Error" , "Error occurred while adding the new task");
		}
	}
	@FXML
	void onQuitBtnClick(ActionEvent event) {
		Stage stage = (Stage) quitBtn.getScene().getWindow() ;
		stage.close();
	}

	private void getAllUsers() throws IOException {
		StringBuilder response = api.getTypeRequest(baseUrl + "users/") ;
		JSONObject json = new JSONObject(response.toString()) ;
		JSONArray dataArray = json.getJSONArray("users") ;
		for (int i = 0 ; i < dataArray.length() ; i++) {
			Users user = new Users(
				dataArray.getJSONObject(i).getInt("id"),
				dataArray.getJSONObject(i).getString("firstname"),
				dataArray.getJSONObject(i).getString("lastname"),
				dataArray.getJSONObject(i).getString("email"),
				dataArray.getJSONObject(i).getString("email"),
				dataArray.getJSONObject(i).getString("created_at")
				//dataArray.getJSONObject(i).getString("updated_at")
			);
			users.add(user) ;
			usersList.getItems().add( dataArray.getJSONObject(i).getString("firstname")) ;
		}
		usersList.getSelectionModel().setSelectionMode(SelectionMode.MULTIPLE); ;
	}
	@Override
	public void initialize(URL url, ResourceBundle resourceBundle)  {
		try {
			getAllUsers();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
}


