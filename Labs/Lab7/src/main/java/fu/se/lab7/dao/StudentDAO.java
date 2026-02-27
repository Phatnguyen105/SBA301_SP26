package fu.se.lab7.dao;

import fu.se.lab7.pojos.Student;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.query.Query;

import java.util.List;

public class StudentDAO {

    private SessionFactory factory;

    // Khởi tạo SessionFactory từ file hibernate.cfg.xml
    public StudentDAO() {
        try {
            Configuration cfg = new Configuration().configure("hibernate.cfg.xml");
            this.factory = cfg.buildSessionFactory();
        } catch (Exception e) {
            System.err.println("Error initializing SessionFactory: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // CREATE
    public void save(Student student) {
        Session session = factory.openSession();
        Transaction tx = null;

        try {
            tx = session.beginTransaction();
            session.persist(student);   // Hibernate 6 khuyến khích dùng persist()
            tx.commit();
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            System.err.println("Error saving student: " + e.getMessage());
        } finally {
            session.close();
        }
    }

    // READ ALL
    public List<Student> getAll() {
        Session session = factory.openSession();
        List<Student> students = null;

        try {
            Query<Student> query = session.createQuery("FROM Student", Student.class);
            students = query.list();
        } catch (Exception e) {
            System.err.println("Error getting students: " + e.getMessage());
        } finally {
            session.close();
        }

        return students;
    }

    // READ BY ID
    public Student getById(int id) {
        Session session = factory.openSession();
        Student student = null;

        try {
            student = session.get(Student.class, id);
        } catch (Exception e) {
            System.err.println("Error finding student by ID: " + e.getMessage());
        } finally {
            session.close();
        }

        return student;
    }

    // READ BY EMAIL
    public Student findByEmail(String email) {
        Session session = factory.openSession();
        Student student = null;

        try {
            String hql = "FROM Student WHERE email = :email";
            Query<Student> query = session.createQuery(hql, Student.class);
            query.setParameter("email", email);
            student = query.uniqueResult();
        } catch (Exception e) {
            System.err.println("Error finding student by email: " + e.getMessage());
        } finally {
            session.close();
        }

        return student;
    }

    // UPDATE
    public void update(Student student) {
        Session session = factory.openSession();
        Transaction tx = null;

        try {
            tx = session.beginTransaction();
            session.merge(student);   // Hibernate 6 nên dùng merge()
            tx.commit();
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            System.err.println("Error updating student: " + e.getMessage());
        } finally {
            session.close();
        }
    }

    // READ BY ID WITH BOOKS (Eager Fetch to avoid LazyInitializationException)
    public Student findByIdWithBooks(int id) {
        Session session = factory.openSession();
        Student student = null;

        try {
            String hql = "FROM Student s LEFT JOIN FETCH s.books WHERE s.id = :id";
            Query<Student> query = session.createQuery(hql, Student.class);
            query.setParameter("id", id);
            student = query.uniqueResult();
        } catch (Exception e) {
            System.err.println("Error finding student by ID with books: " + e.getMessage());
        } finally {
            session.close();
        }

        return student;
    }

    // DELETE
    public void delete(Student student) {
        Session session = factory.openSession();
        Transaction tx = null;

        try {
            tx = session.beginTransaction();
            session.remove(student);  // Hibernate 6 dùng remove()
            tx.commit();
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            System.err.println("Error deleting student: " + e.getMessage());
        } finally {
            session.close();
        }
    }
}