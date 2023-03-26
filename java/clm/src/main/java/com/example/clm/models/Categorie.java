package com.example.clm.models;

public class Categorie {

	private int id ;
	private  String title ;

	public Categorie(int id, String title, String discreption) {
		this.id = id;
		this.title = title;
		this.discreption = discreption;
	}

	private  String discreption ;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setDiscreption(String discreption) {
		this.discreption = discreption;
	}

	public String getTitle() {
		return title;
	}

	public String getDiscreption() {
		return discreption;
	}
}
