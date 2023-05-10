package com.example.clm.controllers;

import com.example.clm.Main;
import com.example.clm.models.Categorie;
import com.example.clm.utils.ApiService;
import com.example.clm.utils.NotifierService;
import com.example.clm.utils.SceneService;
import com.github.tsohr.JSONArray;
import com.github.tsohr.JSONObject;
import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;

import javafx.scene.Parent;
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
import tray.notification.NotificationType;



public class CategoriesController extends Application implements Initializable {

	@FXML
	private ListView<String> categoriesListView ;

	private final ApiService api = new ApiService() ;
	private  final SceneService sceneService = new SceneService() ;
	private final NotifierService notifierService = new NotifierService() ;

	private final String baseUrl = "http://localhost:3000/api/client/" ;
	@FXML
	private Button deleteBtn;
	private List<Categorie> categories = new ArrayList<>() ;
	@FXML
	private TextArea categorieDescription;
	@FXML
	private Button addBtn;
	@FXML
	private TextField categorieTitle;
	private Parent root ;

  // starting stage a modifier plus tard aprés la redirection de la page de connexion //
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
  // récupere tous les catégorie aprés le lancement de la scene
	@Override
	public void initialize(URL url, ResourceBundle resourceBundle) {
	getAllCategories();
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
	/*
	* buttons events : add / delete / update / delete
	*  **/
	@FXML
	void onDeleteBtnClick(ActionEvent event) throws IOException {
		// récupération de l'élement séléctionné de la listView //
		String selectedElement = categoriesListView.getSelectionModel().getSelectedItems().get(0);
	 List<Categorie> selectedCategorie = categories.stream().filter(e -> Objects.equals(e.getTitle(), selectedElement)).toList();
	 for (Categorie element : selectedCategorie) {
		 try {
			 // evoie de la requete http //
			 StringBuilder response = new StringBuilder();
			 response = api.deleteTypeRequest(baseUrl + "categories/" + element.getId());
			 JSONObject json = new JSONObject(response.toString());
			 // si reponse 200 supression de l'element de listView
			 if (json.getInt("status_code") == 200) {
					categoriesListView.getItems().remove(selectedElement);
				 notifierService.notify(NotificationType.SUCCESS , "Succès" , "Projet supprimé.");
			 }
		 } catch (IOException e) {
			 System.out.println("error ocured while sending http delete request" + e);
			 notifierService.notify(NotificationType.ERROR , "Erreur" , "Une erreur survenue lors de la suppression.");
		 }
	 }
	}
	@FXML
	void onCategorieListSelected(MouseEvent event) {
		/*
		* verification des nombres des click si 1 -> affichage des donnée de la ligne séléctionnée dans les chaps text
		* 																			2 -> redirection vers la page des détaile de la catégorie
		* **/
		categoriesListView.setOnMouseClicked(e -> {
			if (e.getClickCount() == 2) {
				// redirection vers tasks-view.fxml
				String selectedElement = categoriesListView.getSelectionModel().getSelectedItems().get(0);
				List<Categorie> selectedCategorie = categories.stream().filter(element -> Objects.equals(element.getTitle(), selectedElement)).toList();
				int categorieId = selectedCategorie.get(0).getId();
				Stage stage =(Stage)addBtn.getScene().getWindow() ; // récupération de stage de la scene current
				FXMLLoader fxmlLoader = new FXMLLoader(Main.class.getResource("templates/tasks-view.fxml"));
				try {
					root = fxmlLoader.load() ;
					TasksController controller = fxmlLoader.getController() ;
					controller.setData(selectedCategorie);
					sceneService.switchScene(stage ,"tasks-view.fxml" , root);
				} catch (IOException ex) {
					throw new RuntimeException(ex);
				}
			} else {
				String selectedElement = categoriesListView.getSelectionModel().getSelectedItems().get(0);
				List<Categorie> selectedCategorie = categories.stream().filter(element -> Objects.equals(element.getTitle(), selectedElement)).toList();
				for (Categorie element : selectedCategorie) {
					categorieTitle.setText(element.getTitle());
					categorieDescription.setText(element.getDiscreption());
				}
			}
		});
	}
	@FXML
	void onaddBtnClick(ActionEvent event) throws IOException {
		String title = categorieTitle.getText().toString();
		String description = categorieDescription.getText().toString() ;
		if (title.trim().isEmpty()) {
			notifierService.notify(NotificationType.ERROR , "Erreur" , "Le titre est obligatoire.");
			return;
		}
		// création de l'object json du body de la requete
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

				notifierService.notify(NotificationType.SUCCESS , "Succès" , "Projet ajouté.");
			}
	}
	@FXML
	void onUpdateBtnClick(ActionEvent event) throws IOException {
		String title = categorieTitle.getText().toString();
		String description = categorieDescription.getText().toString() ;
		if (title.equals("")) {
			notifierService.notify(NotificationType.ERROR , "Erreur" , "Le titre est obligatoire.");
			return;
		}
		String selectedElement = categoriesListView.getSelectionModel().getSelectedItems().get(0);
		List<Categorie> selectedCategorie = categories.stream().filter(e -> Objects.equals(e.getTitle(), selectedElement)).toList();
		JSONObject data = new JSONObject() ;
		data.put("title" , title) ;
		data.put("desciption" , description) ;
		StringBuilder response = new StringBuilder() ;
		response = api.putTypeRequest(baseUrl + "categories/"+ selectedCategorie.get(0).getId() , data) ;
		JSONObject json = new JSONObject(response.toString());
		if (json.getInt("status_code") == 200) {
			categoriesListView.getItems().clear();
			categories.clear();
			getAllCategories();
			notifierService.notify(NotificationType.SUCCESS , "Succès" , "Projet modifié.");
		}
	}

	@FXML
	void onLogOutBtnClick(MouseEvent event) {
		Stage stage = (Stage) addBtn.getScene().getWindow();
		stage.close();

		try {
			sceneService.switchToNewWindow("sign-in-view.fxml", null, new Stage());
		} catch (IOException e) {
			this.notifierService.notify(NotificationType.ERROR, "Erreur", "Une erreur est survenue lors de la déconnexion.");
		}
	}

	@FXML
	void switchToMembersPage(MouseEvent __) throws IOException {
		Stage stage = (Stage)this.addBtn.getScene().getWindow();
		sceneService.switchScene(stage , "members-view.fxml" , null);
	}

	@FXML
	void switchToPlanificationPage(MouseEvent event) throws IOException {
			Stage stage = (Stage)this.addBtn.getScene().getWindow();
			sceneService.switchScene(stage , "gantt-view.fxml" , null);
	}
}
