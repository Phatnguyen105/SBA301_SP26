package fu.se.lab7.repository;

import fu.se.lab7.dao.StudentDAO;
import fu.se.lab7.pojos.Student;

import java.util.List;

public class StudentRepository implements IStudentRepository {

    // Tham chiếu đến tầng DAO
    private final StudentDAO studentDAO;

    public StudentRepository() {
        this.studentDAO = new StudentDAO();
    }

    @Override
    public void save(Student student) {
        studentDAO.save(student);
    }

    @Override
    public void update(Student student) {
        studentDAO.update(student);
    }

    @Override
    public void delete(Student student) {
        studentDAO.delete(student);
    }

    @Override
    public Student findById(int studentId) {
        return studentDAO.getById(studentId);
    }

    @Override
    public Student findByEmail(String email) {
        return studentDAO.findByEmail(email);
    }

    @Override
    public List<Student> findAll() {
        return studentDAO.getAll();
    }

    @Override
    public Student findByIdWithBooks(int studentId) {
        return studentDAO.findByIdWithBooks(studentId);
    }
}