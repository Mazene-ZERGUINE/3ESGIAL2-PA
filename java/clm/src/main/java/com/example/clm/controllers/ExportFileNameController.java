package com.example.clm.controllers;

import com.example.clm.utils.NotifierService;
import com.example.clm.utils.StorageService;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TextArea;
import javafx.stage.Stage;
import tray.notification.NotificationType;

import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;

public class ExportFileNameController implements Initializable {
	@FXML
	private TextArea fileNameTextArea;
	@FXML private Button saveBtn;

	@FXML
	private void onSaveBtnClick(ActionEvent event)  {
		String fileName = this.fileNameTextArea.getText();
		if (fileName.trim().isEmpty()) {
			NotifierService notifierService = new NotifierService();
			notifierService.notify(NotificationType.ERROR , "Erreur" , "Le nom du fichier est obligatoire.") ;
			return;
		}
		StorageService.getInstance().setExportFileName(fileName);
		Stage stage = (Stage) this.saveBtn.getScene().getWindow();
		stage.close();
	}
	private void setTheme() throws IOException {
		if (StorageService.getInstance().getThemeName() == null) {
			StorageService.getInstance().setThemeName("mainTheme");
		}
		fileNameTextArea.sceneProperty().addListener((observable, oldValue, newValue) -> {
			if (newValue != null) {
				Scene scene = fileNameTextArea.getScene();

				StorageService.getInstance().setSelectedTheme(scene);
			}
		});
	}

	@Override
	public void initialize(URL url, ResourceBundle resourceBundle) {
		try {
			setTheme();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
}
