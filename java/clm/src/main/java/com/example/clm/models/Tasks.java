package com.example.clm.models;

public class Tasks {
	private int id ;
	private String label ;
	private String description;

	private String created_at;
	private String deadline;
	private String status;
	private String members;

	public String getStartAt() {
		return startAt;
	}

	public void setStartAt(String startAt) {
		this.startAt = startAt;
	}

	private String startAt;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCreated_at() {
		return created_at;
	}

	public void setCreated_at(String created_at) {
		this.created_at = created_at;
	}

	public String getDeadline() {
		return deadline;
	}

	public void setDeadline(String deadline) {
		this.deadline = deadline;
	}


	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getMembers() {
		return members;
	}

	public void setMembers(String members) {
		this.members = members;
	}

	public Tasks(int id, String label, String description, String created_at, String deadline, String status , String members , String startAt) {
		this.id = id;
		this.label = label;
		this.description = description;
		this.created_at = created_at;
		this.deadline = deadline;
		this.status = status;
		this.members = members;
		this.startAt = startAt;
	}



}
