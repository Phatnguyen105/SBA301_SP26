package fu.se.assignment1.lab6.controller;

import fu.se.assignment1.lab6.dto.request.LoginRequest;
import fu.se.assignment1.lab6.dto.request.RegisterRequest;
import fu.se.assignment1.lab6.dto.response.AuthResponse;
import fu.se.assignment1.lab6.entity.User;
import fu.se.assignment1.lab6.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(authService.signup(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody LoginRequest request
    ) {
        return ResponseEntity.ok(authService.authenticate(request));
    }
}
