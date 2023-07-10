package com.example.clm.controllers;

import com.example.clm.Main;
import com.example.clm.models.Categorie;
import com.example.clm.models.Tasks;
import com.example.clm.models.Users;
import com.example.clm.utils.*;
import com.github.tsohr.JSONObject;
import javafx.animation.KeyFrame;
import javafx.animation.Timeline;
import javafx.application.Application;
import javafx.collections.FXCollections;
import javafx.collections.ObservableArray;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.paint.Paint;
import javafx.scene.shape.Circle;
import javafx.stage.Modality;
import javafx.stage.Stage;
import javafx.stage.StageStyle;
import javafx.util.Duration;
import tray.notification.NotificationType;

import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.*;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static javafx.collections.FXCollections.observableArrayList;


public class MembersController  implements Initializable {

	private final ApiService api = new ApiService();
	private final SceneService sceneService = new SceneService();
	private final NotifierService notifierService = new NotifierService();

	private final String baseUrl = "http://localhost:3000/api/client/";

	private List<Users> users = new ArrayList<>();

	@FXML
	private Circle conectionCircle;

	@FXML
	private Label connectionStatus;
	@FXML
	private TableView<Users> tableView;

	@FXML
	private TableColumn lastNameColumn;
	@FXML
	private TableColumn firstNameColumn;

	@FXML
	private ComboBox<String> roleCombo ;
	@FXML
	private TableColumn emailColumn;
	@FXML
	private TextField lastNameField;
	@FXML
	private TextField firstNameField;
	@FXML
	private TextField emailField;
	@FXML
	private TextField passwordField;

	@FXML
	private PasswordField updatePassword;

	@FXML
	private Button updatePasswordBtn;

	@FXML
	private Label userEmail;

	@FXML
	private Label userLastName;

	@FXML
	private Label userName;

	@FXML
	private Label userRole;

	@FXML
	private Button addBtn;

	private final  static AuthService auth = new AuthService();

	private ObservableList<Users> backupList$ = observableArrayList();


	@Override
	public void initialize(URL url, ResourceBundle resourceBundle) {
		if (auth.checkUserRole()) {
			roleCombo.getItems().add("ADMIN");
			roleCombo.getItems().add("DEV");
		}

		if (!auth.checkUserRole()) {
			JSONObject userData = auth.getUserData();
			this.userRole.setText(userData.getString("role"));
			this.userEmail.setText(userData.getString("email"));
			this.userName.setText(userData.getString("first_name"));
			this.userLastName.setText(userData.getString("last_name"));

		}

		setColumns();
		try {
			setTheme();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		getAllMembers();
	}

	private void setTheme() throws IOException {


		if (StorageService.getInstance().getThemeName() == null) {
			StorageService.getInstance().setThemeName("mainTheme");
		}
		this.tableView.sceneProperty().addListener((observable, oldValue, newValue) -> {
			if (newValue != null) {
				Scene scene = tableView.getScene();

				StorageService.getInstance().setSelectedTheme(scene);

				StorageService.getInstance().setSelectedTheme(scene);
				if (StorageService.getInstance().isOffline()) {
					javafx.scene.paint.Paint offlineColor = javafx.scene.paint.Color.RED;
					this.conectionCircle.setFill(offlineColor);
					this.connectionStatus.setText("Offline");
					connectionStatus.setTextFill(offlineColor);
				} else {
					javafx.scene.paint.Paint onlineColor = Color.GREEN;
					this.conectionCircle.setFill(onlineColor);
					this.connectionStatus.setText("Online");
					connectionStatus.setTextFill(onlineColor);
				}
			}
		});
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

	@FXML
	void onAddBtnClick(ActionEvent __) {
		var lastName = lastNameField.getText().trim();
		var firstName = firstNameField.getText().trim();
		var email = emailField.getText().trim();
		var password = passwordField.getText();
		var role = roleCombo.getValue() ;

		var isOneFieldEmpty = lastName.isBlank() || firstName.isBlank() || email.isBlank() || password.isBlank()  || role.isBlank();
		if (isOneFieldEmpty) {
			notifierService.notify(NotificationType.ERROR, "Error", "Tous les champs sont obligatoires.");
			return;
		}

		if (password.length() < 8) {
			notifierService.notify(NotificationType.ERROR, "Erreur" , "le mot de passe doit contenir au moins 8 caractères");
			return;
		}

		String email_validatro = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
		Pattern pattern = Pattern.compile(email_validatro);
		Matcher matcher = pattern.matcher(email);

		if (!matcher.matches()) {
			notifierService.notify(NotificationType.ERROR, "Erreur" , "email non valide");
			return;
		}

		try {
			api.testApiConnexion();
			StorageService.getInstance().setOffline(false);
		} catch (Exception e) {
			StorageService.getInstance().setOffline(true);
		}

		if (StorageService.getInstance().isOffline()) {
			notifierService.notify(NotificationType.WARNING, "Attention", "Connexion perdu vous etes en mode offline");
			StorageService.getInstance().setOffline(true);
			Paint offlineColor = Color.RED;
			this.conectionCircle.setFill(offlineColor);
			this.connectionStatus.setText("Offline");
			connectionStatus.setTextFill(offlineColor);
			this.tableView.getItems().clear();

			Users user = new Users(
					0,
					firstName,
					lastName,
					email,
					password,
					new Date().toString(),
					role
			);

			StorageService.getInstance().getUsersList().add(user);
			getAllMembers();

		} else {
			StorageService.getInstance().setOffline(true);
			Paint offlineColor = Color.GREEN;
			this.conectionCircle.setFill(offlineColor);
			this.connectionStatus.setText("Online");
			connectionStatus.setTextFill(offlineColor);

			var payload = new JSONObject();
			payload
					.put("last_name", lastName)
					.put("first_name", firstName)
					.put("email", email)
					.put("password", password)
					.put("role" , role) ;

			try {
				api.postTypeRequest(baseUrl + "users/", payload);

				this.tableView.getItems().clear();
				this.users.clear();
				getAllMembers();
				clearFields();

				notifierService.notify(NotificationType.SUCCESS, "Success", "Utilisateur ajouté.");
			} catch (IOException e) {
				notifierService.notify(NotificationType.ERROR, "Erreur", "email exist déja");
			}
		}


	}

	private boolean arePasswordsSame(String password1, String password2) {
		return password1.equals(password2);
	}

	private void clearFields() {
		lastNameField.clear();
		firstNameField.clear();
		emailField.clear();
		passwordField.clear();
		roleCombo.setValue("");

	}

	@FXML
	void onTerminalBtnClick(MouseEvent event) throws IOException {
		sceneService.openTerminal("clear","java -jar ./console/consoleapp.jar");
	}

	@FXML
	void onUpdateBtnClick(ActionEvent __) {
		var lastName = lastNameField.getText().trim();
		var firstName = firstNameField.getText().trim();
		var email = emailField.getText().trim();
		var password = passwordField.getText();
		var role = roleCombo.getValue();

		var isOneFieldEmpty = lastName.isBlank() || firstName.isBlank() || email.isEmpty();
		if (isOneFieldEmpty) {
			notifierService.notify(NotificationType.ERROR, "Error", "Tous les champs sont obligatoires, sauf les mots de passe.");
			return;
		}

		if (password.length() < 8) {
			notifierService.notify(NotificationType.ERROR, "Erreur" , "le mot de passe doit contenir au moins 8 caractères");
			return;
		}

		String email_validatro = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
		Pattern pattern = Pattern.compile(email_validatro);
		Matcher matcher = pattern.matcher(email);

		if (!matcher.matches()) {
			notifierService.notify(NotificationType.ERROR, "Erreur" , "email non valide");
			return;
		}

		var selectedUser = this.tableView.getSelectionModel().getSelectedItems().get(0);
		List<Users> selectedUsers = this.users
			.stream()
			.filter(user -> Objects.equals(user.getEmail(), selectedUser.getEmail()))
			.toList();

		var payload = new JSONObject();
		payload
			.put("last_name", lastName)
			.put("first_name", firstName)
			.put("email", email)
			.put("password", password)
			.put("role" , role) ;

		try {
			api.putTypeRequest(baseUrl + "users/" + selectedUser.getEmail(), payload);

			this.tableView.getItems().clear();
			this.users.clear();
			getAllMembers();
			clearFields();

			notifierService.notify(NotificationType.SUCCESS, "Success", "Utilisateur mis à jour.");
		} catch (IOException e) {
			StorageService.getInstance().getUsersList()
					.stream()
					.filter(u -> Objects.equals(u.getEmail(), selectedUser.getEmail()))
					.findFirst()
					.ifPresent(item -> {
						item.setFirstName(firstName);
						item.setPassword(password);
						item.setEmail(email);
						item.setLastName(lastName);
					});
		}
		getAllMembers();
		clearFields();
	}

	@FXML
	void onDeleteBtnClick(ActionEvent __) {
		var selectedUser = this.tableView.getSelectionModel().getSelectedItems().get(0);

		try {
			api.testApiConnexion();
			StorageService.getInstance().setOffline(false);
		} catch (Exception e) {
			StorageService.getInstance().setOffline(true);
		}

		if (StorageService.getInstance().isOffline()) {
			notifierService.notify(NotificationType.WARNING, "Attention", "Connexion perdu vous etes en mode offline");
			StorageService.getInstance().setOffline(true);
			Paint offlineColor = Color.RED;
			this.conectionCircle.setFill(offlineColor);
			this.connectionStatus.setText("Offline");
			connectionStatus.setTextFill(offlineColor);
			this.tableView.getItems().clear();


			List<Users> users = StorageService.getInstance().getUsersList();
			users.removeIf(u -> u.getEmail().equals(selectedUser.getEmail()));
			this.backupList$.setAll(users);
			tableView.setItems(backupList$);
		} else {
			StorageService.getInstance().setOffline(true);
			Paint offlineColor = Color.GREEN;
			this.conectionCircle.setFill(offlineColor);
			this.connectionStatus.setText("Online");
			connectionStatus.setTextFill(offlineColor);
			try {
				Users user = this.users
						.stream()
						.filter(u -> Objects.equals(u.getEmail(), selectedUser.getEmail()))
						.toList().get(0) ;

				api.deleteTypeRequest(baseUrl + "users/" + user.getEmail());
				this.tableView.getItems().remove(selectedUser);
				getAllMembers();
				notifierService.notify(NotificationType.SUCCESS, "Success", "Utilisateur supprimé.");
		} catch (Exception e) {
				System.out.println("something went wrong");
			}

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
	void onTableViewSelected(MouseEvent __) {
		this.tableView.setOnMouseClicked(___ -> {
			var selectedUser = this.tableView.getSelectionModel().getSelectedItems().get(0);

			Users user;
			if (StorageService.getInstance().isOffline()) {
				user = StorageService.getInstance().getUsersList()
						.stream()
						.filter(u -> Objects.equals(u.getEmail(), selectedUser.getEmail()))
						.toList().get(0);
			} else {
				 user = this.users
						.stream()
						.filter(u -> Objects.equals(u.getEmail(), selectedUser.getEmail()))
						.toList().get(0);
			}

				lastNameField.setText(user.getLastName());
				firstNameField.setText(user.getFirstName());
				emailField.setText(user.getEmail());
				roleCombo.setValue(user.getRole());

		});
	}

	@FXML
	void switchToCategoriesPage(MouseEvent __) throws IOException {
		if (auth.checkUserRole()) {
			Stage stage = (Stage) this.addBtn.getScene().getWindow();
			sceneService.switchScene(stage, "categories-view.fxml", null);
		} else {
			Stage stage = (Stage) this.tableView.getScene().getWindow();
			sceneService.switchScene(stage, "categories-dev-view.fxml", null);
		}
	}

	@FXML
	void switchToPlanificationPage(MouseEvent event) throws IOException {
			if(!StorageService.getInstance().isOffline()) {
				if (auth.checkUserRole()) {
					Stage stage = (Stage) this.addBtn.getScene().getWindow();
					sceneService.switchScene(stage, "gantt-view.fxml", null);
				} else {
					Stage stage = (Stage) this.tableView.getScene().getWindow();
					sceneService.switchScene(stage, "gantt-view.fxml", null);
				}
			} else {
				notifierService.notify(NotificationType.WARNING , "Attention" , "Cette fonctionlité n'est pas disponible offline");
			}
	}

	private void getAllMembers() {


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
			this.tableView.getItems().clear();

			StorageService.getInstance().setOffline(true);
			notifierService.notify(NotificationType.WARNING, "Attention", "Connexion peru vous etes en mode offline");
			this.tableView.getItems().clear();
			this.backupList$.addAll(StorageService.getInstance().getUsersList());
			this.tableView.setItems(backupList$);
		} else {
			StorageService.getInstance().setOffline(true);
			Paint offlineColor = Color.GREEN;
			this.conectionCircle.setFill(offlineColor);
			this.connectionStatus.setText("Online");
			connectionStatus.setTextFill(offlineColor);
			this.tableView.getItems().clear();

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
				var response = api.getTypeRequest(baseUrl + "users");
				var json = new JSONObject(response.toString());
				var jsonUsers = json.getJSONArray("users");
				ObservableList<Users> users$ = observableArrayList();

				for (int i = 0; i < jsonUsers.length(); i++) {
					var newUser = new Users(
							jsonUsers.getJSONObject(i).getInt("id"),
							jsonUsers.getJSONObject(i).getString("first_name"),
							jsonUsers.getJSONObject(i).getString("last_name"),
							jsonUsers.getJSONObject(i).getString("email"),
							"blocked",
							jsonUsers.getJSONObject(i).getString("created_at") ,
							jsonUsers.getJSONObject(i).getString("role")
					);

					users.add(newUser);
					users$.add(newUser);
				}

				tableView.setItems(users$);
				StorageService.getInstance().setOffline(false);
			} catch (IOException | RuntimeException e) {
				System.out.println("something went wrong");
			}
		}

	}

	private void setColumns() {
		lastNameColumn.setCellValueFactory(new PropertyValueFactory<>("lastName"));
		firstNameColumn.setCellValueFactory(new PropertyValueFactory<>("firstName"));
		emailColumn.setCellValueFactory(new PropertyValueFactory<>("email"));
	}


	@FXML
	void swithToTicketPage(MouseEvent __) throws IOException {
		if(!StorageService.getInstance().isOffline()) {
			if (auth.checkUserRole()) {
				Stage stage = (Stage) this.addBtn.getScene().getWindow();
				sceneService.switchScene(stage, "tickets-view.fxml", null);
			} else {
				Stage stage = (Stage) this.addBtn.getScene().getWindow();
				sceneService.switchScene(stage, "tickets-view.fxml", null);
			}
		} else {
			notifierService.notify(NotificationType.WARNING , "Attention" , "Cette fonctionlité n'est pas disponible offline");
		}
	}
	@FXML
	void onUpdatePasswordBtnClick(ActionEvent event) throws IOException {
			String password = this.updatePassword.getText();
			if (password.trim().isEmpty()) {
				notifierService.notify(NotificationType.ERROR , "Erreur" , "Mot de passe exigé");
				return;
			}
			JSONObject data = new JSONObject()
				.put("password" , password);
			JSONObject response = new JSONObject(api.postTypeRequest(baseUrl + "users/update_password/" + auth.getUserId() , data).toString());
			if (response.getInt("status_code") == 200) {
				notifierService.notify(NotificationType.SUCCESS , "Success" , "Mot de passe modifier");
			}
	}


	private List<Users> createObjectToExport() {
		return FXCollections.observableList(this.users);
	} ;

	@FXML
	public void onExportBtnClicked(MouseEvent event) throws IOException, ClassNotFoundException, NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {

		List <Users> data = this.createObjectToExport();
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
