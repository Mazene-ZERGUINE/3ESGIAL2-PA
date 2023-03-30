package com.example.clm.controllers;

import com.example.clm.Main;
import com.example.clm.models.Categorie;
import com.example.clm.models.Tasks;
import com.example.clm.utils.ApiService;
import com.example.clm.utils.NotifierService;
import com.example.clm.utils.SceneService;
import com.github.tsohr.JSONArray;
import com.github.tsohr.JSONObject;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.image.ImageView;
import javafx.scene.input.MouseEvent;
import javafx.stage.Stage;
import javafx.stage.StageStyle;
import tray.notification.NotificationType;

import java.io.IOException;
import java.net.URL;
import java.util.List;
import java.util.ResourceBundle;

public class TasksController implements Initializable {
	private final NotifierService notifierService = new NotifierService();
	private final String baseUrl = "http://localhost:3000/api/client/";

	private final static ApiService api = new ApiService();
	private final SceneService sceneService = new SceneService();
	@FXML
	private Button addBtn;

	@FXML
	private ImageView backBtn;

	@FXML
	private Button deleteBtn;

	@FXML
	private TableView<Tasks> tasksTable;

	@FXML
	private TableColumn<Tasks, String> creationCol;

	@FXML
	private TableColumn<Tasks, String> dealineCol;


	@FXML
	private TableColumn<Tasks, String> descriptionCol;

	@FXML
	private TableColumn<?, ?> membersCol;


	@FXML
	private TableColumn<Tasks, String> statusCol;

	@FXML
	private TableColumn<Tasks, String> taskCol;

	@FXML
	private Label category;
	private String categoryTitle;
	private int categoryId;
	private Parent root;
	@FXML
	private ImageView refrechBtn;

	private final ObservableList<Tasks> tasksList = FXCollections.observableArrayList();

	public void setData(List<Categorie> categorie) throws IOException {
		this.categoryTitle = categorie.get(0).getTitle();
		this.categoryId = categorie.get(0).getId();
		category.setText(categoryTitle);
		getAllTasks(categoryId);
	}

	// button events
	@FXML
	void onAddBtnClick(ActionEvent event) throws IOException {
		FXMLLoader fxmlLoader = new FXMLLoader(Main.class.getResource("templates/add-task-view.fxml"));
		try {
			root = fxmlLoader.load();
			addTaskController controller = fxmlLoader.getController();
			controller.setData(categoryId);
			Stage stage = new Stage();
			sceneService.switchToNewWindow("add-task-view.fxml", root, stage);
		} catch (IOException exception) {
			System.out.println(exception.toString());
		}
	}

	@FXML
	void onBackBtnClick(MouseEvent event) throws IOException {
		Stage stage = (Stage) deleteBtn.getScene().getWindow();
		sceneService.switchScene(stage, "categories-view.fxml", null);
	}



	@FXML
	void onDeleteBtnClick(ActionEvent event) throws IOException {
		int selectedID = tasksTable.getSelectionModel().getSelectedItems().get(0).getId();
		StringBuilder response = api.deleteTypeRequest(baseUrl + "tasks/" + selectedID);
		JSONObject jsonResponse = new JSONObject(response.toString()) ;
		if (jsonResponse.getInt("status_code") == 200) {
			refreshList();
			notifierService.notify(NotificationType.SUCCESS , "SUCCESS" , "tache supprimer");
		}
	}
	@FXML
	void onRefrechBtnClicked(MouseEvent event) throws IOException {
		refreshList();
	}

	public void refreshList() throws IOException {
		tasksTable.getItems().clear();
		getAllTasks(categoryId);
	}
	public void getAllTasks(int categoryId) throws IOException {
		StringBuilder response = api.getTypeRequest(baseUrl + "tasks/" + categoryId);
		JSONObject jsonResponse = new JSONObject(response.toString());
		if (jsonResponse.getInt("status_code") == 200) {
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
			tasksTable.setItems(tasksList);
			statusCol.setCellValueFactory(new PropertyValueFactory<>("status"));
			taskCol.setCellValueFactory(new PropertyValueFactory<>("label"));
			dealineCol.setCellValueFactory(new PropertyValueFactory<>("deadline"));
			descriptionCol.setCellValueFactory(new PropertyValueFactory<>("description"));
			creationCol.setCellValueFactory(new PropertyValueFactory<>("created_at"));
			membersCol.setCellValueFactory(new PropertyValueFactory<>("members"));

			// setting columns colors
			statusCol.setCellFactory(column -> {
				return new TableCell<Tasks, String>() {
					@Override
					protected void updateItem(String item, boolean empty) {
						super.updateItem(item, empty);
						if (item == null || empty) {
							setText(null);
							setStyle("");
						} else {
							if (item.equals("TODO")) {
								setText(item);
								statusCol.setStyle("-fx-text-fill: #f52fe1;");
							} else if (item.equals("IN PROGRESS")) {
								setText(item);
								setStyle("-fx-text-fill: orange;");
							} else if (item.equals("DONE")) {
								setText(item);
								setStyle("-fx-text-fill:#98fc6d ;");
							} else if (item.equals("STUCK")) {
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
		}
	}
	@FXML
	void onTaskSelect(MouseEvent event) throws IOException {
		if (event.getClickCount() >= 1) {
			// getting the selected row and column of the clicked item
			TablePosition<? , ?> pos = tasksTable.getSelectionModel().getSelectedCells().get(0);
			int row = pos.getRow();
			int col = pos.getColumn();
			int  taskId = tasksTable.getItems().get(row).getId();
			// opening the status update modal window
			if (col == 5) {
				FXMLLoader loader = new FXMLLoader(Main.class.getResource("templates/status-pop-up.fxml"));
				Stage statusPopUp = new Stage();
				Scene scene = new Scene(loader.load());
				StatusPopUpController controller = loader.getController();
				controller.setData(taskId);
				statusPopUp.setScene(scene);
				statusPopUp.setResizable(false);
				statusPopUp.initStyle(StageStyle.UNDECORATED);

				Parent tasksRoot = addBtn.getScene().getRoot();
				tasksRoot.setDisable(true);

				statusPopUp.setOnHidden(e -> {
					try {
						refreshList();
					} catch (IOException ex) {
						throw new RuntimeException(ex);
					}
					tasksRoot.setDisable(false);
				});

				statusPopUp.show();
			}
		}
	}

	@Override
	public void initialize(URL url, ResourceBundle resourceBundle) {
	}
}
