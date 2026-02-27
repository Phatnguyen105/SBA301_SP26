package fu.se.assignment3.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "customer")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customerid")
    private Integer customerId;

    @NotBlank(message = "Full name is required")
    @Size(max = 100)
    @Column(name = "customerfullname", nullable = false, length = 100)
    private String customerFullName;

    @Size(max = 20)
    @Column(name = "customertelephone", length = 20)
    private String customerTelephone;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Size(max = 100)
    @Column(name = "customeremail", nullable = false, length = 100, unique = true)
    private String customerEmail;

    @Size(max = 20)
    @Column(name = "customeridentitycard", length = 20)
    private String customerIdentityCard;

    @Column(name = "customerbirthday")
    private LocalDate customerBirthday;

    /** 1 = Active, 0 = Inactive */
    @Column(name = "customerstatus", nullable = false)
    private Integer customerStatus = 1;

    @NotBlank(message = "Password is required")
    @Column(name = "password", nullable = false)
    private String password;

    @JsonIgnore
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<BookingReservation> bookingReservations;
}
