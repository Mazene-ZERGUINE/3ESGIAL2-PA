package com.example.clm.utils;

import javafx.scene.paint.Color;
import javafx.util.Duration;
import tray.animations.AnimationType;
import tray.notification.NotificationType;
import tray.notification.TrayNotification;

public class NotifierService {

	public NotifierService() { }

	public void notify(NotificationType type , String title , String message) {
		TrayNotification tray = new TrayNotification(title, message, type);
		tray.setAnimationType(AnimationType.POPUP);
		tray.setRectangleFill(Color.valueOf("#2A9A84"));
		tray.showAndDismiss(Duration.seconds(4));
	}

}
