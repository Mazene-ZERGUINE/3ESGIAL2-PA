package com.example.clm.controllers;

import com.example.clm.Main;
import com.example.clm.models.Categorie;
import com.example.clm.models.Tasks;
import com.example.clm.models.Tickets;
import com.example.clm.utils.*;
import com.github.tsohr.JSONArray;
import com.github.tsohr.JSONObject;
import javafx.collections.FXCollections;
import javafx.collections.ObservableArray;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.shape.Circle;
import javafx.scene.text.Text;
import javafx.stage.Stage;
import javafx.stage.StageStyle;
import tray.notification.NotificationType;

import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLClassLoader;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.ResourceBundle;

public class TicketsController implements Initializable {


	@FXML
	private TableColumn<String, String> authorCol;

	@FXML
	private Button deleteBtn;

	@FXML
	private TableColumn<String, String> descCol;

	@FXML
	private TextArea description;


	@FXML
	private Circle conectionCircle;

	@FXML
	private Label connectionStatus;
	@FXML
	private Text logOutBtn;

	@FXML
	private TableColumn<String, String> membersCol;

	@FXML
	private ListView<String> projectsListView;

	@FXML
	private TableColumn<String, String> statusCol;

	@FXML
	private TableColumn<String, String> ticketCol;

	@FXML
	private TextField ticketTitle;

	@FXML
	private ComboBox<String> ticketType;

	@FXML
	private TableView<Tickets> ticketsTabel;

	@FXML
	private TableColumn<String, String> typeCol;
	@FXML
	private Button addBtn;

	private ObservableList<Tickets> ticketsList = FXCollections.observableArrayList();
	private final ApiService api = new ApiService() ;
	private  final SceneService sceneService = new SceneService() ;
	private final NotifierService notifierService = new NotifierService() ;

	private final String baseUrl = "http://localhost:3000/api/client/" ;
	private List<Categorie> categories = new ArrayList<>() ;

	private final AuthService auth = new AuthService();







	private void getAllCategories()  {
		javafx.scene.paint.Paint offlineColor = Color.GREEN;
		this.conectionCircle.setFill(offlineColor);
		this.connectionStatus.setText("Online");
		connectionStatus.setTextFill(offlineColor);

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
			projectsListView.getItems().addAll(item.getTitle());
		}
	}

	private void devProjects() throws IOException {
		javafx.scene.paint.Paint offlineColor = Color.GREEN;
		this.conectionCircle.setFill(offlineColor);
		this.connectionStatus.setText("Online");
		connectionStatus.setTextFill(offlineColor);
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
			categories.add(categorie) ;
			projectsListView.getItems().add(dataArray.getJSONObject(i).getString("title"));
		}
	}



	@FXML
	void onAddBtnClick(ActionEvent event) throws IOException {
		String ticket_title = ticketTitle.getText();
		String ticketTag = this.ticketType.getValue();
		String ticketDescription = this.description.getText();

		if (ticket_title.trim().isEmpty() || ticketTag.trim().isEmpty()) {
			notifierService.notify(NotificationType.ERROR, "Erreur" , "Le titre est obligatoire.");
			return;
		}
		var selectedProject = projectsListView.getSelectionModel().getSelectedItems().get(0);
		int projectId = categories.stream().filter(element -> Objects.equals(element.getTitle(), selectedProject)).toList().get(0).getId();

		if (selectedProject.isEmpty()) {
			notifierService.notify(NotificationType.ERROR, "Erreur", "Veuillez sélectionner un projet");
			return;
		}
		JSONObject payload = new JSONObject()
				.put("members" , "none")
				.put("status", "A FAIRE")
				.put("author" , auth.getUserName())
				.put("description", ticketDescription)
				.put("tag" , ticketTag)
				.put("ticket_title" , ticket_title)
				.put("project_id" , projectId);

		JSONObject response = new JSONObject(api.postTypeRequest(baseUrl + "tickets/" , payload).toString());
		this.ticketsTabel.getItems().clear();
		getAllTickets();
	}


	private void getAllTickets() throws IOException {
		var selectedProject = projectsListView.getSelectionModel().getSelectedItems().get(0);
		int projectId = categories.stream().filter(element -> Objects.equals(element.getTitle(), selectedProject)).toList().get(0).getId();

		StringBuilder response = api.getTypeRequest(baseUrl + "tickets/" + projectId);
		JSONObject jsonnResponse = new JSONObject(response.toString());
		if (jsonnResponse.getInt("status_code") == 200) {
			JSONArray dataArray = jsonnResponse.getJSONArray("tickets");
			for (int i = 0; i < dataArray.length(); i++) {
				Tickets ticket = new Tickets(
						dataArray.getJSONObject(i).getString("members"),
						dataArray.getJSONObject(i).getString("status"),
						dataArray.getJSONObject(i).getString("description"),
						dataArray.getJSONObject(i).getString("tag"),
						dataArray.getJSONObject(i).getString("author"),
						dataArray.getJSONObject(i).getInt("ticket_id"),
						dataArray.getJSONObject(i).getString("ticket_title")
				);
				ticketsList.add(ticket);
			}
			ticketsTabel.setItems(ticketsList);
			this.authorCol.setCellValueFactory(new PropertyValueFactory<>("author"));
			this.descCol.setCellValueFactory(new PropertyValueFactory<>("description"));
			this.ticketCol.setCellValueFactory(new PropertyValueFactory<>("ticket_title"));
			this.membersCol.setCellValueFactory(new PropertyValueFactory<>("members"));
			this.typeCol.setCellValueFactory(new PropertyValueFactory<>("tag"));
			this.statusCol.setCellValueFactory(new PropertyValueFactory<>("status"));

		}

		statusCol.setCellFactory(column -> {
			return new TableCell<String, String>() {
				@Override
				protected void updateItem(String item, boolean empty) {
					super.updateItem(item, empty);
					if (item == null || empty) {
						setText(null);
						setStyle("");
					} else {
						if (item.equals("A FAIRE")) {
							setText(item);
							statusCol.setStyle("-fx-text-fill: #f52fe1;");
						} else if (item.equals("EN COURS")) {
							setText(item);
							setStyle("-fx-text-fill: orange;");
						} else if (item.equals("TERMINE")) {
							setText(item);
							setStyle("-fx-text-fill:#98fc6d ;");
						} else if (item.equals("BLOQUE")) {
							setText(item);
							setStyle("-fx-text-fill:red ;");
						} else {
							setText(item);
							setStyle("-fx-text-fill:green ;");
						}
					}
				}
			};
		});

		typeCol.setCellFactory(column -> {
			return new TableCell<String, String>() {
				@Override
				protected void updateItem(String item, boolean empty) {
					super.updateItem(item, empty);
					if (item == null || empty) {
						setText(null);
						setStyle("");
					} else {
						if (item.equals("Tests")) {
							setText(item);
							statusCol.setStyle("-fx-text-fill: #f52fe1;");
						} else if (item.equals("Documentation")) {
							setText(item);
							setStyle("-fx-text-fill: orange;");
						} else if (item.equals("Aide")) {
							setText(item);
							setStyle("-fx-text-fill:#98fc6d ;");
						} else if (item.equals("BUG")) {
							setText(item);
							setStyle("-fx-text-fill:red ;");
						} else {
							setText(item);
							setStyle("-fx-text-fill:grey ;");
						}
					}
				}
			};
		});
	}


	@FXML
	void onTerminalBtnClick(MouseEvent event) throws IOException {
		sceneService.openTerminal("clear","java -jar ./console/consoleapp.jar");
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
	void onDeleteBtnClick(ActionEvent event) throws IOException {
		int selectedTicket = ticketsTabel.getSelectionModel().getSelectedItems().get(0).getId();
		api.deleteTypeRequest(baseUrl + "tickets/" + selectedTicket);
		ticketsTabel.getItems().clear();
		getAllTickets();
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
		void switchToCategoriesPage(MouseEvent __) throws IOException {
			if (auth.checkUserRole()) {
				Stage stage = (Stage) this.addBtn.getScene().getWindow();
				sceneService.switchScene(stage, "categories-view.fxml", null);
			} else {
				Stage stage = (Stage) this.ticketsTabel.getScene().getWindow();
				sceneService.switchScene(stage, "categories-dev-view.fxml", null);
			}
	}

	@FXML
	void switchToMembersPage(MouseEvent __) throws IOException {
		Stage stage = (Stage)this.addBtn.getScene().getWindow();
		if (!auth.checkUserRole()) {
			sceneService.switchScene(stage , "dev-members-view.fxml" , null);
		} else {
			sceneService.switchScene(stage , "members-view.fxml" , null);

		}
	}

	@FXML
	void switchToPlanificationPage(MouseEvent event) throws IOException {
		if(!StorageService.getInstance().isOffline()) {
			if (auth.checkUserRole()) {
				Stage stage = (Stage) this.addBtn.getScene().getWindow();
				sceneService.switchScene(stage, "gantt-view.fxml", null);
			} else {
				Stage stage = (Stage) this.addBtn.getScene().getWindow();
				sceneService.switchScene(stage, "gantt-view.fxml", null);
			}
		} else {
			notifierService.notify(NotificationType.WARNING , "Attention" , "Cette fonctionnalité n'est pas disponible hors-ligne.");
		}
	}

	@FXML
	void getSelectedTickets(MouseEvent event) {
		this.ticketsTabel.getItems().clear();
		try {
			getAllTickets();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	private void setTheme() throws IOException {
		if (StorageService.getInstance().getThemeName() == null) {
			StorageService.getInstance().setThemeName("mainTheme");
		}
		this.addBtn.sceneProperty().addListener((observable, oldValue, newValue) -> {
			if (newValue != null) {
				Scene scene = addBtn.getScene();

				StorageService.getInstance().setSelectedTheme(scene);
			}
		});
	}
	@Override
	public void initialize(URL url, ResourceBundle resourceBundle) {
		this.ticketType.getItems().add("BUG");
		this.ticketType.getItems().add("Question");
		this.ticketType.getItems().add("Documentation");
		this.ticketType.getItems().add("Aide");
		this.ticketType.getItems().add("Tests");
		try {
			setTheme();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		try {
			if (auth.checkUserRole()) {
				this.getAllCategories();
			} else {

				this.devProjects();
			}
		} catch (Exception exception) {
			System.out.println("can't get projects list " + exception.getCause());
		}
	}

	private List<Tickets> createObjectToExport() {
		return FXCollections.observableList(this.ticketsList);
	}

	@FXML
	public void onExportBtnClicked(MouseEvent event) throws IOException, ClassNotFoundException, NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {

		if (StorageService.getInstance().isOffline()) {
			notifierService.notify(NotificationType.WARNING , "Attention" , "Cette fonctionnalité n'est pas disponible hors-ligne.");
			return;
		}

		List <Tickets> data = this.createObjectToExport();
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

					notifierService.notify(NotificationType.SUCCESS , "Fichier sauvegardé" , "Le fichier " + fileName + " est sauvegardé dans " + filePath );
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

	@FXML
	void onTicketSelect(MouseEvent event) throws IOException {
		if (event.getClickCount() >= 2) {
			Tickets selectedTicket = ticketsTabel.getSelectionModel().getSelectedItems().get(0);

			FXMLLoader loader = new FXMLLoader(Main.class.getResource("templates/update-ticket-view.fxml"));
			Stage statusPopUp = new Stage();
			Scene scene = new Scene(loader.load());
			UpdateTicketController controller = loader.getController();

			controller.setData(selectedTicket);

			statusPopUp.setScene(scene);
			statusPopUp.setResizable(false);
			statusPopUp.initStyle(StageStyle.UNDECORATED);

			Parent tasksRoot = addBtn.getScene().getRoot();
			tasksRoot.setDisable(true);

			statusPopUp.setOnHidden(e -> {
				try {
					ticketsTabel.getItems().clear();
					getAllTickets();
				} catch (IOException ex) {
					throw new RuntimeException(ex);
				}
				tasksRoot.setDisable(false);
			});

			statusPopUp.show();
		}
	}
}


