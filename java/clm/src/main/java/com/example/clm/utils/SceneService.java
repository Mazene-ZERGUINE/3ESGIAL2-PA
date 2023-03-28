package com.example.clm.utils;

import com.example.clm.Main;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;

public class SceneService {

	public SceneService() { }

	public void switchScene(Stage stage , String fileName , Parent root) throws IOException {
		FXMLLoader fxmlLoader = new FXMLLoader(Main.class.getResource("templates/" + fileName));
		if (root == null) {
			root = fxmlLoader.load() ;
 		}
		try {
			stage.setScene(new Scene(root));
			stage.setResizable(false);
			stage.show();
		} catch (Exception exception) {
			System.out.println("can't change current scene");
		}
	}

	public void switchToNewWindow(String fileName, Parent root, Stage stage) throws IOException {
		switchScene(stage, fileName, root);
	}
}
