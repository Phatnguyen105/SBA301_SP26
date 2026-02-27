package fu.se.lab7.controller;

import fu.se.lab7.pojos.Student;
import fu.se.lab7.service.StudentService;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;

import java.net.URL;
import java.util.List;
import java.util.ResourceBundle;

public class StudentController implements Initializable {

    // TableView & Columns
    @FXML private TableView<Student> studentTable;
    @FXML private TableColumn<Student, Integer> idColumn;
    @FXML private TableColumn<Student, String> emailColumn;
    @FXML private TableColumn<Student, String> passwordColumn;
    @FXML private TableColumn<Student, String> firstNameColumn;
    @FXML private TableColumn<Student, String> lastNameColumn;
    @FXML private TableColumn<Student, Double> marksColumn;

    // TextFields
    @FXML private TextField txtEmail;
    @FXML private TextField txtFirstName;
    @FXML private TextField txtLastName;
    @FXML private TextField txtMarks;
    @FXML private PasswordField txtPassword;

    private final StudentService studentService = new StudentService();

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {

        idColumn.setCellValueFactory(new PropertyValueFactory<>("id"));
        emailColumn.setCellValueFactory(new PropertyValueFactory<>("email"));
        passwordColumn.setCellValueFactory(new PropertyValueFactory<>("password"));
        passwordColumn.setCellFactory(col -> new TableCell<>() {
            @Override
            protected void updateItem(String item, boolean empty) {
                super.updateItem(item, empty);
                setText(empty || item == null ? null : "*".repeat(item.length()));
            }
        });
        firstNameColumn.setCellValueFactory(new PropertyValueFactory<>("firstName"));
        lastNameColumn.setCellValueFactory(new PropertyValueFactory<>("lastName"));
        marksColumn.setCellValueFactory(new PropertyValueFactory<>("marks"));

        refreshStudentTable();

        studentTable.getSelectionModel()
                .selectedItemProperty()
                .addListener((obs, oldVal, newVal) -> {
                    if (newVal != null) {
                        displayStudentDetails(newVal);
                    }
                });
    }

    private void refreshStudentTable() {
        try {
            List<Student> students = studentService.findAll();
            ObservableList<Student> list =
                    FXCollections.observableArrayList(students);
            studentTable.setItems(list);
        } catch (Exception e) {
            showAlert(Alert.AlertType.ERROR,
                    "Lỗi",
                    "Không thể tải danh sách sinh viên: " + e.getMessage());
        }
    }

    private void displayStudentDetails(Student student) {
        txtEmail.setText(student.getEmail());
        txtPassword.setText(student.getPassword());
        txtFirstName.setText(student.getFirstName());
        txtLastName.setText(student.getLastName());
        txtMarks.setText(String.valueOf(student.getMarks()));
    }

    private void clearForm() {
        txtEmail.clear();
        txtPassword.clear();
        txtFirstName.clear();
        txtLastName.clear();
        txtMarks.clear();
        studentTable.getSelectionModel().clearSelection();
    }

    private void showAlert(Alert.AlertType type, String title, String message) {
        Alert alert = new Alert(type);
        alert.setTitle(title);
        alert.setHeaderText(null);
        alert.setContentText(message);
        alert.showAndWait();
    }

    // CREATE
    @FXML
    private void handleAddStudent() {
        try {
            String email = txtEmail.getText();
            String password = txtPassword.getText();
            String firstName = txtFirstName.getText();
            String lastName = txtLastName.getText();
            Double marks = Double.parseDouble(txtMarks.getText());

            Student student =
                    new Student(email, password, firstName, lastName, marks);

            studentService.save(student);

            showAlert(Alert.AlertType.INFORMATION,
                    "Thành công",
                    "Sinh viên đã được thêm.");

            refreshStudentTable();
            clearForm();

        } catch (NumberFormatException e) {
            showAlert(Alert.AlertType.ERROR,
                    "Lỗi",
                    "Điểm phải là số hợp lệ.");
        } catch (Exception e) {
            showAlert(Alert.AlertType.ERROR,
                    "Lỗi",
                    e.getMessage());
        }
    }

    // UPDATE
    @FXML
    private void handleUpdateStudent() {
        try {
            Student selected =
                    studentTable.getSelectionModel().getSelectedItem();

            if (selected == null) {
                showAlert(Alert.AlertType.WARNING,
                        "Cảnh báo",
                        "Vui lòng chọn sinh viên.");
                return;
            }

            selected.setEmail(txtEmail.getText());
            selected.setPassword(txtPassword.getText());
            selected.setFirstName(txtFirstName.getText());
            selected.setLastName(txtLastName.getText());
            selected.setMarks(Double.parseDouble(txtMarks.getText()));

            studentService.update(selected);

            showAlert(Alert.AlertType.INFORMATION,
                    "Thành công",
                    "Đã cập nhật sinh viên.");

            refreshStudentTable();
            clearForm();

        } catch (NumberFormatException e) {
            showAlert(Alert.AlertType.ERROR,
                    "Lỗi",
                    "Điểm phải là số hợp lệ.");
        } catch (Exception e) {
            showAlert(Alert.AlertType.ERROR,
                    "Lỗi",
                    e.getMessage());
        }
    }

    // CLEAR FORM
    @FXML
    private void handleClear() {
        clearForm();
    }

    // DELETE
    @FXML
    private void handleDeleteStudent() {
        try {
            Student selected =
                    studentTable.getSelectionModel().getSelectedItem();

            if (selected == null) {
                showAlert(Alert.AlertType.WARNING,
                        "Cảnh báo",
                        "Vui lòng chọn sinh viên.");
                return;
            }

            studentService.delete(selected);

            showAlert(Alert.AlertType.INFORMATION,
                    "Thành công",
                    "Đã xóa sinh viên.");

            refreshStudentTable();
            clearForm();

        } catch (Exception e) {
            showAlert(Alert.AlertType.ERROR,
                    "Lỗi",
                    e.getMessage());
        }
    }
}