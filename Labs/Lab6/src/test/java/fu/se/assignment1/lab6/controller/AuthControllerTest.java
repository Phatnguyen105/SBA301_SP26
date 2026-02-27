package fu.se.assignment1.lab6.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import fu.se.assignment1.lab6.dto.request.RegisterRequest;
import fu.se.assignment1.lab6.entity.User;
import fu.se.assignment1.lab6.service.AuthService;
import fu.se.assignment1.lab6.service.JwtService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.mockito.ArgumentMatchers.any;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthService authService;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private JwtService jwtService;

    @Test
    void signup_success() throws Exception {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("test@gmail.com");
        request.setFullName("Test User");
        request.setPassword("123456");

        User mockUser = new User();
        mockUser.setEmail("test@gmail.com");
        mockUser.setFullName("Test User");

        when(authService.signup(any(RegisterRequest.class)))
                .thenReturn(mockUser);

        mockMvc.perform(
                        post("/api/auth/signup")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("test@gmail.com"))
                .andExpect(jsonPath("$.fullName").value("Test User"));
    }
}
