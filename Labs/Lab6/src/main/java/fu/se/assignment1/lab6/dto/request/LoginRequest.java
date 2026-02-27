package fu.se.assignment1.lab6.dto.request;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
