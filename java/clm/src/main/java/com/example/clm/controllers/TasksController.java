package com.example.clm.controllers;

import com.example.clm.models.Categorie;
import com.example.clm.utils.SceneService;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.image.ImageView;
import javafx.scene.input.MouseEvent;
import javafx.stage.Stage;

import java.io.IOException;
import java.net.URL;
import java.util.List;
import java.util.ResourceBundle;

public class TasksController implements Initializable {

	private final SceneService sceneService = new SceneService();
	@FXML
	private Button addBtn;

	@FXML
	private ImageView backBtn;

	@FXML
	private Button deleteBtn;

	@FXML
	private Label category ;
	private String categoryTitle ;
	private int categoryId ;

public void setData(List<Categorie> categorie) {
	this.categoryTitle = categorie.get(0).getTitle();
	this.categoryId = categorie.get(0).getId();
	category.setText(categoryTitle);
}

	// button events
	@FXML
	void onAddBtnClick(ActionEvent event) throws IOException {
		sceneService.switchToNewWindow("add-task-view.fxml" , null);

	}

	@FXML
	void onBackBtnClick(MouseEvent event) throws IOException {
		Stage stage =(Stage) deleteBtn.getScene().getWindow();
	 sceneService.switchScene(stage , "categories-view.fxml" , null);
	}

	@FXML
	void onDeleteBtnClick(ActionEvent event) {

	}
	@Override
	public void initialize(URL url, ResourceBundle resourceBundle) {
	}
}