package com.example.clm.controllers;

import com.example.clm.utils.ApiService;
import com.example.clm.utils.AuthService;
import com.example.clm.utils.NotifierService;
import com.example.clm.utils.SceneService;
import com.github.tsohr.JSONException;
import com.github.tsohr.JSONObject;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.Parent;
import javafx.scene.control.Button;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.scene.input.MouseEvent;
import javafx.stage.Stage;
import javafx.stage.StageStyle;
import tray.notification.NotificationType;

import java.io.*;
import java.io.File;
import java.io.IOException;
import java.util.Arrays;

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
	private TextField recoverEmail;

	@FXML
	private TextField recoverLastName;

	@FXML
	private TextField recovreName;


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
			StringBuilder response = api.postTypeRequest(baseUrl + "trello/signin" , data);
			JSONObject json = new JSONObject((response.toString()));

			String filePath = "../configs/userInfo.txt";
			File file = new File(filePath);

			File parentDir = file.getParentFile();
			if (!parentDir.exists()) {
				parentDir.mkdirs();
			}
			if (!file.exists()) {
				file.createNewFile();
			}

			file.setWritable(true, true);

			BufferedWriter writer = new BufferedWriter(new FileWriter(file));
			writer.write(json.toString());
			writer.close();

			file.setReadable(false, false);
			file.setWritable(false, false);
			file.setExecutable(false, false);

			AuthService authentication = new AuthService() ;
			boolean isAdmin = authentication.checkUserRole() ;

			if (isAdmin) {
				this.sceneService.switchToNewWindow("categories-view.fxml" , null , new Stage());
				this.notifierService.notify(NotificationType.SUCCESS, "Succès", "Vous êtes connecté.e !");

			} else {
				this.sceneService.switchToNewWindow("categories-dev-view.fxml" , null , new Stage());
				this.notifierService.notify(NotificationType.SUCCESS, "Succès", "Vous êtes connecté.e !");
			}
			Stage stage = (Stage) this.loginBtn.getScene().getWindow() ;
			stage.close();
		} catch (IOException e) {
			notifierService.notify(NotificationType.ERROR, "Erreur", "Un problème est survenu...");
			System.out.println(e.getMessage() + " " + e.getCause());
		}
	}

@FXML
private void recoverPassword(MouseEvent event) throws IOException {
	Stage stage = new Stage();

	stage.setResizable(false);
	stage.centerOnScreen();
	sceneService.switchToNewWindow("password-recover-scene.fxml", null, stage);

}

	@FXML
	void onRecoverBtnClick(ActionEvent event) throws IOException {

			String email = recoverEmail.getText();

			if ( email.trim().isEmpty() ) {
				notifierService.notify(NotificationType.ERROR , "Erreur" , "Email est obligatoir");
				return;
			}

			JSONObject data = new JSONObject()
				.put("email" , email);


		try {
			StringBuilder response = new StringBuilder() ;
			response = api.postTypeRequest(baseUrl + "client/recover_password" , data ) ;
			JSONObject json = new JSONObject(response.toString());
			System.out.println(json);
			if (json.getInt("status_code") == 200) {
				notifierService.notify(NotificationType.SUCCESS , "Email evoyée" , "un email contenat votre nouveau mot de passe est envoyée à \n " + email);

				Stage stage = (Stage) this.recoverEmail.getScene().getWindow();
				stage.close();
			} else if(json.getInt("status_code") == 400 ) {
				notifierService.notify(NotificationType.ERROR , "Email non trouvé" , "compte n'existe pas");

			} else {
				notifierService.notify(NotificationType.ERROR , "Email non trouvé" , "Une erreur est survenu");

			}
		} catch (IOException e) {
			notifierService.notify(NotificationType.ERROR , "Email non trouvé" , "compte n'existe pas");
		}

	}
}
