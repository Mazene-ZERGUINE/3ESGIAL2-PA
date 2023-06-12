package com.example.clm.utils;

import com.github.tsohr.JSONObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

public class AuthService {

	public AuthService() { } ;

	public boolean checkUserRole() {
		File userInfo = new File("../configs/userInfo.txt");
		userInfo.setReadable(true , true) ;
		JSONObject data = new JSONObject() ;
		try (BufferedReader reader = new BufferedReader(new FileReader("../configs/userInfo.txt"))) {
			String line;
			while ((line = reader.readLine()) != null) {
				data = new JSONObject(line);
			}

			if (data.getString("role").equals("ADMIN")) {
				userInfo.setReadable(false , false);
				return  true ;
			}
		} catch (IOException e) {
			System.out.println("Error reading from the file: " + e.getMessage());
		}
		userInfo.setReadable(false , false) ;
		return  false;
	}

	public int getUserId() {
		File userInfo = new File("../configs/userInfo.txt");
		userInfo.setReadable(true , true) ;
		JSONObject data = new JSONObject() ;
		try (BufferedReader reader = new BufferedReader(new FileReader("../configs/userInfo.txt"))) {
			String line;
			while ((line = reader.readLine()) != null) {
				data = new JSONObject(line);
			}
		} catch (IOException e) {
			System.out.println("Error reading from the file: " + e.getMessage());
		}
		userInfo.setReadable(false , false) ;
		return  data.getInt("id");
	}

	public String getUserName() {
		File userInfo = new File("../configs/userInfo.txt");
		userInfo.setReadable(true , true) ;
		JSONObject data = new JSONObject() ;
		try (BufferedReader reader = new BufferedReader(new FileReader("../configs/userInfo.txt"))) {
			String line;
			while ((line = reader.readLine()) != null) {
				data = new JSONObject(line);
			}
		} catch (IOException e) {
			System.out.println("Error reading from the file: " + e.getMessage());
		}
		userInfo.setReadable(false , false) ;
		return  data.getString("first_name");
	}



}
