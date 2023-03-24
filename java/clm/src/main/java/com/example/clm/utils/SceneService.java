package com.example.clm.utils;

import com.example.clm.Main;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class SceneService {

	public SceneService() { }

	public void switchScene(Stage stage , String fileName) {
		FXMLLoader fxmlLoader = new FXMLLoader(Main.class.getResource("templates/" + fileName));
		try {
			Parent root = fxmlLoader.load();
			stage.setScene(new Scene(root));
			stage.show();
		} catch (Exception exception) {
			System.out.println("can't change current scene");
		}
	}

	public void switchToNewWindow(String fileName) {
		FXMLLoader fxmlLoader = new FXMLLoader(Main.class.getResource("templates/" + fileName));
		try {
			Parent root = fxmlLoader.load();
			Stage stage = new Stage();
			stage.setScene(new Scene(root));
			stage.show();
		} catch (Exception exception) {
			System.out.println("can't change current scene");
		}
	}


}
