package fu.se.lab7.controller;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;

public class MainApplication extends Application {

    @Override
    public void start(Stage primaryStage) {
        try {
            FXMLLoader loader = new FXMLLoader(
                    getClass().getResource("/student-view.fxml"));
            Scene scene = new Scene(loader.load());
            primaryStage.setTitle("Quản Lý Sinh Viên - Thư Viện");
            primaryStage.setScene(scene);
            primaryStage.setMinWidth(720);
            primaryStage.setMinHeight(560);
            primaryStage.setResizable(true);
            primaryStage.show();
        } catch (IOException e) {
            System.err.println("Lỗi khi tải giao diện FXML: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        launch(args);
    }
}