package com.example.clm.utils;

import com.example.clm.Main;
import javafx.scene.Scene;

public class StorageService {

	private String selectedExportFormat ;
	private static StorageService instance;

	private String exportFileName;

	private String themeName;

	public String getThemeName() {
		return themeName;
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
