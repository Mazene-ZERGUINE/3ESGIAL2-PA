package com.example.clm.controllers;

import com.example.clm.utils.NotifierService;
import com.example.clm.utils.StorageService;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.TextArea;
import javafx.stage.Stage;
import tray.notification.NotificationType;

public class ExportFileNameController {
	@FXML
	private TextArea fileNameTextArea;
	@FXML private Button saveBtn;

	@FXML
	private void onSaveBtnClick(ActionEvent event) {
		String fileName = this.fileNameTextArea.getText();
		if (fileName.trim().isEmpty()) {
			NotifierService notifierService = new NotifierService();
			notifierService.notify(NotificationType.ERROR , "Erreur" , "Nom de fichier est obligatoir") ;
			return;
		}
		StorageService.getInstance().setExportFileName(fileName);
		Stage stage = (Stage) this.saveBtn.getScene().getWindow();
		stage.close();
	}
}
