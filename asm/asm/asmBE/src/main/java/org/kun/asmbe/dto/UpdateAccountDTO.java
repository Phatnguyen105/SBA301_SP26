package org.kun.asmbe.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateAccountDTO {

    @NotBlank(message = "Account name is required")
    private String accountName;

    @NotBlank(message = "Email is required")
    @Email
    private String accountEmail;

    @NotNull(message = "Account role is required")
    private Integer accountRole;

    // Không validate – đổi hay không là tùy
    private String accountPassword;
}

