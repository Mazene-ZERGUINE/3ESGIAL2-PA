package com.example.clm;

import com.example.clm.utils.ApiService;
import com.github.tsohr.JSONObject;

import java.io.*;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Scanner;

public class ConsoleApp {
    private static final String baseUrl = "http://localhost:3000/api/client/" ;

    public static void main(String[] args) throws IOException, InterruptedException {
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
            if (input.equals("--help")) {
                System.out.println("clm --version: verifier la version de  CLM");
                System.out.println("clm check-updates: verifier les mis a jour de  CLM");
                System.out.println("clm check-export-formats: verifier les nouveau format d'export disponible");
                System.out.println("clm install-export-format <format> : install le nouveau d'export" );
                System.out.println();
            } else if (input.equals("clm --version")) {
                getAppVersion();
                System.out.println();
            } else if (input.equals("clm check-updates")) {
                checkForUpdates();
                System.out.println();
            } else if (input.equals("clm check-export-formats")) {
                checkExportsFormat();
                System.out.println();
            } else if (input.equals("exit")) {
                System.exit(1);
            } else {
                System.out.println("\u001B[31m" +  "wrong input Tapez la commande help pour voir la liste des commandes du CLI" + "\u001B[0m");
            }

        }
    }


    private static void checkExportsFormat() {
        try {
            ApiService api = new ApiService();
            JSONObject response = new JSONObject(api.getTypeRequest(baseUrl + "check_exports").toString());
            System.out.println(response);
        } catch (Exception e) {
            System.out.println(" > pas de format d'export disponible");
            System.out.println(e.getCause() + " " + e.getMessage());
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

    private static void checkForUpdates() throws IOException, InterruptedException {

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

        String appVersion = data.getString("version");

        ApiService api = new ApiService();
        try {
            JSONObject response = new JSONObject(api.getTypeRequest(baseUrl + "check_updates/" + data.getString("version") ).toString()) ;
            if (response.getInt("code_status") == 200) {
                System.out.println("\u001B[32m" + " > des nouveau mis à jour sont disponible " + "\u001B[0m");
                System.out.println("\u001B[32m" + " > version" + response.getString("version") + "\u001B[0m");
                System.out.println(" > voulez vous mettre à jour CLM? yes/no");

                String res = new Scanner(System.in).nextLine();
                if (res.equals("yes")) {
                    // downloading updates jar file //
                    File tmp = new File("./tmp");
                    tmp.mkdirs();

                    String updateJarFileUrl =  "http://localhost:3000/updates/" + response.getString("version");
                    String savePath = "./tmp/clm.jar";
                    try {
                        downloadFile(updateJarFileUrl, savePath);
                    } catch (IOException e) {
                        System.out.println("An error occurred while downloading the file: " + e.getMessage());
                        System.out.println(e.getCause() + " " + e.getMessage());
                        throw  e;
                    }
                    System.out.println("Téléchargement des mis à jours");
                    progressBar();
                    System.out.println("Téléchargement terminer");
                    // replacing older jar file withe the updates jar file //
                    String sourceFilePath = "./tmp/clm.jar";
                    String destinationFilePath = "./clm.jar";

                    File sourceFile = new File(sourceFilePath);
                    File destinationFile = new File(destinationFilePath);

                    try {
                        Files.copy(sourceFile.toPath(), destinationFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
                        System.out.println("File replaced successfully.");
                    } catch (IOException e) {
                        System.out.println("An error occurred while replacing the file: " + e.getMessage());
                    }


                    System.out.println("Instalation des mis à jour");
                    progressBar();
                    System.out.println("Instalation Terminé");

                    System.out.println("Redamarage de CLM");
                    Thread.sleep(100);

                    // restarting the application to see the new updates //
                    System.out.println("starting system updates");
                    ProcessBuilder processBuilder = new ProcessBuilder("pkill", "-f", "/usr/bin/java -jar ./clm.jar");
                    Process process = processBuilder.start();
                    String currentDirectory = System.getProperty("user.dir");
                    ProcessBuilder processBuilder2= new ProcessBuilder("./run.sh");
                    processBuilder2.directory(new File(currentDirectory));
                    Process process2 = processBuilder2.start();

                    tmp.delete();
                }
            }
        } catch (Exception e) {
            System.out.println(" > pas de mis à jour détecter!");
        }

    }

    private static void downloadFile(String fileUrl, String savePath) throws IOException {
        URL url = new URL(fileUrl);
        try (BufferedInputStream in = new BufferedInputStream(url.openStream());
             FileOutputStream fileOutputStream = new FileOutputStream(savePath)) {
            byte[] dataBuffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = in.read(dataBuffer, 0, 1024)) != -1) {
                fileOutputStream.write(dataBuffer, 0, bytesRead);
            }
        }
    }

    private static void progressBar() {
        int total = 100;
        int progressBarWidth = 50;

        for (int i = 0; i <= total; i++) {
            int progress = (int) (i * 100.0 / total);

            System.out.print("\r[");

            int filledWidth = progress * progressBarWidth / 100;
            int emptyWidth = progressBarWidth - filledWidth;

            for (int j = 0; j < filledWidth; j++) {
                System.out.print("#");
            }

            for (int j = 0; j < emptyWidth; j++) {
                System.out.print(" ");
            }

            System.out.print("] " + progress + "%");

            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        System.out.println();
    }
}

