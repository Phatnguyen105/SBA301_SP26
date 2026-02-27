package fu.se.assignment3.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "staff")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "staffid")
    private Integer staffId;

    @Column(name = "staffemail", nullable = false, length = 100, unique = true)
    private String staffEmail;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "fullname", length = 100)
    private String fullName;
}
