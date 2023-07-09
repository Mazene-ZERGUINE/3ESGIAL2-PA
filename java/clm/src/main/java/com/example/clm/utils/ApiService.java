package com.example.clm.utils;

import java.awt.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.*;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

import com.example.clm.models.Categorie;
import com.example.clm.models.Tasks;
import com.example.clm.models.Users;
import com.github.tsohr.JSONArray;
import com.github.tsohr.JSONObject;
import javafx.scene.paint.Color;
import javafx.scene.shape.Circle;


public class ApiService {

	public ApiService() { }

	public StringBuilder getTypeRequest(String url) throws IOException {
		URL requestUrl = new URL(url);
		HttpURLConnection conn = (HttpURLConnection) requestUrl.openConnection();
		conn.setRequestMethod("GET");

		StringBuilder result = new StringBuilder();

		BufferedReader reader = new BufferedReader(new InputStreamReader((conn.getInputStream()))) ;
		for (String line; (line = reader.readLine()) != null; ) {
			result.append(line) ;

			}
	return result ;
	}

	public StringBuilder deleteTypeRequest(String url) throws IOException {
		URL requestUrl = new URL(url);
		HttpURLConnection conn = (HttpURLConnection) requestUrl.openConnection();
		conn.setRequestMethod("DELETE");

		StringBuilder result = new StringBuilder();

		BufferedReader reader = new BufferedReader(new InputStreamReader((conn.getInputStream()))) ;
		for (String line; (line = reader.readLine()) != null; ) {
			result.append(line) ;

		}
		return result ;
	}

	public int postTypeRequestWithResponseCode(String url, JSONObject data) throws IOException {
		//System.out.println(data);
		URL requestUrl = new URL(url);
		HttpURLConnection conn = (HttpURLConnection) requestUrl.openConnection();
		conn.setRequestMethod("POST");
		conn.setDoOutput(true);
		conn.setRequestProperty("Content-Type", "application/json");

		OutputStream outputStream = conn.getOutputStream();
		outputStream.write(data.toString().getBytes(StandardCharsets.UTF_8));
		outputStream.flush();
		outputStream.close();

		int responseCode = conn.getResponseCode();

		conn.disconnect();

		return responseCode;
	}

	public StringBuilder postTypeRequest(String url, JSONObject data) throws IOException {
		// creating request
		URL requestUrl = new URL(url);
		HttpURLConnection conn = (HttpURLConnection) requestUrl.openConnection();
		conn.setRequestMethod("POST");
		conn.setDoOutput(true);
		conn.setRequestProperty("Content-Type", "application/json");

		// writing request body
		OutputStream outputStream = conn.getOutputStream();
		outputStream.write(data.toString().getBytes(StandardCharsets.UTF_8));
		outputStream.flush();
		outputStream.close();

		// getting request response
		StringBuilder result = new StringBuilder();
		BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8));
		for (String line; (line = reader.readLine()) != null; ) {
			result.append(line);
		}
		return result;
	}

	public StringBuilder putTypeRequest(String url , JSONObject data) throws IOException {
		URL requestUrl = new URL(url);
		HttpURLConnection conn = (HttpURLConnection) requestUrl.openConnection();
		conn.setRequestMethod("PUT");
		conn.setDoOutput(true);
		conn.setRequestProperty("Content-Type", "application/json");

		OutputStream outputStream = conn.getOutputStream();
		outputStream.write(data.toString().getBytes(StandardCharsets.UTF_8));
		outputStream.flush();
		outputStream.close();

		StringBuilder result = new StringBuilder();
		BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8));
		for (String line; (line = reader.readLine()) != null; ) {
			result.append(line);
		}
		return result;
	}

	public StringBuilder dbSync() throws IOException {
		List<Users> usersBackUp = StorageService.getInstance().getUsersList();
		Map<String , List<Tasks>> tasksBackUp = StorageService.getInstance().getProjectTasksDict();
		List<Categorie> projctsBackUp = StorageService.getInstance().getProjectsList();

		JSONObject payload = new JSONObject();

		JSONArray users = new JSONArray(usersBackUp);
		JSONObject tasks = new JSONObject(tasksBackUp);
		JSONArray projects = new JSONArray(projctsBackUp);

		payload.put("users" , users)
				.put("tasks", tasks)
				.put("projects" , projects);

		return this.postTypeRequest("http://localhost:3000/api/client/db_sync" , payload );

	}

	public boolean testApiConnexion() throws IOException {
		URL url = new URL("http://localhost:3000/api/client/ping");
		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		connection.setRequestMethod("GET");
		int responseCode = connection.getResponseCode();
		System.out.println(responseCode);
		return responseCode == HttpURLConnection.HTTP_OK;
	}



}
