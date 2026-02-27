package fu.se.assignment3.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CustomerRequest {

    @NotBlank(message = "Full name is required")
    @Size(max = 100)
    private String customerFullName;

    @Size(max = 20)
    private String customerTelephone;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String customerEmail;

    @Size(max = 20)
    private String customerIdentityCard;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate customerBirthday;

    private Integer customerStatus;

    private String password;
}
