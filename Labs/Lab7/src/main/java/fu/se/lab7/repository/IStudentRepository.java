package fu.se.lab7.repository;

import fu.se.lab7.pojos.Student;
import java.util.List;

// Interface định nghĩa các hành động CRUD cho Student
public interface IStudentRepository {

    void save(Student student);

    void update(Student student);

    void delete(Student student);

    Student findById(int studentId);

    Student findByEmail(String email);

    List<Student> findAll();

    // Eager-fetch Student + books to prevent LazyInitializationException on delete
    Student findByIdWithBooks(int studentId);
}