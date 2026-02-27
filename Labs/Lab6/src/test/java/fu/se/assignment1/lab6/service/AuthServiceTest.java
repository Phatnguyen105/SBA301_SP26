package fu.se.assignment1.lab6.service;

import fu.se.assignment1.lab6.dto.request.RegisterRequest;
import fu.se.assignment1.lab6.entity.User;
import fu.se.assignment1.lab6.repository.IUserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import static org.mockito.ArgumentMatchers.any;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private IUserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthService authService;

    @Test
    void signup_success() {
        // GIVEN
        RegisterRequest request = new RegisterRequest();
        request.setEmail("test@gmail.com");
        request.setFullName("Test User");
        request.setPassword("123456");

        when(passwordEncoder.encode("123456"))
                .thenReturn("hashed-password");

        when(userRepository.save(any(User.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        // WHEN
        User savedUser = authService.signup(request);

        // THEN
        assertNotNull(savedUser);
        assertEquals("test@gmail.com", savedUser.getEmail());
        assertEquals("hashed-password", savedUser.getPassword());

        verify(userRepository, times(1)).save(any(User.class));
    }
}
