package com.example.clm.utils;

import com.example.clm.Main;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;

public class SceneService {

	public SceneService() { }

	public void switchScene(Stage stage , String fileName , Parent root) throws IOException {
		FXMLLoader fxmlLoader = new FXMLLoader(Main.class.getResource("templates/" + fileName));
		if (root == null) {
			root = fxmlLoader.load() ;
 		}
		try {
			stage.setScene(new Scene(root));
			stage.setResizable(false);
			stage.show();
		} catch (Exception exception) {
			System.out.println("can't change current scene");
			System.out.println(exception.getCause() + " " + exception.getMessage());
		}
	}

	public void switchToNewWindow(String fileName, Parent root, Stage stage) throws IOException {
		switchScene(stage, fileName, root);
	}

	public void openTerminal(String... commands) {
		try {
			String[] fullCommands = new String[2 + commands.length];
			fullCommands[0] = "cd " + System.getProperty("user.dir").replace(" ", "\\ ");
			System.arraycopy(commands, 0, fullCommands, 1, commands.length);

			String[] cmd = {
					"osascript",
					"-e", "tell application \"Terminal\"",
					"-e", "if not (exists window 1) then",
					"-e", "do script \"\"",
					"-e", "end if",
					"-e", "tell window 1",
					"-e", "activate",
					"-e", "do script \"" + String.join(";\n", fullCommands) + "\"",
					"-e", "end tell",
					"-e", "end tell"
			};
			Runtime.getRuntime().exec(cmd);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
