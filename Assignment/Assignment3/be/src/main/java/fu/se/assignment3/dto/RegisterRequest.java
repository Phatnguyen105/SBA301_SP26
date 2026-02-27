package fu.se.assignment3.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class RegisterRequest {

    @NotBlank(message = "Full name is required")
    @Size(max = 100)
    @JsonAlias({"fullName", "name"})
    private String customerFullName;

    @Size(max = 20)
    @JsonAlias({"telephone", "phone"})
    private String customerTelephone;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @JsonAlias("email")
    private String customerEmail;

    @Size(max = 20)
    @JsonAlias("identityCard")
    private String customerIdentityCard;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @JsonAlias("birthday")
    private LocalDate customerBirthday;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
}
