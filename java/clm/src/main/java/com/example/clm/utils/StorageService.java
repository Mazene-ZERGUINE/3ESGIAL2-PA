package com.example.clm.utils;

public class StorageService {

	private String selectedExportFormat ;
	private static StorageService instance;

	private String exportFileName;
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
}
