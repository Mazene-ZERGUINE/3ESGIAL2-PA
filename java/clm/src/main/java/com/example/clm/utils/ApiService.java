package com.example.clm.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;

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

}
