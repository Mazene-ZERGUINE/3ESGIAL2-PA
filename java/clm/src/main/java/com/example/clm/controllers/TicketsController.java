package com.example.clm.controllers;

import com.example.clm.Main;
import com.example.clm.models.Categorie;
import com.example.clm.models.Tasks;
import com.example.clm.utils.*;
import com.github.tsohr.JSONArray;
import com.github.tsohr.JSONObject;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.VBox;
import javafx.scene.text.Text;
import javafx.stage.Stage;
import tray.notification.NotificationType;

import java.io.IOException;
import java.net.URL;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.ResourceBundle;

public class TicketsController implements Initializable {

	@FXML
	private Button addBtn;

	@FXML
	private Button deleteBtn;

	@FXML
	private VBox vbox;

	@FXML
	private Text logOutBtn;

	@FXML
	private TextField ticketTitle;

	@FXML
	private ComboBox<String> ticketType;

	@FXML
	private TextArea description;

	@FXML
	private ListView<String> projectsListView;

	private final ApiService api = new ApiService() ;
	private  final SceneService sceneService = new SceneService() ;
	private final NotifierService notifierService = new NotifierService() ;

	private final String baseUrl = "http://localhost:3000/api/client/" ;
	private List<Categorie> categories = new ArrayList<>() ;

	private final AuthService auth = new AuthService();





	private void getAllCategories()  {
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
		var ticketTitle = this.ticketTitle.getText();
		var tag = this.ticketType.getValue();
		var description = this.description.getText();
		var selectedProject = projectsListView.getSelectionModel().getSelectedItems().get(0);

		if (selectedProject.trim().isEmpty()) {
			notifierService.notify(NotificationType.ERROR , "Erreur" , "Vous devez seléctionner un projet");
			return;
		}
		int projectId  = categories.stream().filter(element -> Objects.equals(element.getTitle(), selectedProject)).toList().get(0).getId();

		JSONObject json = new JSONObject().put("project_id" , projectId)
			.put("tag" , tag)
			.put("description" , description)
			.put("ticket_title", ticketTitle);

		if (ticketTitle.trim().isEmpty() || tag.trim().isEmpty()) {
			notifierService.notify(NotificationType.ERROR , "Erreur" , "Vous devez choisir un tag et mettre un titre pour le ticket");
			return;
		}
		// sending api request //

		StringBuilder response = api.postTypeRequest(baseUrl + "tickets" , json);
		JSONObject jsonResponse = new JSONObject(response.toString());
		if (jsonResponse.getInt("status_code") == 200) {
			notifierService.notify(NotificationType.SUCCESS , "Créer" , "Ticket " + ticketTitle + " créer avec success");
		} else {
			notifierService.notify(NotificationType.ERROR , "Erreur" , "Une erruer est survenu");
		}
	}


	private void getAllTickets() throws IOException {
		var selectedProject = projectsListView.getSelectionModel().getSelectedItems().get(0);
		int projectId  = categories.stream().filter(element -> Objects.equals(element.getTitle(), selectedProject)).toList().get(0).getId();

		StringBuilder response = api.getTypeRequest(baseUrl + "tickets/" + projectId);
		JSONObject jsonnResponse = new JSONObject(response.toString());
		if (jsonnResponse.getInt("status_code") == 200) {
			JSONArray data = jsonnResponse.getJSONArray("tickets");

			for (int i = 0 ; i < data.length(); i++ ) {
				try {
					FXMLLoader fxmlLoader = new FXMLLoader(Main.class.getResource("templates/ticket-line.fxml"));
					Parent ticketLine = fxmlLoader.load();

					// Retrieve the controller associated with the ticket-line.fxml
					TicketsLineController controller = fxmlLoader.getController();

					controller.setData(data.getJSONObject(i).getString("ticket_title"),
						data.getJSONObject(i).getString("tag"),auth.getUserName(),
						LocalDate.now().toString());

					if (data.getJSONObject(i).getString("tag").equals("BUG")) {
						controller.setPaneColor("red");
					} else if (data.getJSONObject(i).getString("tag").equals("Question")) {
						controller.setPaneColor("blue");
					}
					// TODO: ------ other colors here -----

					vbox.getChildren().add(ticketLine);

				} catch (IOException e) {
					System.out.println(e.getMessage() + " " + e.getCause());
				}
			}
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

	@FXML
	void onDeleteBtnClick(ActionEvent event) {

	}

	@FXML
	void onLogOutBtnClick(MouseEvent event) {

	}

	@FXML
	void switchToCategoriesPage(MouseEvent event) {

	}

	@FXML
	void switchToPlanificationPage(MouseEvent event) {

	}

	@FXML
	void getSelectedTickets(MouseEvent event) {
	try {
		vbox.getChildren().clear();
		 getAllTickets();
	} catch (IOException e) {
		System.out.println(e.getMessage() + " " + e.getCause());
	}
	}

	private void setTheme() throws IOException {
		if (StorageService.getInstance().getThemeName() == null) {
			StorageService.getInstance().setThemeName("mainTheme");
		}
		this.vbox.sceneProperty().addListener((observable, oldValue, newValue) -> {
			if (newValue != null) {
				Scene scene = vbox.getScene();

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
}

