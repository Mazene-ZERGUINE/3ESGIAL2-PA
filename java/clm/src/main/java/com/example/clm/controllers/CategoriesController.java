package com.example.clm.controllers;

import com.example.clm.Main;
import com.example.clm.models.Categorie;
import com.example.clm.models.Users;
import com.example.clm.utils.*;
import com.github.tsohr.JSONArray;
import com.github.tsohr.JSONObject;
import javafx.animation.PauseTransition;
import javafx.application.Application;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;

import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.AnchorPane;
import javafx.stage.Stage;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.*;
import java.util.stream.Collectors;

import javafx.util.Duration;
import tray.notification.NotificationType;



public class CategoriesController extends Application implements Initializable {

	private static final AuthService auth = new AuthService() ;

	@FXML
	AnchorPane mainPane;
	@FXML
	private ListView<String> categoriesListView ;

	@FXML
	private  ListView<String> membersList  ;
	private 		List<Categorie> projects = new ArrayList<>();


	private List<Users> users = new ArrayList<>();

	@FXML
	private ListView<String> devProjects;

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

		AuthService auth = new AuthService();
		if(auth.checkUserRole()) {
			getAllCategories();
			try {
				getAllUsers();
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		} else {
			try {
				devProjects();
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
		try {
			this.setTheme();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	private void setTheme() throws IOException {
			if (StorageService.getInstance().getThemeName() == null) {
				StorageService.getInstance().setThemeName("mainTheme");
			}
		mainPane.sceneProperty().addListener((observable, oldValue, newValue) -> {
			if (newValue != null) {
				Scene scene = mainPane.getScene();

				StorageService.getInstance().setSelectedTheme(scene);
			}
		});
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

		if (!auth.checkUserRole()) {
			devProjects.setOnMouseClicked(e -> {
				if (e.getClickCount() == 2) {
					// redirection vers tasks-view.fxml
					String selectedElement = devProjects.getSelectionModel().getSelectedItems().get(0);
					System.out.println(selectedElement);
					List<Categorie> selectedCategorie = projects.stream().filter(element -> Objects.equals(element.getTitle(), selectedElement)).toList();
					int categorieId = selectedCategorie.get(0).getId();
					selectedCategorie.forEach(ex -> System.out.println(ex.getId()));
					Stage stage = (Stage) mainPane.getScene().getWindow(); // récupération de stage de la scene current
					FXMLLoader fxmlLoader = new FXMLLoader(Main.class.getResource("templates/tasks-view.fxml"));
					try {
						root = fxmlLoader.load();
						TasksController controller = fxmlLoader.getController();
						controller.setData(selectedCategorie);
						sceneService.switchScene(stage, "tasks-view.fxml", root);
					} catch (IOException ex) {
						throw new RuntimeException(ex);
					}
				}
			});
		} else {

			categoriesListView.setOnMouseClicked(e -> {
				if (e.getClickCount() == 2) {
					// redirection vers tasks-view.fxml
					String selectedElement = categoriesListView.getSelectionModel().getSelectedItems().get(0);
					List<Categorie> selectedCategorie = categories.stream().filter(element -> Objects.equals(element.getTitle(), selectedElement)).toList();
					int categorieId = selectedCategorie.get(0).getId();
					Stage stage = (Stage) addBtn.getScene().getWindow(); // récupération de stage de la scene current
					FXMLLoader fxmlLoader = new FXMLLoader(Main.class.getResource("templates/tasks-view.fxml"));
					try {
						root = fxmlLoader.load();
						TasksController controller = fxmlLoader.getController();
						controller.setData(selectedCategorie);
						sceneService.switchScene(stage, "tasks-view.fxml", root);
					} catch (IOException ex) {
						throw new RuntimeException(ex);
					}
				} else {
					membersList.getSelectionModel().clearSelection();
					String selectedElement = categoriesListView.getSelectionModel().getSelectedItems().get(0);
					List<Categorie> selectedCategorie = categories.stream().filter(element -> Objects.equals(element.getTitle(), selectedElement)).toList();
					for (Categorie element : selectedCategorie) {
						categorieTitle.setText(element.getTitle());
						categorieDescription.setText(element.getDiscreption());
						int userId = auth.getUserId();
						StringBuilder response = null;
						try {
							response = api.getTypeRequest(baseUrl + "categories/project/" + selectedCategorie.get(0).getId());
						} catch (IOException ex) {
							System.out.println(ex.getCause());
						}
						JSONObject jsonResponse = new JSONObject(response.toString());
						JSONArray dataArray = jsonResponse.getJSONArray("projects") ;
						System.out.println(dataArray.toString());
						for (int i = 0 ; i< dataArray.length() ; i++){
							System.out.println(dataArray.getJSONObject(i).getString("first_name"));
								membersList.getSelectionModel().select(dataArray.getJSONObject(i).getString("first_name"));
						}
					}
				}
			});
		}
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
		ObservableList<String> selectedItems = membersList.getSelectionModel().getSelectedItems();

		List<Users> selectedUsers = users.stream().filter(user -> selectedItems.contains(user.getFirstName())).collect(Collectors.toList());
		List<Integer> usersId = selectedUsers.stream().map(e -> e.getId()).collect(Collectors.toList());
		JSONObject data = new JSONObject() ;
			data.put("title" , title) ;
		  data.put("desciption" , description) ;
			data.put("members" , usersId);
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
		ObservableList<String> selectedItems = membersList.getSelectionModel().getSelectedItems();
		List<Users> selectedUsers = users.stream().filter(user -> selectedItems.contains(user.getFirstName())).collect(Collectors.toList());
		List<Integer> usersId = selectedUsers.stream().map(e -> e.getId()).collect(Collectors.toList());
		data.put("title" , title) ;
		data.put("desciption" , description) ;
		data.put("members" , usersId);
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
		Stage stage = (Stage) mainPane.getScene().getWindow();
		stage.close();

		try {
			sceneService.switchToNewWindow("sign-in-view.fxml", null, new Stage());
		} catch (IOException e) {
			this.notifierService.notify(NotificationType.ERROR, "Erreur", "Une erreur est survenue lors de la déconnexion.");
		}
	}

	@FXML
	void switchToMembersPage(MouseEvent __) throws IOException {
		Stage stage = (Stage)this.mainPane.getScene().getWindow();
		if (!auth.checkUserRole()) {
			sceneService.switchScene(stage , "dev-members-view.fxml" , null);
		} else {
			sceneService.switchScene(stage , "members-view.fxml" , null);

		}
	}

	@FXML
	void switchToPlanificationPage(MouseEvent event) throws IOException {
			Stage stage = (Stage)this.mainPane.getScene().getWindow();
			sceneService.switchScene(stage , "gantt-view.fxml" , null);
	}

	@FXML
	void switchToTicketPage(MouseEvent event) throws IOException {
		Stage stage = (Stage)this.mainPane.getScene().getWindow();
		sceneService.switchScene(stage , "tickets-view.fxml" , null);
	}

	private void getAllUsers() throws IOException {
		StringBuilder response = api.getTypeRequest(baseUrl + "users/") ;
		JSONObject json = new JSONObject(response.toString()) ;
		JSONArray dataArray = json.getJSONArray("users") ;
		for (int i = 0 ; i < dataArray.length() ; i++) {
			Users user = new Users(
				dataArray.getJSONObject(i).getInt("id"),
				dataArray.getJSONObject(i).getString("first_name"),
				dataArray.getJSONObject(i).getString("last_name"),
				dataArray.getJSONObject(i).getString("email"),
				dataArray.getJSONObject(i).getString("password"),
				dataArray.getJSONObject(i).getString("created_at"),
				dataArray.getJSONObject(i).getString("role")
				//dataArray.getJSONObject(i).getString("updated_at")
			);
			users.add(user) ;
			membersList.getItems().add( dataArray.getJSONObject(i).getString("first_name")) ;
		}
		membersList.getSelectionModel().setSelectionMode(SelectionMode.MULTIPLE); ;
	}

	public void devProjects() throws IOException {
		int userId = auth.getUserId();
		StringBuilder response = api.getTypeRequest(baseUrl + "categories/dev/" + userId);
		JSONObject jsonResponse = new JSONObject(response.toString());
		JSONArray dataArray = jsonResponse.getJSONArray("projects") ;
		for (int i = 0 ; i < dataArray.length() ; i++) {
			Categorie categorie = new Categorie(
				dataArray.getJSONObject(i).getInt("category_id"),
				dataArray.getJSONObject(i).getString("title"),
				dataArray.getJSONObject(i).getString("desciption")
			);
			projects.add(categorie) ;
			devProjects.getItems().add(dataArray.getJSONObject(i).getString("title"));
		}
	}

	@FXML
	void onThemeBtnClicked(MouseEvent event) throws IOException {
			Stage stage = new Stage();
			sceneService.switchToNewWindow("themes-view.fxml" , null , stage);

			stage.setOnHidden(e -> {

					Scene scene = addBtn.getScene();
					StorageService.getInstance().setSelectedTheme(scene);
			});
	}

}
