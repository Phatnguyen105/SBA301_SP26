package org.kun.asmbe.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateAccountDTO {

    @NotBlank(message = "Account name is required")
    private String accountName;

    @NotBlank(message = "Email is required")
    @Email
    private String accountEmail;

    @NotNull(message = "Account role is required")
    private Integer accountRole;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String accountPassword;
}

