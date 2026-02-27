module fu.se.lab7 {

    // ---- JavaFX ----
    requires javafx.controls;
    requires javafx.fxml;
    requires javafx.base;

    // ---- Persistence ----
    requires java.sql;
    requires jakarta.persistence;
    requires org.hibernate.orm.core;

    requires java.naming; // nếu driver hoặc môi trường yêu cầu

    // ---- OPEN for reflection ----

    // Entity cho Hibernate + JavaFX TableView binding
    opens fu.se.lab7.pojos to
            org.hibernate.orm.core,
            javafx.base;

    // Controller cho FXML
    opens fu.se.lab7.controller to javafx.fxml;

    // ---- EXPORT API ----
    exports fu.se.lab7.controller;
    exports fu.se.lab7.service;
    exports fu.se.lab7.repository;
    exports fu.se.lab7.dao;
    exports fu.se.lab7.pojos;
}