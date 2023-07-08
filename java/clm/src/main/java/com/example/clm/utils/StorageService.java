package com.example.clm.utils;

import com.example.clm.Main;
import com.example.clm.models.Categorie;
import com.example.clm.models.Tasks;
import com.example.clm.models.Users;
import javafx.scene.Scene;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class StorageService {

	private String selectedExportFormat ;
	private static StorageService instance;

	private String exportFileName;

	private String themeName;

	public String getThemeName() {
		return themeName;
	}

	public boolean offline = false ;

	public boolean isOffline() {
		return offline;
	}

	public void setOffline(boolean offline) {
		this.offline = offline;
	}

	Map<String, List<Tasks>> projectTasksDict = new HashMap<>();

	public List<Categorie> projectsList = new ArrayList<>();

	public Map<String, List<Tasks>> getProjectTasksDict() {
		return projectTasksDict;
	}


	public void setProjectTasksDict(Map<String, List<Tasks>> projectTasksDict) {
		this.projectTasksDict = projectTasksDict;
	}

	public List<Users> usersList = new ArrayList<>();

	public List<?> tasksList = new ArrayList<>();

	public List<Users> getUsersList() {
		return usersList;
	}

	public void setUsersList(List<Users> usersList) {
		this.usersList = usersList;
	}

	public List<?> getTasksList() {
		return tasksList;
	}

	public void setTasksList(List<?> tasksList) {
		this.tasksList = tasksList;
	}

	public List<?> getTicketList() {
		return ticketList;
	}

	public void setTicketList(List<?> ticketList) {
		this.ticketList = ticketList;
	}

	public List<?> ticketList = new ArrayList<>();

	public List<Categorie> getProjectsList() {
		return projectsList;
	}

	public void setProjectsList(List<Categorie> projectsList) {
		this.projectsList = projectsList;
	}

	public void setThemeName(String themeName) {
		this.themeName = themeName;
	}

	private StorageService() {}

	public static StorageService getInstance() {
		if (instance == null) {
			instance = new StorageService();
		}
		return instance;
	}

	public String getSelectedExportFormat() {
		return selectedExportFormat;
	}

	public void setSelectedExportFormat(String selectedExportFormat) {
		this.selectedExportFormat = selectedExportFormat;
	}

	public void setExportFileName(String exportFileName) {
			this.exportFileName = exportFileName ;
	}

	public String getExportFileName() {
		return this.exportFileName;
	}

	public void setSelectedTheme(Scene scene) {
		String cssFilePath = "/com/example/clm/styles/" + this.themeName + ".css";
		scene.getStylesheets().clear();
		scene.getStylesheets().add(Main.class.getResource(cssFilePath).toExternalForm());
	}
}
