package com.example.clm.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.*;
import java.nio.charset.StandardCharsets;

import com.github.tsohr.JSONArray;
import com.github.tsohr.JSONException;
import com.github.tsohr.JSONObject;


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

	public StringBuilder postTypeRequest(String url, JSONObject data) throws IOException {
		// creating request
		URL requestUrl = new URL(url);
		HttpURLConnection conn = (HttpURLConnection) requestUrl.openConnection();
		conn.setRequestMethod("POST");

		// request headers and properties
		conn.setDoOutput(true);

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

	public StringBuilder patchTypeRequest(String url , JSONObject data) throws IOException {
		URL requestUrl = new URL(url);
		HttpURLConnection conn = (HttpURLConnection) requestUrl.openConnection();
		conn.setRequestMethod("PATCH");
		conn.setDoOutput(true);

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
}
