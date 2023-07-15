package com.example.clm.controllers;

import com.example.clm.utils.NotifierService;
import com.example.clm.utils.StorageService;
import javafx.event.ActionEvent;
import javafx.event.Event;
import javafx.event.EventType;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TextArea;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.HBox;
import javafx.stage.Stage;
import tray.notification.NotificationType;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;


public class ExportsController implements Initializable {
	@FXML
	private HBox formatBox;
	public String selectedFormat;




private static NotifierService notifier = new NotifierService();
	@Override
	public void initialize(URL url, ResourceBundle resourceBundle) {

		File folder = new File("../plugins");
		File[] subfolders = folder.listFiles(File::isDirectory);

		if (subfolders != null) {
			for (File subfolder : subfolders) {
				loadAndDisplayImagesFromFolder(this.formatBox , subfolder.getName());
			}
		} else {
				notifier.notify(NotificationType.WARNING , "Avertissement" , "Aucun format d'export n'est enregistré pour le moment.");
				return;
		}
		try {
			setTheme();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}



	private void loadAndDisplayImagesFromFolder(HBox hbox, String folderName) {
		File file = new File("../plugins/" + folderName + "/" + folderName+".png");
		if (file != null) {

			try {
						FileInputStream fileInputStream = new FileInputStream(file);
						Image image = new Image(fileInputStream);
						ImageView imageView = new ImageView(image);

						imageView.setFitWidth(80);
						imageView.setFitHeight(60);

						formatBox.getChildren().add(imageView);
						formatBox.setPadding( new Insets(25));

						imageView.setOnMouseClicked(event -> {
							this.selectedFormat = file.getName().split("\\.")[0] ;
							StorageService.getInstance().setSelectedExportFormat(selectedFormat);
							Stage stage = (Stage) hbox.getScene().getWindow();
							stage.close();
						});

					} catch (IOException e) {
						e.printStackTrace();
					}
				} else {
			System.out.println("filde do not exist");
		}
	}

	private void setTheme() throws IOException {
		if (StorageService.getInstance().getThemeName() == null) {
			StorageService.getInstance().setThemeName("mainTheme");
		}
		this.formatBox.sceneProperty().addListener((observable, oldValue, newValue) -> {
			if (newValue != null) {
				Scene scene = formatBox.getScene();

				StorageService.getInstance().setSelectedTheme(scene);
			}
		});
	}

}
