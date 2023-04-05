module com.example.clm {
    requires javafx.controls;
    requires javafx.fxml;

    requires org.controlsfx.controls;
    requires net.synedra.validatorfx;
    requires org.kordamp.bootstrapfx.core;
    requires json;
    requires TrayNotification;

    opens com.example.clm to javafx.fxml;
	opens com.example.clm.models to javafx.base;
	exports com.example.clm;
    exports com.example.clm.controllers;
    opens com.example.clm.controllers to javafx.fxml;
}
