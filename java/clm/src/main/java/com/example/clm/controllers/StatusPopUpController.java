package com.example.clm.controllers;

import com.example.clm.models.Tasks;
import com.example.clm.models.Users;
import com.example.clm.utils.ApiService;
import com.example.clm.utils.NotifierService;
import com.example.clm.utils.StorageService;
import com.github.tsohr.JSONArray;
import com.github.tsohr.JSONObject;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.stage.Stage;
import tray.notification.NotificationType;

import java.io.IOException;
import java.net.URL;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.ResourceBundle;

public class StatusPopUpController  implements Initializable {


	private final String baseUrl = "http://localhost:3000/api/client/";

	private final static ApiService api = new ApiService();
	private final static NotifierService notifierService = new NotifierService();
	private int taskId;
	public void setData(int taskId) throws IOException {
		this.taskId = taskId;
		getTaskData(taskId);
	}
	private String categoryTitle;

	public void setLabelName(String label , String category) throws IOException {
		this.taskLabel = label;
		this.categoryTitle = category;
		getOflineTaskData(label , category);
	}

	private String taskLabel;
	@FXML
	private Button closeBtn;

	private Tasks data ;
	@FXML
	private ListView<String> usersList;
	private List<Users> users = new ArrayList<>();

	@FXML

	private DatePicker deadline;

	@FXML
	private TextArea description;

	@FXML
	private ComboBox<String> status;

	@FXML
	private TextField title;

	@FXML
	private Button updateBtn;
	private Stage stage ;

	@FXML
	void onCloseBtnClick(ActionEvent event) {
		stage =(Stage) closeBtn.getScene().getWindow();
		stage.hide();
		stage.close();
	}

	@FXML
	void onUpdateBtnClick(ActionEvent event) throws IOException {
		String label = this.title.getText();
		String description = this.description.getText();
		LocalDate deadline = this.deadline.getValue();
		String status = this.status.getValue();


		try {
			ObservableList<String> selectedUsers = usersList.getSelectionModel().getSelectedItems();

			JSONObject body = new JSONObject() ;
			body.put("label", label);
			body.put("description", description);
			body.put("deadline", deadline);
			body.put("status" , status);
			body.put("members" , selectedUsers);
			StringBuilder response = 	api.putTypeRequest(baseUrl + "tasks/" + taskId + "/update" , body) ;
			JSONObject jsonResponse = new JSONObject(response.toString()) ;
			if (jsonResponse.getInt("status_code") == 200) {
				notifierService.notify(NotificationType.SUCCESS , "Succès" , "Tâche mise à jour.");
				this.stage =(Stage)updateBtn.getScene().getWindow() ;
				stage.hide();
				stage.close();
			}
		} catch (Exception e) {
			List<Tasks> tasks = StorageService.getInstance().getProjectTasksDict().get(categoryTitle);
			tasks.stream()
					.filter(task -> task.getLabel().equals(this.taskLabel))
					.findFirst()
					.ifPresent(task -> {
						task.setStatus(status);
						task.setDeadline(deadline.toString());
						task.setLabel(label);
						task.setDescription(description);
					});
			notifierService.notify(NotificationType.SUCCESS , "Succès" , "Tâche mise à jour.");
			this.stage =(Stage)updateBtn.getScene().getWindow() ;
			stage.hide();
			stage.close();
		}
	}

	private void setTheme() throws IOException {
		if (StorageService.getInstance().getThemeName() == null) {
			StorageService.getInstance().setThemeName("mainTheme");
		}
		this.status.sceneProperty().addListener((observable, oldValue, newValue) -> {
			if (newValue != null) {
				Scene scene = this.status.getScene();

				StorageService.getInstance().setSelectedTheme(scene);
			}
		});
	}

	private void updateStatus(String status , Stage stage) throws IOException {
		JSONObject data = new JSONObject().put("status" , status);
		StringBuilder response = api.putTypeRequest(baseUrl +"tasks/" +taskId  ,data ) ;
		JSONObject jsonResponse = new JSONObject(response.toString());
		if (jsonResponse.getInt("status_code") == 200) {
			notifierService.notify(NotificationType.SUCCESS , "Succès" , "Tâche mise à jour.");
			stage.hide();
			stage.close();
		} else {
			notifierService.notify(NotificationType.ERROR , "Erreur" , "Mauvaise requête.");
		}
	}
	private void getAllUsers()  {
		StringBuilder response = null;
		try {
			response = api.getTypeRequest(baseUrl + "users/");

			JSONObject json = new JSONObject(response.toString()) ;
			JSONArray dataArray = json.getJSONArray("users") ;
			for (int i = 0 ; i < dataArray.length() ; i++) {
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
		} catch (IOException e) {
			usersList = null;
		}
	}

	public void getTaskData(int taskId) throws IOException {
		StringBuilder response = api.getTypeRequest(baseUrl + "tasks/" + taskId + "/task");
		JSONObject jsonResponse = new JSONObject(response.toString());
		System.out.println(jsonResponse);
		if (jsonResponse.getInt("status_code") == 200) {
			JSONObject data = jsonResponse.getJSONArray("tasks").getJSONObject(0);
			Instant instant = Instant.parse(data.getString("deadline"));
			ZoneId zoneId = ZoneId.of("America/New_York");
			LocalDateTime time = LocalDateTime.ofInstant(instant, zoneId);
			deadline.setValue(time.toLocalDate());
			description.setText(data.getString("description"));
			status.setValue(data.getString("status"));
			title.setText(data.getString("label"));

			status.getItems().add("A FAIRE");
			status.getItems().add("EN COURS");
			status.getItems().add("TERMINE");
			status.getItems().add("VERIFIE");
			status.getItems().add("BLOQUE");
		}
	}

	private  void getOflineTaskData(String taskLabel , String categoryTitle) {
		this.taskLabel = taskLabel;
		this.categoryTitle = categoryTitle;
		System.out.println(taskLabel + "  " + categoryTitle);
		List<Tasks> tasks = StorageService.getInstance().getProjectTasksDict().get(categoryTitle);
		data = tasks.stream()
				.filter(task -> task.getLabel().equals(taskLabel))
				.findFirst()
				.orElse(null);


		assert data != null;DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate localDate = LocalDate.parse(data.getDeadline(), formatter);

		ZoneId zoneId = ZoneId.of("America/New_York");
		LocalDateTime localDateTime = localDate.atStartOfDay().atZone(zoneId).toLocalDateTime();

		deadline.setValue(localDateTime.toLocalDate());
		description.setText(data.getDescription());
		status.setValue(data.getStatus());
		title.setText(data.getLabel());

		status.getItems().add("A FAIRE");
		status.getItems().add("EN COURS");
		status.getItems().add("TERMINE");
		status.getItems().add("VERIFIE");
		status.getItems().add("BLOQUE");
	}



	@Override
	public void initialize(URL url, ResourceBundle resourceBundle) {
		try {
			setTheme();
			getAllUsers();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
}
