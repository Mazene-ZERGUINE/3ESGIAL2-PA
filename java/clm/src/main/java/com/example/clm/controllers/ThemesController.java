package com.example.clm.controllers;

import com.example.clm.Main;
import com.example.clm.utils.StorageService;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.Scene;
import javafx.scene.control.ComboBox;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Objects;
import java.util.ResourceBundle;
import javafx.event.ActionEvent;
import javafx.stage.Stage;

public class ThemesController implements Initializable {

	@FXML
	private ComboBox<String> themesComboBox;

	@Override
	public void initialize(URL url, ResourceBundle resourceBundle) {
		File[] thems = getThemesList(Objects.requireNonNull(Main.class.getResource("styles/")).getPath());

		for (File file : thems) {
			if (file.isFile() && !file.getName().equals("style.css")) {
				this.themesComboBox.getItems().add(file.getName().split("\\.")[0]);

			}
		}
		try {
			setTheme();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}


	private void setTheme() throws IOException {
		if (StorageService.getInstance().getThemeName() == null) {
			StorageService.getInstance().setThemeName("mainTheme");
		}
		themesComboBox.sceneProperty().addListener((observable, oldValue, newValue) -> {
			if (newValue != null) {
				Scene scene = themesComboBox.getScene();

				StorageService.getInstance().setSelectedTheme(scene);
			}
		});
	}


	private File[] getThemesList(String directoryPath) {


			File directory = new File(directoryPath);

			File[] files = null ;

			if (directory.isDirectory()) {
				files = directory.listFiles();
				return files;
			} else {
				System.out.println("Invalid directory path");
			}
			return null;
		}

	@FXML
	void onChangeThemeBtnClicked(ActionEvent event) {
		String selectedTheme = this.themesComboBox.getValue();
		StorageService.getInstance().setThemeName(selectedTheme);

		Stage stage = (Stage) this.themesComboBox.getScene().getWindow();
		stage.close();
	}

}
