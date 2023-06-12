package com.example.clm.controllers;

import com.example.clm.Main;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.Label;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.AnchorPane;

import java.io.IOException;

public class TicketsLineController  {


	@FXML
	private Label createdBy;

	@FXML
	private Label creatingDate;

	@FXML
	private Label member;

	@FXML
	private Label status;

	@FXML
	private Label tagTitle;

	@FXML
	private Label ticketName;


	public void setData(String ticketName , String tag , String createdBy , String creatinDate) {
		this.createdBy.setText(createdBy);
		this.tagTitle.setText(tag);
		this.creatingDate.setText(creatinDate);
		this.ticketName.setText(ticketName);
	}

	@FXML
	public void handleTicketLineClicked(MouseEvent event) {

	}


}


