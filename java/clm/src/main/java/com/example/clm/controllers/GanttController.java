package com.example.clm.controllers;
import com.example.clm.models.Categorie;
import com.example.clm.models.Tasks;
import com.example.clm.utils.ApiService;
import com.example.clm.utils.AuthService;
import com.example.clm.utils.SceneService;
import com.github.tsohr.JSONArray;
import com.github.tsohr.JSONObject;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.geometry.Pos;
import javafx.scene.chart.*;
import javafx.scene.control.*;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.StackPane;
import javafx.scene.text.Text;
import javafx.scene.chart.CategoryAxis;
import javafx.scene.chart.NumberAxis;
import javafx.scene.chart.XYChart;
import javafx.scene.control.Label;
import javafx.stage.Stage;

import java.io.IOException;
import java.net.URL;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.ResourceBundle;


public class GanttController implements Initializable {

	@FXML
	private BarChart<Integer, String> chart;

	private final static AuthService auth = new AuthService() ;
	@FXML
	private NumberAxis daysAxis;

	@FXML
	private ListView<String> projectsList;

	@FXML
	private CategoryAxis tasksAxis;
	private final static SceneService sceneService = new SceneService();
	private List<Categorie> categories = new ArrayList<>() ;
	private final String baseUrl = "http://localhost:3000/api/client/" ;
	private final ApiService api = new ApiService() ;
	@FXML
	private Text logoutBtn;

	@FXML
	private Text projects;
	private final XYChart.Series<Integer, String> dataSeries = new XYChart.Series<>();


	public void devProjects() throws IOException {
		int userId = auth.getUserId();
		StringBuilder response = api.getTypeRequest(baseUrl + "categories/dev/" + userId);
		JSONObject jsonResponse = new JSONObject(response.toString());
		JSONArray dataArray = jsonResponse.getJSONArray("projects") ;
		for (int i = 0 ; i < dataArray.length() ; i++) {
			Categorie categorie = new Categorie(
				dataArray.getJSONObject(i).getInt("id"),
				dataArray.getJSONObject(i).getString("title"),
				dataArray.getJSONObject(i).getString("desciption")
			);
			categories.add(categorie) ;
			projectsList.getItems().add(dataArray.getJSONObject(i).getString("title"));
		}
	}

	public void getAllProjets() {
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
			projectsList.getItems().addAll(item.getTitle());
		}
	}




	@FXML
	void onProjectListSelect(MouseEvent event) throws IOException {
		dataSeries.getData().clear();
		chart.getData().clear();
		// getting the selected categoryId from the listView
		String selectedElement = projectsList.getSelectionModel().getSelectedItems().get(0);
		List<Categorie> selectedCategorie = categories.stream().filter(element -> Objects.equals(element.getTitle(), selectedElement)).toList();
		int categoryId = selectedCategorie.get(0).getId();

		// getting all tasks of the selected category
		StringBuilder response = api.getTypeRequest(baseUrl + "tasks/" + categoryId);
		JSONObject jsonResponse = new JSONObject(response.toString());
		if (jsonResponse.getInt("status_code") == 200) {
			List<Tasks> tasksList = new ArrayList<>();
			JSONArray dataArray = jsonResponse.getJSONArray("tasks");
			for (int i = 0; i < dataArray.length(); i++) {
				Tasks task = new Tasks(
					dataArray.getJSONObject(i).getInt("taskid"),
					dataArray.getJSONObject(i).getString("label"),
					dataArray.getJSONObject(i).getString("description"),
					dataArray.getJSONObject(i).getString("created_at"),
					dataArray.getJSONObject(i).getString("deadline"),
					dataArray.getJSONObject(i).getString("status"),
					dataArray.getJSONObject(i).getString("members"),
					dataArray.getJSONObject(i).getString("start_at")
				);
				tasksList.add(task);
			}
			setChartData(tasksList);
			this.chart.getData().add(this.dataSeries);
		}

	}


	private void setChartData(List<Tasks> data) {
		data.forEach(element -> {
			if (!element.getStatus().equals("VERIFIE")) {
				// parsing the dates of creatin and the deadline of each task //
				Instant instant = Instant.parse(element.getStartAt());
				ZoneId parisZone = ZoneId.of("Europe/Paris");
				LocalDateTime creatinDate = LocalDateTime.ofInstant(instant, parisZone);
				Instant instant2 = Instant.parse(element.getDeadline());
				LocalDateTime deadline = LocalDateTime.ofInstant(instant2, parisZone);
				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
				String from = formatter.format(creatinDate);
				String to = formatter.format(deadline);
				// getting the number of days between the tow
				Integer numberOfDays = (int) ChronoUnit.DAYS.between(creatinDate, deadline);
				// setting the chart data
				XYChart.Data<Integer, String> dataPoint = new XYChart.Data<>(numberOfDays, element.getLabel());
				dataPoint.nodeProperty().addListener((obs, oldNode, newNode) -> {
					if (newNode != null) {
						Label label = new Label(from + " / " + to + " (" + numberOfDays + " jour(s) restant(s))");
						label.setStyle("-fx-font-size: 10px; -fx-font-weight: bold;");
						StackPane stackPane = (StackPane) newNode;
						stackPane.getChildren().add(label);
						StackPane.setAlignment(label, Pos.BASELINE_CENTER);
						if (element.getStatus().equals("TERMINE")) {
							newNode.setStyle("-fx-bar-fill: green;");

							Tooltip tooltip = new Tooltip("Tâche: \s\s " + element.getLabel() + "\s \s  \n" +
								"--------------------" + " \s\s\n" +
								"De: \s\s" + from + " \s\s \n" +
								"Jusqu'à:\s\s " + to + "\s\s  \n" +
								"En attente de validation ... \s\s");
							tooltip.setStyle("-fx-font-size: 14px; -fx-font-weight: bold; -fx-text-fill: green;");
							Tooltip.install(newNode, tooltip);
						} else if (numberOfDays < 7) {
							newNode.setStyle("-fx-bar-fill: orange;");
							Tooltip tooltip = new Tooltip("Tâche: \s\s " + element.getLabel() + "\s \s  \n" +
								"--------------------" + " \s\s\n" +
								"De: \s\s" + from + " \s\s \n" +
								"Jusqu'à:\s\s " + to + "\s\s  \n" +
								"Il vous reste moins d'une semaine + " + "(" + numberOfDays + " jour(s)) \s\s");
							tooltip.setStyle("-fx-font-size: 14px; -fx-font-weight: bold; -fx-text-fill: orange;");
							Tooltip.install(newNode, tooltip);
						} else {
							newNode.setStyle("-fx-bar-fill: #eb7777;");
							Tooltip tooltip = new Tooltip("Taâche: \s\s " + element.getLabel() + "\s \s  \n" +
								"--------------------" + " \s\s\n" +
								"De: \s\s" + from + " \s\s \n" +
								"Jusqu'à:\s\s " + to + "\s\s  \n" +
								"Il vous reste : \s\s " + numberOfDays + " jours \s\s");
							tooltip.setStyle("-fx-font-size: 14px; -fx-font-weight: bold; -fx-text-fill: #eb7777;");
							Tooltip.install(newNode, tooltip);
						}

					}
				});
				this.dataSeries.getData().add(dataPoint);
			}
		});
	}

	@FXML
	void onProjectsBtnClick(MouseEvent event) throws IOException {
		if (auth.checkUserRole()) {
			Stage stage = (Stage) this.logoutBtn.getScene().getWindow();
			sceneService.switchScene(stage, "categories-view.fxml", null);
		} else {
			Stage stage = (Stage) this.logoutBtn.getScene().getWindow();
			sceneService.switchScene(stage, "categories-dev-view.fxml", null);
		}
	}

	@FXML
	void onLogoutBtnClick(MouseEvent event) throws IOException  {
		Stage stage = (Stage) projectsList.getScene().getWindow();
		sceneService.switchToNewWindow("sign-in-view.fxml" , null , stage);
	}


	@Override
	public void initialize(URL url, ResourceBundle resourceBundle) {
		if (!auth.checkUserRole()) {
			try {
				System.out.println("dev");
				devProjects();
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		} else {
			System.out.println("admin");
			getAllProjets();

		}
		ScrollPane scrollPane = new ScrollPane();
		scrollPane.setContent(chart);
		scrollPane.setFitToWidth(true);
		scrollPane.setFitToHeight(true);

		tasksAxis.setLabel("Tâches");
		daysAxis.setLabel("Jours");

	}

	@FXML
	void switchToMembersPage(MouseEvent __) throws IOException {
		if (auth.checkUserRole()) {
			Stage stage = (Stage) this.logoutBtn.getScene().getWindow();
			sceneService.switchScene(stage, "members-view.fxml", null);
		} else {
			Stage stage = (Stage) this.logoutBtn.getScene().getWindow();
			sceneService.switchScene(stage, "dev-members-view.fxml", null);
		}

	}
}
