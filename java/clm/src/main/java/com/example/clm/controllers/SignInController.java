package com.example.clm.controllers;

import com.example.clm.utils.ApiService;
import com.example.clm.utils.NotifierService;
import com.example.clm.utils.SceneService;
import com.github.tsohr.JSONException;
import com.github.tsohr.JSONObject;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.stage.Stage;
import tray.notification.NotificationType;

import java.io.IOException;

public class SignInController {

	private final String baseUrl = "http://localhost:3000/api/" ;
	private final ApiService api = new ApiService();
	private final NotifierService notifierService = new NotifierService();
	private final SceneService sceneService = new SceneService();

	@FXML
	private TextField emailField;

	@FXML
	private PasswordField passwordField;

	@FXML
	Button loginBtn;

	@FXML
	public void onEnter(ActionEvent __){
		onLogIn(__);
	}

	public void onLogIn(ActionEvent __) {
		final String email = emailField.getText();
		final String password = passwordField.getText();

		final boolean isOneFieldEmpty = email.isEmpty() || password.isEmpty();
		if (isOneFieldEmpty) {
			notifierService.notify(NotificationType.ERROR, "Erreur", "Les champs email et mot de passe sont obligatoires.");
			return;
		}

		JSONObject data = new JSONObject();
		data.put("email", email);
		data.put("password", password);


		int responseCode = 0;
		try {
			responseCode = api.postTypeRequestWithResponseCode(baseUrl + "trello/signin", data);
		}
		catch (Exception e) {
			notifierService.notify(NotificationType.ERROR, "Erreur", "Une erreur est apparu. Réessayer plus tard.");
		}

		if (responseCode >= 500) {
			notifierService.notify(NotificationType.ERROR, "Erreur", "Une erreur est apparu. Réessayer plus tard.");
			return;
		}

		if (responseCode >= 400) {
			notifierService.notify(NotificationType.ERROR, "Erreur", "Vos identifiants sont incorrects.");
			return;
		}

		try {
			this.sceneService.switchToNewWindow("categories-view.fxml" , null , new Stage());
			this.notifierService.notify(NotificationType.SUCCESS, "Succès", "Vous êtes connecté.e !");

			Stage stage = (Stage) this.loginBtn.getScene().getWindow() ;
			stage.close();
		} catch (IOException e) {
			notifierService.notify(NotificationType.ERROR, "Erreur", "Un problème est survenu...");
		}
	}

}
