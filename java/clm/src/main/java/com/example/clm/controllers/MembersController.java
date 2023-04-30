package com.example.clm.controllers;

import com.example.clm.Main;
import com.example.clm.models.Users;
import com.example.clm.utils.ApiService;
import com.example.clm.utils.NotifierService;
import com.example.clm.utils.SceneService;
import com.github.tsohr.JSONObject;
import javafx.application.Application;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.input.MouseEvent;
import javafx.stage.Stage;
import tray.notification.NotificationType;

import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.ResourceBundle;

import static javafx.collections.FXCollections.observableArrayList;


public class MembersController extends Application implements Initializable {

	private final ApiService api = new ApiService();
	private final SceneService sceneService = new SceneService();
	private final NotifierService notifierService = new NotifierService();

	private final String baseUrl = "http://localhost:3000/api/client/";

	private List<Users> users = new ArrayList<>();

	@FXML
	private TableView<Users> tableView;

	@FXML
	private TableColumn lastNameColumn;
	@FXML
	private TableColumn firstNameColumn;
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
	private TextField confirmPasswordField;

	@FXML
	private Button addBtn;

	@Override
	public void start(Stage stage) throws IOException {
		FXMLLoader fxmlLoader = new FXMLLoader(Main.class.getResource("templates/members-view.fxml"));
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
		setColumns();
		getAllMembers();
	}

	@FXML
	void onAddBtnClick(ActionEvent __) {
		var lastName = lastNameField.getText().trim();
		var firstName = firstNameField.getText().trim();
		var email = emailField.getText().trim();
		var password = passwordField.getText();
		var confirmPassword = confirmPasswordField.getText();

		var isOneFieldEmpty = lastName.isBlank() || firstName.isBlank() || email.isBlank() || password.isBlank() || confirmPassword.isBlank();
		if (isOneFieldEmpty) {
			notifierService.notify(NotificationType.ERROR, "Error", "Tous les champs sont obligatoires.");
			return;
		}

		if (!arePasswordsSame(passwordField.getText(), confirmPasswordField.getText())) {
			notifierService.notify(NotificationType.ERROR, "Error", "Les mots de passes ne sont pas identiques.");
			return;
		}

		var payload = new JSONObject();
		payload
			.put("last_name", lastName)
			.put("first_name", firstName)
			.put("email", email)
			.put("password", password);

		try {
			api.postTypeRequest(baseUrl + "users/", payload);

			this.tableView.getItems().clear();
			this.users.clear();
			getAllMembers();
			clearFields();

			notifierService.notify(NotificationType.SUCCESS, "Success", "Utilisateur ajouté.");
		} catch (IOException e) {
			notifierService.notify(NotificationType.ERROR, "Error", "Une erreur est survenue lors de l'ajout d'un utilisateur.");
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
		confirmPasswordField.clear();
	}

	@FXML
	void onUpdateBtnClick(ActionEvent event) throws IOException {
	}

	@FXML
	void onDeleteBtnClick(ActionEvent __) {
		var selectedUser = this.tableView.getSelectionModel().getSelectedItems().get(0);
		List<Users> selectedUsers = this.users
			.stream()
			.filter(user -> Objects.equals(user.getEmail(), selectedUser.getEmail()))
			.toList();

		try {
			for (var user : selectedUsers) {
				api.deleteTypeRequest(baseUrl + "users/" + user.getEmail());

				this.tableView.getItems().remove(selectedUser);
				getAllMembers();

				notifierService.notify(NotificationType.SUCCESS, "Success", "Utilisateur supprimé.");
			}
		} catch (IOException e) {
			notifierService.notify(NotificationType.ERROR, "Error", "Une erreur est survenu lors de la suppression de l'utilisateur.");
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
			List<Users> selectedUsers = this.users
				.stream()
				.filter(user -> Objects.equals(user.getEmail(), selectedUser.getEmail()))
				.toList();

			for (var user : selectedUsers) {
				lastNameField.setText(user.getLastName());
				firstNameField.setText(user.getFirstName());
				emailField.setText(user.getEmail());
			}
		});
	}

	@FXML
	void switchToCategoriesPage(MouseEvent __) throws IOException {
		Stage stage = (Stage) this.addBtn.getScene().getWindow();
		sceneService.switchScene(stage, "categories-view.fxml", null);
	}

	@FXML
	void switchToPlanificationPage(MouseEvent event) throws IOException {
		Stage stage = (Stage) this.addBtn.getScene().getWindow();
		sceneService.switchScene(stage, "gantt-view.fxml", null);
	}

	private void getAllMembers() {
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
					jsonUsers.getJSONObject(i).getString("password"),
					jsonUsers.getJSONObject(i).getString("created_at")
				);

				users.add(newUser);
				users$.add(newUser);
			}

			tableView.setItems(users$);
		} catch (IOException | RuntimeException e) {
			notifierService.notify(NotificationType.ERROR, "Erreur", "Un problème est survenu...");
		}
	}

	private void setColumns() {
		lastNameColumn.setCellValueFactory(new PropertyValueFactory<>("lastName"));
		firstNameColumn.setCellValueFactory(new PropertyValueFactory<>("firstName"));
		emailColumn.setCellValueFactory(new PropertyValueFactory<>("email"));
	}
}
