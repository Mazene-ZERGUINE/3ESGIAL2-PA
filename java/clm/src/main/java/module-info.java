module com.example.clm {
    requires javafx.controls;
    requires javafx.fxml;

    requires org.controlsfx.controls;
    requires net.synedra.validatorfx;
    requires org.kordamp.bootstrapfx.core;
    requires json;
    requires TrayNotification;
    requires org.yaml.snakeyaml;
	requires java.desktop;
    requires richtextfx;
    requires com.jfoenix;

    opens com.example.clm to javafx.fxml;
	opens com.example.clm.models;

	exports com.example.clm;
    exports com.example.clm.controllers;
    opens com.example.clm.controllers to javafx.fxml;
	exports com.example.clm.utils;
	opens com.example.clm.utils to javafx.fxml;
}
