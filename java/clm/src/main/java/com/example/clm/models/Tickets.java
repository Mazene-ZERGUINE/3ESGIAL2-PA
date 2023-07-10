package com.example.clm.models;

public class Tickets {

    private String members;
    private String status;

    private String description;

    private String tag;

    private String author;

    private int id;

    public Tickets(String members, String status, String description, String tag, String author, int id, String ticket_title) {
        this.members = members;
        this.status = status;
        this.description = description;
        this.tag = tag;
        this.author = author;
        this.id = id;
        this.ticket_title = ticket_title;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    private String ticket_title;

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getMembers() {
        return members;
    }

    public void setMembers(String members) {
        this.members = members;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getTicket_title() {
        return ticket_title;
    }

    public void setTicket_title(String ticket_title) {
        this.ticket_title = ticket_title;
    }







}
