package com.example.clm.controllers;

import com.example.clm.Main;
import com.example.clm.models.Categorie;
import com.example.clm.utils.ApiService;
import com.github.tsohr.JSONArray;
import com.github.tsohr.JSONObject;
import javafx.application.Application;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Scene;
import javafx.scene.control.ListView;
import javafx.stage.Stage;

import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.ResourceBundle;
import java.util.stream.Collectors;
import java.util.stream.Stream;


public class CategoriesController extends Application implements Initializable {

	@FXML
	private ListView<String> categoriesListView ;

	private List<Categorie> categories = new ArrayList<Categorie>() ;
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
		StringBuilder response = new StringBuilder() ;
		ApiService api = new ApiService() ;
		try {
		response =	api.getTypeRequest("http://localhost:3000/api/categories");
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		JSONObject json = new JSONObject(response.toString());

		JSONArray data = json.getJSONArray("categories") ;

		for (int i = 0 ; i < data.length() ; i++) {
			Categorie categorie = new Categorie(
				data.getJSONObject(i).getInt("id"),
				data.getJSONObject(i).getString("title"),
				data.getJSONObject(i).getString("disciption")
			) ;
			categories.add(categorie);

		}
		for (Categorie item : categories) {
			categoriesListView.getItems().addAll(item.getTitle());
		}
	}
}
