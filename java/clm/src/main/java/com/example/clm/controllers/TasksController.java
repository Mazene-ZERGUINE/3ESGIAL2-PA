package com.example.clm.controllers;
import java.awt.Desktop;

import com.example.clm.Main;
import com.example.clm.models.Categorie;
import com.example.clm.models.Tasks;
import com.example.clm.utils.*;
import com.github.tsohr.JSONArray;
import com.github.tsohr.JSONObject;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.image.ImageView;
import javafx.scene.input.MouseEvent;
import javafx.scene.paint.Color;
import javafx.scene.paint.Paint;
import javafx.scene.shape.Circle;
import javafx.stage.Modality;
import javafx.stage.Screen;
import javafx.stage.Stage;
import javafx.stage.StageStyle;
import org.yaml.snakeyaml.DumperOptions;
import tray.notification.NotificationType;
import java.io.FileWriter;


import java.io.File;
import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLClassLoader;
import java.text.SimpleDateFormat;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.*;
import org.yaml.snakeyaml.Yaml;


public class TasksController implements Initializable {
	private final NotifierService notifierService = new NotifierService();
	private final String baseUrl = "http://localhost:3000/api/client/";

	private final static ApiService api = new ApiService();
	private final SceneService sceneService = new SceneService();
	@FXML
	private Button addBtn;

	private final static AuthService auth = new AuthService();
	@FXML
	private ImageView backBtn;

	@FXML
	private Button deleteBtn;

	@FXML
	private TableView<Tasks> tasksTable;

	private final ObservableList<Tasks> backupList = FXCollections.observableArrayList();

	@FXML
	private TableColumn<Tasks, String> creationCol;

	@FXML
	private TableColumn<Tasks, String> dealineCol;

	@FXML
	private Circle conectionCircle;

	@FXML
	private Label connectionStatus;
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

			if (StorageService.getInstance().isOffline()) {
				controller.setBackData(this.categoryTitle);
			} else {
				controller.setData(categoryId);
			}

			Stage stage = new Stage();

			Parent tasksRoot = addBtn.getScene().getRoot();
			tasksRoot.setDisable(true);

			stage.setResizable(false);
			stage.initStyle(StageStyle.UNDECORATED);
			stage.centerOnScreen();
			sceneService.switchToNewWindow("add-task-view.fxml", root, stage);

			stage.setOnHidden(e -> {
				try {
					refreshList();
				} catch (IOException ex) {
					throw new RuntimeException(ex);
				}
				tasksRoot.setDisable(false);
			});



		} catch (IOException exception) {
			System.out.println(exception.toString());
			System.out.println(exception.getCause() + "\n" + exception.getMessage());
		}
	}

	private void setTheme() throws IOException {
		if (StorageService.getInstance().getThemeName() == null) {
			StorageService.getInstance().setThemeName("mainTheme");
		}
		addBtn.sceneProperty().addListener((observable, oldValue, newValue) -> {
			if (newValue != null) {
				Scene scene = addBtn.getScene();

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
	void onBackBtnClick(MouseEvent event) throws IOException {
		Stage stage = (Stage) deleteBtn.getScene().getWindow();
		if(!auth.checkUserRole()) {
			sceneService.switchScene(stage, "categories-dev-view.fxml", null);

		} else {
			sceneService.switchScene(stage, "categories-view.fxml", null);
		}
	}

	@FXML
	void onTerminalBtnClick(MouseEvent event) throws IOException {
		sceneService.openTerminal("clear","java -jar ./console/consoleapp.jar");
	}

	@FXML
	void onDeleteBtnClick(ActionEvent event) throws IOException {
		try {
			int selectedID = tasksTable.getSelectionModel().getSelectedItems().get(0).getId();
			StringBuilder response = api.deleteTypeRequest(baseUrl + "tasks/" + selectedID);
			JSONObject jsonResponse = new JSONObject(response.toString());
			if (jsonResponse.getInt("status_code") == 200) {
				refreshList();
				notifierService.notify(NotificationType.SUCCESS, "Succès", "Tâche supprimée.");
			}
		} catch (Exception e) {
			if (StorageService.getInstance().isOffline()) {
				String selectedTask = tasksTable.getSelectionModel().getSelectedItems().get(0).getLabel();
				List<Tasks> tasks = StorageService.getInstance().getProjectTasksDict().get(this.categoryTitle);
				tasks.removeIf(task -> task.getLabel().equals(selectedTask));
				refreshList();
			}
		}
	}



	@FXML
	public void onExportBtnClicked(MouseEvent event) throws IOException, ClassNotFoundException, NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {

		if (StorageService.getInstance().isOffline()) {
			notifierService.notify(NotificationType.WARNING , "Attention" , "Cette fonctionnalité n'est pas disponible hors-ligne.");
			return;
		}
		
		List <Tasks> data = this.createObjectToExport();
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

	private List<Tasks> createObjectToExport() {
		return FXCollections.observableList(tasksList);
	} ;

	public void refreshList() throws IOException {
		tasksTable.getItems().clear();
		getAllTasks(categoryId);
	}
	public void getAllTasks(int categoryId) throws IOException {
		try {
			StringBuilder response = api.getTypeRequest(baseUrl + "tasks/" + categoryId);
			JSONObject jsonResponse = new JSONObject(response.toString());
			if (jsonResponse.getInt("status_code") == 200) {
				JSONArray dataArray = jsonResponse.getJSONArray("tasks");
				for (int i = 0; i < dataArray.length(); i++) {
					ZonedDateTime zonedDateTime = ZonedDateTime.parse(dataArray.getJSONObject(i).getString("deadline"));
					ZonedDateTime formatStartAt = ZonedDateTime.parse(dataArray.getJSONObject(i).getString("start_at"));
					DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
					String formatedDeadline = zonedDateTime.format(formatter);
					String formatedStartAt = formatStartAt.format(formatter);
					Tasks task = new Tasks(
							dataArray.getJSONObject(i).getInt("taskid"),
							dataArray.getJSONObject(i).getString("label"),
							dataArray.getJSONObject(i).getString("description"),
							formatedStartAt,
							formatedDeadline,
							dataArray.getJSONObject(i).getString("status"),
							dataArray.getJSONObject(i).getString("members"),
							dataArray.getJSONObject(i).getString("created_at")
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

				datesVerifications();
			}
		} catch (Exception e) {
			if (StorageService.getInstance().isOffline()){
				List<Tasks> dataArray = StorageService.getInstance().getProjectTasksDict().get(this.categoryTitle);
				if (dataArray != null) {
					backupList.addAll(dataArray);

					tasksTable.setItems(this.backupList);
					statusCol.setCellValueFactory(new PropertyValueFactory<>("status"));
					taskCol.setCellValueFactory(new PropertyValueFactory<>("label"));
					dealineCol.setCellValueFactory(new PropertyValueFactory<>("deadline"));
					descriptionCol.setCellValueFactory(new PropertyValueFactory<>("description"));
					creationCol.setCellValueFactory(new PropertyValueFactory<>("created_at"));
					membersCol.setCellValueFactory(new PropertyValueFactory<>("members"));

					//datesVerifications();
			}

			}
		}

	}

	public void datesVerifications() {
		// setting rappel time red line for deadline passed and yellow line for 7 days or less befor deadline
		tasksTable.setRowFactory(tableView -> {
			TableRow<Tasks> row = new TableRow<>();
			row.itemProperty().addListener((obs, oldItem, newItem) -> {
				if (newItem != null && newItem.getDeadline() != null) {
					LocalDateTime now = LocalDateTime.now();
					LocalDate deadlineTime = LocalDate.parse(newItem.getDeadline());
					LocalDateTime time = deadlineTime.atStartOfDay();
					boolean doneStatusTest = now.isAfter(time) && !newItem.getStatus().equals("TERMINE");
					boolean verifiedStatusTest = now.isAfter(time) && !newItem.getStatus().equals("VERIFIE") ;
					boolean sevenDaysToDoneTest = ChronoUnit.DAYS.between(now , time) < 7 && !newItem.getStatus().equals("TERMINE");
					boolean sevenDaysToVerifiedTest = ChronoUnit.DAYS.between(now , time) < 7 && !newItem.getStatus().equals("VERIFIE");
					if ( doneStatusTest && verifiedStatusTest) {
						row.setStyle("-fx-background-color: red;");
					} else if (sevenDaysToDoneTest && sevenDaysToVerifiedTest){
						row.setStyle("-fx-background-color: yellow;");
					}	else {
						row.setStyle("");
					}
				}
			});
			return row;
		});

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
	}

	@FXML
	void onTaskSelect(MouseEvent event) throws IOException {
		if (event.getClickCount() >= 2) {
			// getting the selected row and column of the clicked item
			TablePosition<? , ?> pos = tasksTable.getSelectionModel().getSelectedCells().get(0);
			int row = pos.getRow();
			int col = pos.getColumn();
			int  taskId = tasksTable.getItems().get(row).getId();
			String taskLabel = tasksTable.getItems().get(row).getLabel();
			// opening the status update modal window
				FXMLLoader loader = new FXMLLoader(Main.class.getResource("templates/status-pop-up.fxml"));
				Stage statusPopUp = new Stage();
				Scene scene = new Scene(loader.load());
				StatusPopUpController controller = loader.getController();

				if (StorageService.getInstance().isOffline()) {
					controller.setLabelName(taskLabel , this.categoryTitle);
				} else {
					controller.setData(taskId);
				}

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

	@FXML
	void switchToMembersPage(MouseEvent __) throws IOException {
		Stage stage = (Stage)this.tasksTable.getScene().getWindow();
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
				sceneService.switchScene(stage, "tickets-view.fxml", null);
			} else {
				Stage stage = (Stage) this.tasksTable.getScene().getWindow();
				sceneService.switchScene(stage, "tickets-view.fxml", null);
			}
		} else {
			notifierService.notify(NotificationType.WARNING , "Attention" , "Cette fonctionnalité n'est pas disponible hors-ligne.");
		}
	}

	@FXML
	void switchToPlanificationPage(MouseEvent event) throws IOException {
		if(!StorageService.getInstance().isOffline()) {
			if (auth.checkUserRole()) {
				Stage stage = (Stage) this.addBtn.getScene().getWindow();
				sceneService.switchScene(stage, "gantt-view.fxml", null);
			} else {
				Stage stage = (Stage) this.tasksTable.getScene().getWindow();
				sceneService.switchScene(stage, "gantt-view.fxml", null);
			}
		} else {
			notifierService.notify(NotificationType.WARNING , "Attention" , "Cette fonctionnalité n'est pas disponible hors-ligne.");
		}
	}
	@Override
	public void initialize(URL url, ResourceBundle resourceBundle) {
		try {
			setTheme();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}


}
