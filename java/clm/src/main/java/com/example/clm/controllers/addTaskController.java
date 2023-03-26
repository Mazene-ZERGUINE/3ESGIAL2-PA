package com.example.clm.controllers;

import com.example.clm.utils.ApiService;
import com.example.clm.utils.NotifierService;
import com.github.tsohr.JSONObject;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.DatePicker;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.stage.Stage;
import tray.notification.NotificationType;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Date;

public class addTaskController {

	private final NotifierService notifierService = new NotifierService() ;
	private final ApiService api = new ApiService() ;
	private final static String baseUrl = "http://localhost:3000/api/" ;
	@FXML
	private Button addBtn;

	@FXML
	private DatePicker deadline;

	@FXML
	private TextArea description;

	@FXML
	private Button quitBtn;

	@FXML
	private TextField title;


	@FXML
	void onAddBtnClick(ActionEvent event) throws IOException {
		String taskTitle = title.getText();
		String taskDescription = description.getText() ;
		LocalDate taskDeadline = deadline.getValue();
		LocalDate creationDate = LocalDate.now() ;
		JSONObject json = new JSONObject() ;

		if (taskTitle.isEmpty() ||taskDeadline.toString().isEmpty()) {
			notifierService.notify(NotificationType.ERROR , "Error" , "title and description are required to create task");
			return;
		}

		json.put("label" , taskTitle) ;
		json.put("description" , taskDescription) ;
		json.put("created_at" , creationDate.toString() ) ;
		json.put("updated_at" , "no updates yet");
		json.put("deadline" , taskDeadline.toString()) ;


		StringBuilder response = api.patchTypeRequest(baseUrl + "tasks" , json) ;
		JSONObject jsonResponse = new JSONObject(response.toString());

		System.out.println(jsonResponse);
	}

	@FXML
	void onQuitBtnClick(ActionEvent event) {
		Stage stage = (Stage) quitBtn.getScene().getWindow() ;
		stage.close();
	}

}


