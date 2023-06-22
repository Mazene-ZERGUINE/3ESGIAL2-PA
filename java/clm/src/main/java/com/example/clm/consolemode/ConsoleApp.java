package com.example.clm.consolemode;

import com.github.tsohr.JSONObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.Scanner;

public class ConsoleApp {

    public static void main(String[] args) {
        System.out.println("  ____ _     ___");
        System.out.println(" / ___| |   |_ _|");
        System.out.println("| |   | |    | |");
        System.out.println("| |___| |___ | |");
        System.out.println(" \\____|_____|___|");
        System.out.println();
        System.out.println("\u001B[31m" +  "Tapez la commande help pour voir la liste des commandes du CLI" + "\u001B[0m");

        String input = "" ;
        while (!input.equals("exit")) {
            System.out.print("clm > ");
            Scanner scanner = new Scanner(System.in);
            input = scanner.nextLine();
            System.out.println();

            if (input.equals("app --version")) {
                getAppVersion();
            } else if (input.equals("app check-updates")) {
                System.out.println("app updates");
            } else if (input.equals("app update")) {
                System.out.println("updating app");
            } else if (input.equals("exit")) {
                System.exit(1);
            } else {
                System.out.println("\u001B[31m" +  "wrong input Tapez la commande help pour voir la liste des commandes du CLI" + "\u001B[0m");
            }

        }
    }

    private static void getAppVersion() {
        String path = "../configs/app_version.json" ;
        File appFile = new File(path) ;

        JSONObject data = null;
        try (BufferedReader reader = new BufferedReader(new FileReader("../configs/app_version.json"))) {
            StringBuilder jsonContent = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                jsonContent.append(line);
            }
            data = new JSONObject(jsonContent.toString());
        } catch (IOException e) {
            System.out.println("Error reading from the file: " + e.getMessage());
        }


        System.out.println(" > CLM verssion: " + data.getString("version"));
        System.out.println(" > equipe: " + data.getString("author"));
        System.out.println(" > date de sortie:" + data.getString("release_date"));
        System.out.println();
    }

}
