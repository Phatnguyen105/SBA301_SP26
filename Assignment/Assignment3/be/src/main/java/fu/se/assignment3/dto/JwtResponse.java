package fu.se.assignment3.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String role;
    private String email;
    private String fullName;
    private Integer customerId;

    public JwtResponse(String token, String role, String email, String fullName, Integer customerId) {
        this.token = token;
        this.role = role;
        this.email = email;
        this.fullName = fullName;
        this.customerId = customerId;
    }
}
