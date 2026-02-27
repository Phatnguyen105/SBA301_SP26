package fu.se.lab7.service;

import fu.se.lab7.pojos.Student;
import fu.se.lab7.repository.IStudentRepository;
import fu.se.lab7.repository.StudentRepository;

import java.util.List;

public class StudentService implements IStudentService {

    private final IStudentRepository studentRepository;

    public StudentService() {
        this.studentRepository = new StudentRepository();
    }

    @Override
    public void save(Student student) {

        Student existingStudent = studentRepository.findByEmail(student.getEmail());
        if (existingStudent != null) {
            throw new RuntimeException(
                    "Email '" + student.getEmail() + "' đã được đăng ký.");
        }

        if (student.getMarks() == null ||
                student.getMarks() < 0 ||
                student.getMarks() > 10) {

            throw new IllegalArgumentException(
                    "Điểm phải nằm trong khoảng 0 đến 10.");
        }

        studentRepository.save(student);
    }

    @Override
    public List<Student> findAll() {
        return studentRepository.findAll();
    }

    @Override
    public Student findById(int studentId) {
        if (studentId <= 0) {
            throw new IllegalArgumentException("ID không hợp lệ.");
        }
        return studentRepository.findById(studentId);
    }

    @Override
    public Student findByEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("Email không được để trống.");
        }
        return studentRepository.findByEmail(email);
    }

    @Override
    public void update(Student student) {

        Student existing = studentRepository.findById(student.getId());
        if (existing == null) {
            throw new RuntimeException(
                    "Không tìm thấy sinh viên có ID: " + student.getId());
        }

        Student emailCheck = studentRepository.findByEmail(student.getEmail());
        if (emailCheck != null && emailCheck.getId() != student.getId()) {
            throw new RuntimeException(
                    "Email đã được sử dụng bởi sinh viên khác.");
        }

        if (student.getMarks() == null ||
                student.getMarks() < 0 ||
                student.getMarks() > 10) {

            throw new IllegalArgumentException(
                    "Điểm phải nằm trong khoảng 0 đến 10.");
        }

        studentRepository.update(student);
    }

    @Override
    public void delete(Student student) {
        // Reload with books eagerly fetched to avoid LazyInitializationException
        Student studentToDelete = studentRepository.findByIdWithBooks(student.getId());

        if (studentToDelete == null) {
            throw new RuntimeException(
                    "Không tìm thấy sinh viên có ID: " + student.getId() + " để xóa.");
        }

        if (studentToDelete.getBooks() != null &&
                !studentToDelete.getBooks().isEmpty()) {
            throw new RuntimeException(
                    "Không thể xóa vì sinh viên vẫn đang mượn sách.");
        }

        studentRepository.delete(studentToDelete);
    }
}