package com.example.clm.controllers;

import com.example.clm.Main;
import com.example.clm.models.Categorie;
import com.example.clm.models.Tasks;
import com.example.clm.models.Users;
import com.example.clm.utils.*;
import com.github.tsohr.JSONArray;
import com.github.tsohr.JSONObject;
import javafx.animation.KeyFrame;
import javafx.animation.PauseTransition;
import javafx.animation.Timeline;
import javafx.application.Application;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.concurrent.Task;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;

import javafx.geometry.Pos;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.shape.Circle;
import javafx.stage.Modality;
import javafx.stage.Stage;

import javafx.scene.paint.Paint;


import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.*;
import java.util.List;
import java.util.stream.Collectors;

import javafx.stage.StageStyle;
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
	private List<Categorie> projects = new ArrayList<>();


	private List<Users> users = new ArrayList<>();

	@FXML
	private ListView<String> devProjects;

	@FXML
	private Circle conectionCircle;

	@FXML
	private Label connectionStatus;

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

				if (StorageService.getInstance().isOffline()) {
					Paint offlineColor = Color.RED;
					this.conectionCircle.setFill(offlineColor);
					this.connectionStatus.setText("Offline");
					connectionStatus.setTextFill(offlineColor);
				} else {
					Paint onlineColor = Color.GREEN;
					this.conectionCircle.setFill(onlineColor);
					this.connectionStatus.setText("Online");
					connectionStatus.setTextFill(onlineColor);

				}

			}
		});
	}

	private void getAllCategories() {
		StringBuilder response = new StringBuilder() ;
		try {
			api.testApiConnexion();
			StorageService.getInstance().setOffline(false);
		} catch (IOException e) {
			StorageService.getInstance().setOffline(true);
		}

		if (StorageService.getInstance().isOffline()) {
			StorageService.getInstance().setNeedSync(true);
		}

		if (StorageService.getInstance().isOffline()) {
			List<Categorie> back = StorageService.getInstance().getProjectsList();
			for (Categorie categorie : back) {
				categoriesListView.getItems().add(categorie.getTitle());
			}
		} else {
				if (StorageService.getInstance().isNeedSync()) {
					try {
						api.dbSync();

						// Create the progress bar and label
						ProgressBar progressBar = new ProgressBar();
						progressBar.setPrefWidth(400);

						Label messageLabel = new Label("Synchronisation de la base de données");
						messageLabel.setStyle("-fx-text-fill: black;"); // Optional: Change the text color

						VBox vbox = new VBox(progressBar, messageLabel);

						// Create the progress bar stage
						Stage progressBarStage = new Stage();
						progressBarStage.initModality(Modality.APPLICATION_MODAL); // Set as a modal stage
						progressBarStage.initStyle(StageStyle.UNDECORATED);
						progressBarStage.setScene(new Scene(vbox, 300, 100));
						progressBarStage.show();

						Timeline timeline = new Timeline(
								new KeyFrame(Duration.seconds(5), e -> progressBarStage.close())
						);
						timeline.play();
						StorageService.getInstance().setNeedSync(false);
						StorageService.getInstance().getUsersList().clear();
						StorageService.getInstance().getProjectsList().clear();
						StorageService.getInstance().getProjectTasksDict().clear();

					} catch (Exception e) {
						System.out.println(e.getCause() + " " + e.getMessage());
						System.out.println("something went wrong");
					}
				}
			try {
				response =	api.getTypeRequest(baseUrl + "categories");
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
				StorageService.getInstance().setOffline(false);
			} catch (Exception e) {
				System.out.println(e.getCause() + " " + e.getMessage());
				System.out.println("somthing went wrong whene sending http request");
			}
		}

	}

	@FXML
	void onDeleteBtnClick(ActionEvent event) throws IOException {
		try {
			api.testApiConnexion();
			StorageService.getInstance().setOffline(false);
		} catch (Exception e) {
			StorageService.getInstance().setOffline(true);

		}
		String selectedElement = categoriesListView.getSelectionModel().getSelectedItems().get(0);

		if (StorageService.getInstance().isOffline()) {

			notifierService.notify(NotificationType.WARNING , "Attention" ,"Connexion perdu vous etes en mode offline");
			StorageService.getInstance().setOffline(true);
			Paint offlineColor = Color.RED;
			this.conectionCircle.setFill(offlineColor);
			this.connectionStatus.setText("Offline");
			connectionStatus.setTextFill(offlineColor);

			StorageService.getInstance().getProjectsList().removeIf(project -> project.getTitle().equals(selectedElement));
			StorageService.getInstance().getProjectsList().forEach(item -> System.out.println(item.getTitle()));
			categoriesListView.getItems().clear();
			getAllCategories();
		} else {
			StorageService.getInstance().setOffline(true);
			Paint offlineColor = Color.GREEN;
			this.conectionCircle.setFill(offlineColor);
			this.connectionStatus.setText("Online");
			connectionStatus.setTextFill(offlineColor);
			try {
				List<Categorie> selectedCategorie = categories.stream().filter(e -> Objects.equals(e.getTitle(), selectedElement)).toList();
				Categorie element = selectedCategorie.get(0);
				StringBuilder response = api.deleteTypeRequest(baseUrl + "categories/" + element.getId());
				JSONObject json = new JSONObject(response.toString());
				// si reponse 200 supression de l'element de listView
				if (json.getInt("status_code") == 200) {
					categoriesListView.getItems().remove(selectedElement);
					notifierService.notify(NotificationType.SUCCESS , "Succès" , "Projet supprimé.");
				}
			} catch (Exception e) {
				System.out.println("somthing went wrong");
			}
		}



	}
	@FXML
	void onCategorieListSelected(MouseEvent event) {

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
					List<Categorie> selectedCategorie;
					if (StorageService.getInstance().isOffline()) {
						selectedCategorie = StorageService.getInstance().getProjectsList().stream().filter(element -> Objects.equals(element.getTitle(), selectedElement)).toList();
					} else {
						selectedCategorie = categories.stream().filter(element -> Objects.equals(element.getTitle(), selectedElement)).toList();
					}
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
					Categorie element ;
						if (StorageService.getInstance().isOffline()) {
							element= StorageService.getInstance().getProjectsList().stream().filter(item -> Objects.equals(item.getTitle(), selectedElement)).toList().get(0);
							categorieTitle.setText(element.getTitle());
							categorieDescription.setText(element.getDiscreption());
						} else {
							element= categories.stream().filter(item -> Objects.equals(item.getTitle(), selectedElement)).toList().get(0);
							categorieTitle.setText(element.getTitle());
							categorieDescription.setText(element.getDiscreption());
						}
						StringBuilder response = null;
						try {
							response = api.getTypeRequest(baseUrl + "categories/project/" + element.getId());
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
			});
		}
	}
	@FXML
	void onaddBtnClick(ActionEvent event) throws IOException {

		try {
			api.testApiConnexion();
			StorageService.getInstance().setOffline(false);
		} catch (Exception e) {
			StorageService.getInstance().setOffline(true);

		}

		String title = categorieTitle.getText().toString();
		String description = categorieDescription.getText().toString() ;
		if (title.trim().isEmpty()) {
			notifierService.notify(NotificationType.ERROR , "Erreur" , "Le titre est obligatoire.");
			return;
		}
		// création de l'object json du body de la requete
		ObservableList<String> selectedItems = membersList.getSelectionModel().getSelectedItems();

		if (StorageService.getInstance().isOffline()) {
			notifierService.notify(NotificationType.WARNING , "Attention" ,"Connexion perdu vous etes en mode offline");
			StorageService.getInstance().setOffline(true);
			Paint offlineColor = Color.RED;
			this.conectionCircle.setFill(offlineColor);
			this.connectionStatus.setText("Offline");
			connectionStatus.setTextFill(offlineColor);

			Categorie categorie = new Categorie(1, title , description);
			StorageService.getInstance().getProjectsList().add(categorie);
			categoriesListView.getItems().clear();
			getAllCategories();
		} else {
			StorageService.getInstance().setOffline(true);
			Paint offlineColor = Color.GREEN;
			this.conectionCircle.setFill(offlineColor);
			this.connectionStatus.setText("Online");
			connectionStatus.setTextFill(offlineColor);

			List<Users> selectedUsers = users.stream().filter(user -> selectedItems.contains(user.getFirstName())).collect(Collectors.toList());
			List<Integer> usersId = selectedUsers.stream().map(e -> e.getId()).collect(Collectors.toList());
			JSONObject data = new JSONObject() ;
			data.put("title" , title) ;
			data.put("desciption" , description) ;
			data.put("members" , usersId);

			try {
				if (StorageService.getInstance().isOffline()) {
					notifierService.notify(NotificationType.WARNING , "Attention" ,"Connexion perdu vous etes en mode offline");
				}
				StorageService.getInstance().setOffline(false);
				offlineColor = Color.GREEN;
				this.conectionCircle.setFill(offlineColor);
				this.connectionStatus.setText("Online");
				connectionStatus.setTextFill(offlineColor);
				StringBuilder response = new StringBuilder() ;
				response = api.postTypeRequest(baseUrl + "categories/" , data) ;
				JSONObject json = new JSONObject(response.toString());
				if (json.getInt("status_code") == 200) {
					categoriesListView.getItems().clear();
					categories.clear();
					getAllCategories();
				}
				notifierService.notify(NotificationType.SUCCESS, "Succès", "Projet ajouté.");
			} catch (Exception e) {
				System.out.println("somthing went wrong");
			}
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

		try {
			api.testApiConnexion();
			StorageService.getInstance().setOffline(false);
		} catch (Exception e) {
			StorageService.getInstance().setOffline(true);
		}

		if (StorageService.getInstance().isOffline()) {
			notifierService.notify(NotificationType.WARNING , "Attention" ,"Connexion perdu vous etes en mode offline");
			StorageService.getInstance().setOffline(true);
			Paint offlineColor = Color.RED;
			this.conectionCircle.setFill(offlineColor);
			this.connectionStatus.setText("Offline");
			connectionStatus.setTextFill(offlineColor);
			this.categoriesListView.getItems().clear();


			StorageService.getInstance().getProjectsList().stream()
					.filter(item -> item.getTitle().equals(selectedElement))
					.findFirst()
					.ifPresent(item -> {
						item.setTitle(title);
						item.setDiscreption(description);
					});
			categoriesListView.getItems().clear();
			getAllCategories();

		} else {
			StorageService.getInstance().setOffline(true);
			Paint offlineColor = Color.GREEN;
			this.conectionCircle.setFill(offlineColor);
			this.connectionStatus.setText("Online");
			connectionStatus.setTextFill(offlineColor);
			try {
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
					notifierService.notify(NotificationType.SUCCESS, "Succès", "Projet modifié.");
				}
			} catch (Exception e) {
				System.out.println("something went wrong");
			}
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
	void switchToTicketPage(MouseEvent __) throws IOException {
		if(!StorageService.getInstance().isOffline()) {
			if (auth.checkUserRole()) {
				Stage stage = (Stage) this.addBtn.getScene().getWindow();
				sceneService.switchScene(stage, "ticket-view.fxml", null);
			} else {
				Stage stage = (Stage) this.categoriesListView.getScene().getWindow();
				sceneService.switchScene(stage, "ticket-view.fxml", null);
			}
		} else {
			notifierService.notify(NotificationType.WARNING , "Attention" , "Cette fonctionlité n'est pas disponible offline");
		}
	}

	@FXML
	void switchToPlanificationPage(MouseEvent event) throws IOException {
		if(!StorageService.getInstance().isOffline()) {
			if (auth.checkUserRole()) {
				Stage stage = (Stage) this.addBtn.getScene().getWindow();
				sceneService.switchScene(stage, "gantt-view.fxml", null);
			} else {
				Stage stage = (Stage) this.categoriesListView.getScene().getWindow();
				sceneService.switchScene(stage, "gantt-view.fxml", null);
			}
		} else {
			notifierService.notify(NotificationType.WARNING , "Attention" , "Cette fonctionlité n'est pas disponible offline");
		}
	}



	private void getAllUsers() throws IOException {

		try {
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
		} catch (Exception e) {
			membersList.getItems().clear();
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

	private List<Categorie> createObjectToExport() {
		return FXCollections.observableList(this.categories);
	}

	@FXML
	void onTerminalBtnClick(MouseEvent event) throws IOException {
		sceneService.openTerminal("clear","java -jar ./console/consoleapp.jar");
	}


	@FXML
	public void onExportBtnClicked(MouseEvent event) throws IOException, ClassNotFoundException, NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {

		if (StorageService.getInstance().isOffline()) {
			notifierService.notify(NotificationType.WARNING , "Attention" , "cette fonctionnalité n'est pas disponible offline");
			return;
		}

		List <Categorie> data = this.createObjectToExport();
		if (data.size() == 0) {
			notifierService.notify(NotificationType.WARNING , "Avertissement" , "pas de donnée à exporter");
			return;
		}
		Stage stage = new Stage();

		Parent tasksRoot = addBtn.getScene().getRoot();
		tasksRoot.setDisable(true);

		stage.setResizable(false);
		stage.initStyle(StageStyle.UNDECORATED);
		stage.centerOnScreen();

		sceneService.switchToNewWindow("export-formats-view.fxml", null, stage);

		stage.setOnHidden(windowEvent -> {
			tasksRoot.setDisable(false);
			String selectedExportFormat = StorageService.getInstance().getSelectedExportFormat();
			String jarFilePath = "../plugins/" + selectedExportFormat + "/" + selectedExportFormat + "Exporter" + ".jar";

			Stage fileNameStage = new Stage();

			fileNameStage.setResizable(false);
			fileNameStage.initStyle(StageStyle.UNDECORATED);
			fileNameStage.centerOnScreen();
			try {
				sceneService.switchToNewWindow("export-file-name-view.fxml", null, fileNameStage);
			} catch (IOException e) {
				throw new RuntimeException(e);
			}

			fileNameStage.setOnHidden(e -> {
				try {
					String fileName = StorageService.getInstance().getExportFileName();
					String filePath = "../exports/" + fileName + "." + selectedExportFormat;

					URLClassLoader classLoader = new URLClassLoader(new URL[]{new URL("file:" + jarFilePath)});
					String className = selectedExportFormat.substring(0, 1).toUpperCase() + selectedExportFormat.substring(1) + "Exporter" ;

					Class<?> exporterClass = classLoader.loadClass("org.example." + className);
					Object exporterInstance = exporterClass.getDeclaredConstructor().newInstance();

					Method exportMethod = exporterClass.getMethod("export", List.class , String.class);

					exportMethod.invoke(exporterInstance, createObjectToExport() , filePath);

					notifierService.notify(NotificationType.SUCCESS , "Fichier sauvgarder" , "Fichier " + fileName + " est sauvarder dans " + filePath );
					Desktop.getDesktop().open(new File(filePath));

					classLoader.close();
				} catch (NoSuchMethodException | IllegalAccessException | InstantiationException | InvocationTargetException |
						 ClassNotFoundException | IOException ex) {
					throw new RuntimeException(ex);
				}
			});
			tasksRoot.setDisable(false);
		});
	}
}
