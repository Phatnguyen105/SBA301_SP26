package fu.se.lab7.pojos;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "STUDENTS")
public class Student implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(columnDefinition = "nvarchar(255)")
    private String password;

    @Column(name = "firstName", columnDefinition = "nvarchar(255)")
    private String firstName;

    @Column(name = "lastName", columnDefinition = "nvarchar(255)")
    private String lastName;

    @Column
    private Double marks;

    @OneToMany(mappedBy = "student",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
    private Set<Book> books = new HashSet<>();

    public Student() {}

    public Student(String email, String password,
                   String firstName, String lastName, Double marks) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.marks = marks;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public Double getMarks() { return marks; }
    public void setMarks(Double marks) { this.marks = marks; }

    public Set<Book> getBooks() { return books; }

    public void addBook(Book book) {
        books.add(book);
        book.setStudent(this);
    }

    @Override
    public String toString() {
        return "Student{id=" + id +
                ", email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", marks=" + marks +
                '}';
    }
}