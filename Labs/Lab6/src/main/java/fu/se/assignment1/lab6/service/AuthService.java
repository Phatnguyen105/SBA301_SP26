package fu.se.assignment1.lab6.service;

import fu.se.assignment1.lab6.dto.request.LoginRequest;
import fu.se.assignment1.lab6.dto.request.RegisterRequest;
import fu.se.assignment1.lab6.dto.response.AuthResponse;
import fu.se.assignment1.lab6.entity.User;
import fu.se.assignment1.lab6.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    // REGISTER
    public User signup(RegisterRequest request) {
        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        return userRepository.save(user);
    }

    // LOGIN + JWT
    public AuthResponse authenticate(LoginRequest input) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                input.getEmail(),
                                input.getPassword()
                        )
                );

        User user = (User) authentication.getPrincipal();

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(
                token,
                jwtService.getExpirationTime()
        );
    }

    public List<User> allUsers() {
        return userRepository.findAll();
    }
}
