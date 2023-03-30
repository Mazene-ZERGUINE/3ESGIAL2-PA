package com.example.clm.controllers;

import com.example.clm.utils.ApiService;
import com.example.clm.utils.NotifierService;
import com.github.tsohr.JSONObject;
import javafx.fxml.FXML;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.AnchorPane;
import javafx.stage.Stage;
import tray.notification.NotificationType;

import java.io.IOException;

public class StatusPopUpController {

	private Stage stage ;
	@FXML
	private AnchorPane done;

	@FXML
	private AnchorPane progress;

	@FXML
	private AnchorPane stuck;

	@FXML
	private AnchorPane todo;

	@FXML
	private AnchorPane verrified;
	private final String baseUrl = "http://localhost:3000/api/client/";

	private final static ApiService api = new ApiService();
	private final static NotifierService notifierService = new NotifierService();
	private int taskId;

	public void setData(int taskId) {
		System.out.println(taskId);
		this.taskId = taskId;
	}

	@FXML
	void onProgressClick(MouseEvent event) throws IOException {
		stage = (Stage) todo.getScene().getWindow();
		updateStatus("IN PROGRESS" , stage);
	}

	@FXML
	void onDoneClick(MouseEvent event) throws IOException {
		stage = (Stage) todo.getScene().getWindow();
		updateStatus("DONE" , stage);
	}

	@FXML
	void onStuckClick(MouseEvent event) throws IOException {
		stage = (Stage) todo.getScene().getWindow();
		updateStatus("STUCK" , stage);
	}

	@FXML
	void onTodoClick(MouseEvent event) throws IOException {
		stage = (Stage) todo.getScene().getWindow();
		updateStatus("TODO" , stage);
	}

	@FXML
	void onVerifiedClick(MouseEvent event) throws IOException {
		stage = (Stage) todo.getScene().getWindow();
		updateStatus("VERIFIED" , stage);
	}

	private void updateStatus(String status , Stage stage) throws IOException {
		JSONObject data = new JSONObject().put("status" , status);
		StringBuilder response = api.patchTypeRequest(baseUrl +"tasks/" +taskId  ,data ) ;
		JSONObject jsonResponse = new JSONObject(response.toString());
		if (jsonResponse.getInt("status_code") == 200) {
			notifierService.notify(NotificationType.SUCCESS , "SUCCESS" , "Task updated");
			stage.hide();
			stage.close();
		} else {
			notifierService.notify(NotificationType.ERROR , "ERROR" , "Bad request");
		}
	}

}
