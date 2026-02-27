package fu.se.assignment3.service;

import fu.se.assignment3.dto.JwtResponse;
import fu.se.assignment3.dto.LoginRequest;
import fu.se.assignment3.dto.RegisterRequest;
import fu.se.assignment3.dto.StaffRegisterRequest;
import fu.se.assignment3.entity.Customer;
import fu.se.assignment3.entity.Staff;
import fu.se.assignment3.repository.CustomerRepository;
import fu.se.assignment3.repository.StaffRepository;
import fu.se.assignment3.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    public JwtResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String role = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst()
                .orElse("ROLE_CUSTOMER");

        String token = jwtUtils.generateToken(request.getEmail(), role);

        // Staff account from database
        java.util.Optional<Staff> staffOpt = staffRepository.findByStaffEmail(request.getEmail());
        if (staffOpt.isPresent()) {
            Staff staff = staffOpt.get();
            return new JwtResponse(token, role, staff.getStaffEmail(), staff.getFullName(), null);
        }

        // Customer account
        Customer customer = customerRepository.findByCustomerEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        return new JwtResponse(token, role, customer.getCustomerEmail(),
                customer.getCustomerFullName(), customer.getCustomerId());
    }

    public JwtResponse register(RegisterRequest request) {
        if (customerRepository.existsByCustomerEmail(request.getCustomerEmail())) {
            throw new RuntimeException("Email already registered");
        }
        if (request.getCustomerIdentityCard() != null
                && !request.getCustomerIdentityCard().isBlank()
                && customerRepository.existsByCustomerIdentityCard(request.getCustomerIdentityCard())) {
            throw new RuntimeException("Identity card already registered");
        }

        Customer customer = Customer.builder()
                .customerFullName(request.getCustomerFullName())
                .customerTelephone(request.getCustomerTelephone())
                .customerEmail(request.getCustomerEmail())
                .customerIdentityCard(request.getCustomerIdentityCard())
                .customerBirthday(request.getCustomerBirthday())
                .password(passwordEncoder.encode(request.getPassword()))
                .customerStatus(1)
                .build();

        customerRepository.save(customer);

        String token = jwtUtils.generateToken(customer.getCustomerEmail(), "ROLE_CUSTOMER");
        return new JwtResponse(token, "ROLE_CUSTOMER", customer.getCustomerEmail(),
                customer.getCustomerFullName(), customer.getCustomerId());
    }

    public JwtResponse registerStaff(StaffRegisterRequest request) {
        if (staffRepository.existsByStaffEmail(request.getEmail())) {
            throw new RuntimeException("Staff email already registered");
        }

        Staff staff = Staff.builder()
                .staffEmail(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .build();

        staffRepository.save(staff);

        String token = jwtUtils.generateToken(staff.getStaffEmail(), "ROLE_STAFF");
        return new JwtResponse(token, "ROLE_STAFF", staff.getStaffEmail(), staff.getFullName(), null);
    }
}
