package com.example.clm;

import com.example.clm.utils.SceneService;
import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.stage.Stage;

import java.io.IOException;


public class Main extends Application {
    @Override
    public void start(Stage stage) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(Main.class.getResource("templates/sign-in-view.fxml"));
        Scene scene = new Scene(fxmlLoader.load());
        stage.setTitle("Connexion");
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch();
    }
	@FXML
	private Button btn;

	@FXML
	private Label welcomeText;

	@FXML
	void onBtnClick(ActionEvent event) throws IOException {
		SceneService window = new SceneService() ;
		window.switchToNewWindow("categories-view.fxml" , null , new Stage());
		Stage stage = (Stage) btn.getScene().getWindow() ;
		stage.close();
	}

}
