package com.example.clm.controllers;

import com.example.clm.models.Tickets;
import com.example.clm.models.Users;
import com.example.clm.utils.ApiService;
import com.example.clm.utils.StorageService;
import com.github.tsohr.JSONArray;
import com.github.tsohr.JSONObject;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.stage.Stage;

import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

public class UpdateTicketController implements Initializable {
    private final String baseUrl = "http://localhost:3000/api/client/";

    private static final ApiService api = new ApiService();
    private List<Users> users = new ArrayList<>();
    @FXML
    private Button closeBtn;

    @FXML
    private TextArea description;

    @FXML
    private ComboBox<String> status1;

    @FXML
    private TextField title;

    private Stage stage = new Stage();
    @FXML
    private ComboBox<String> type;

    @FXML
    private Button updateBtn;

    @FXML
    private ListView<String> usersList;

    private int ticketId;



    @FXML
    void onUpdateBtnClick(ActionEvent event) throws IOException {
        String status = this.status1.getValue();
        String type = this.type.getValue();
        String desc = this.description.getText();
        String title = this.title.getText();

        ObservableList<String> selectedUsers = usersList.getSelectionModel().getSelectedItems();

        JSONObject payload = new JSONObject()
                .put("members" , selectedUsers)
                .put("status", status)
                .put("description", desc)
                .put("tag" , type)
                .put("ticket_title", title);

        api.putTypeRequest(baseUrl + "tickets/" + ticketId , payload);
        stage =(Stage) closeBtn.getScene().getWindow();
        stage.close();
    }


    @FXML
    void onCloseBtnClick(ActionEvent event) {
        stage =(Stage) closeBtn.getScene().getWindow();
        stage.close();
    }
    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        status1.getItems().add("A FAIRE");
        status1.getItems().add("EN COURS");
        status1.getItems().add("TERMINE");
        status1.getItems().add("VERIFIE");
        status1.getItems().add("BLOQUE");

        type.getItems().add("BUG");
        type.getItems().add("Question");
        type.getItems().add("Documentation");
        type.getItems().add("Aide");
        type.getItems().add("Tests");



        try {
            this.setTheme();
            getAllUsers();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }



    public void setData(Tickets ticket) throws IOException {
        this.status1.setValue(ticket.getStatus());
        this.type.setValue(ticket.getTag());
        this.title.setText(ticket.getTicket_title());
        this.description.setText(ticket.getDescription());

        this.ticketId = ticket.getId();
    }

    private void setTheme() throws IOException {
        if (StorageService.getInstance().getThemeName() == null) {
            StorageService.getInstance().setThemeName("mainTheme");
        }
        this.usersList.sceneProperty().addListener((observable, oldValue, newValue) -> {
            if (newValue != null) {
                Scene scene = this.usersList.getScene();

                StorageService.getInstance().setSelectedTheme(scene);
            }
        });
    }



    private void getAllUsers()  {
        StringBuilder response = null;
        try {
            response = api.getTypeRequest(baseUrl + "users/");

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
                usersList.getItems().add( dataArray.getJSONObject(i).getString("first_name")) ;
            }
            usersList.getSelectionModel().setSelectionMode(SelectionMode.MULTIPLE); ;
        } catch (IOException e) {
            usersList = null;
        }
    }
}
