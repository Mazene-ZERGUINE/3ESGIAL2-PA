package com.example.clm.controllers;
import com.example.clm.models.Categorie;
import com.example.clm.models.Tasks;
import com.example.clm.utils.ApiService;
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

	@FXML
	private NumberAxis daysAxis;

	@FXML
	private ListView<String> projectsList;

	@FXML
	private CategoryAxis tasksAxis;
	private List<Categorie> categories = new ArrayList<>() ;
	private final String baseUrl = "http://localhost:3000/api/client/" ;
	private final ApiService api = new ApiService() ;
	@FXML
	private Text logoutBtn;

	@FXML
	private Text projects;
	private final XYChart.Series<Integer, String> dataSeries = new XYChart.Series<>();




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
	void onLogoutBtnClick(MouseEvent event) {

	}

	@FXML
	void onProjectListSelect(MouseEvent event) throws IOException {
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
					dataArray.getJSONObject(i).getString("members")
				);
				tasksList.add(task);
			}
			setChartData(tasksList);
			this.chart.getData().add(this.dataSeries);
		}

	}


	private void setChartData(List<Tasks> data) {
		data.forEach(element -> {
			if (!element.getStatus().equals("VERIFIED")) {
				// parsing the dates of creatin and the deadline of each task //
				Instant instant = Instant.parse(element.getCreated_at());
				ZoneId parisZone = ZoneId.of("Europe/Paris");
				LocalDateTime creatinDate = LocalDateTime.ofInstant(instant, parisZone);
				instant = Instant.parse(element.getDeadline());
				LocalDateTime deadline = LocalDateTime.ofInstant(instant, parisZone);
				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
				String from = formatter.format(creatinDate);
				String to = from.formatted(deadline);
				// getting the number of days between the tow
				Integer numberOfDays = (int) ChronoUnit.DAYS.between(creatinDate, deadline);
				// setting the chart data
				XYChart.Data<Integer, String> dataPoint = new XYChart.Data<>(numberOfDays, element.getLabel());
				dataPoint.nodeProperty().addListener((obs, oldNode, newNode) -> {
					if (newNode != null) {
						Label label = new Label(from + " / " + to + " (" + numberOfDays + " Jour restant)");
						label.setStyle("-fx-font-size: 10px; -fx-font-weight: bold;");
						StackPane stackPane = (StackPane) newNode;
						stackPane.getChildren().add(label);
						StackPane.setAlignment(label, Pos.BASELINE_CENTER);
						if (element.getStatus().equals("DONE")) {
							newNode.setStyle("-fx-bar-fill: green;");

							Tooltip tooltip = new Tooltip("Tàche: \s\s " + element.getLabel() + "\s \s  \n" +
								"--------------------" + " \s\s\n" +
								"De: \s\s" + from + " \s\s \n" +
								"Jusqu'à:\s\s " + to + "\s\s  \n" +
								"En attend de validation ... \s\s");
							tooltip.setStyle("-fx-font-size: 14px; -fx-font-weight: bold; -fx-text-fill: green;");
							Tooltip.install(newNode, tooltip);
						} else if (numberOfDays < 7) {
							newNode.setStyle("-fx-bar-fill: orange;");
							Tooltip tooltip = new Tooltip("Tàche: \s\s " + element.getLabel() + "\s \s  \n" +
								"--------------------" + " \s\s\n" +
								"De: \s\s" + from + " \s\s \n" +
								"Jusqu'à:\s\s " + to + "\s\s  \n" +
								"il vous reste moins qu'une semaine + " + "(" + numberOfDays + " jours) \s\s");
							tooltip.setStyle("-fx-font-size: 14px; -fx-font-weight: bold; -fx-text-fill: orange;");
							Tooltip.install(newNode, tooltip);
						} else {
							newNode.setStyle("-fx-bar-fill: #eb7777;");
							Tooltip tooltip = new Tooltip("Tàche: \s\s " + element.getLabel() + "\s \s  \n" +
								"--------------------" + " \s\s\n" +
								"De: \s\s" + from + " \s\s \n" +
								"Jusqu'à:\s\s " + to + "\s\s  \n" +
								"il vous reste: \s\s " + numberOfDays + " jours \s\s");
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
	void onProjectsBtnClick(MouseEvent event) {

	}



	@Override
	public void initialize(URL url, ResourceBundle resourceBundle) {

		getAllProjets();

		tasksAxis.setLabel("Tasks");
		daysAxis.setLabel("Days");

	}
}
