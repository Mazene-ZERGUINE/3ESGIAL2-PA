package com.example.clm.controllers;

import com.example.clm.Main;
import com.example.clm.models.Categorie;
import com.example.clm.utils.ApiService;
import com.github.tsohr.JSONArray;
import com.github.tsohr.JSONObject;
import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.ListView;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.input.MouseEvent;
import javafx.stage.Stage;

import java.io.IOException;
import java.net.URL;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;


public class CategoriesController extends Application implements Initializable {

	@FXML
	private ListView<String> categoriesListView ;

	private final ApiService api = new ApiService() ;
	private final String baseUrl = "http://localhost:3000/api/" ;
	@FXML
	private Button deleteBtn;
	private List<Categorie> categories = new ArrayList<>() ;
	@FXML
	private TextArea categorieDescription;
	@FXML
	private Button addBtn;
	@FXML
	private TextField categorieTitle;
	@Override
	public void start(Stage stage) throws IOException {
		FXMLLoader fxmlLoader = new FXMLLoader(Main.class.getResource("templates/categories-view.fxml"));
		Scene scene = new Scene(fxmlLoader.load(), 1100, 650);
		stage.setTitle("CLM");
		stage.setScene(scene);
		stage.show();
	}


	public static void main(String[] args) {
		launch();
	}

	@Override
	public void initialize(URL url, ResourceBundle resourceBundle) {
	getAllCategories();
	}

	@FXML
	void onDeleteBtnClick(ActionEvent event) throws IOException {
		String selectedElement = categoriesListView.getSelectionModel().getSelectedItems().get(0);

	 List<Categorie> selectedCategorie = categories.stream().filter(e -> Objects.equals(e.getTitle(), selectedElement)).toList();
	 for (Categorie element : selectedCategorie) {
		 try {
			 StringBuilder response = new StringBuilder();
			 response = api.deleteTypeRequest(baseUrl + "categories/" + element.getId());
			 JSONObject json = new JSONObject(response.toString());
			 if (json.getInt("status_code") == 200) {
					categoriesListView.getItems().remove(selectedElement);
			 }
		 } catch (IOException e) {
			 System.out.println("error ocured while sending http delete request" + e);
		 }
	 }
	}

	private void getAllCategories() {
		StringBuilder response = new StringBuilder() ;
		try {
			response =	api.getTypeRequest(baseUrl + "categories");
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		JSONObject json = new JSONObject(response.toString());

		JSONArray data = json.getJSONArray("categories") ;

		for (int i = 0 ; i < data.length() ; i++) {
			Categorie categorie = new Categorie(
				data.getJSONObject(i).getInt("id"),
				data.getJSONObject(i).getString("title"),
				data.getJSONObject(i).getString("desciption")
			) ;
			categories.add(categorie);

		}
		for (Categorie item : categories) {
			categoriesListView.getItems().addAll(item.getTitle());
		}
	}

	@FXML
	void onCategorieListSelected(MouseEvent event) {
		String selectedElement = categoriesListView.getSelectionModel().getSelectedItems().get(0);
		List<Categorie> selectedCategorie = categories.stream().filter(e -> Objects.equals(e.getTitle(), selectedElement)).toList();

		for (Categorie element : selectedCategorie) {
			categorieTitle.setText(element.getTitle());
			categorieDescription.setText(element.getDiscreption());
		}
	}

	@FXML
	void onaddBtnClick(ActionEvent event) throws IOException {
		String title = categorieTitle.getText().toString();
		String description = categorieDescription.getText().toString() ;


		JSONObject data = new JSONObject() ;
			data.put("title" , title) ;
		  data.put("desciption" , description) ;
			StringBuilder response = new StringBuilder() ;
			response = api.postTypeRequest(baseUrl + "categories/" , data) ;
			JSONObject json = new JSONObject(response.toString());
			if (json.getInt("status_code") == 200) {
				categoriesListView.getItems().clear();
				categories.clear();
				getAllCategories();
			}
	}

}
