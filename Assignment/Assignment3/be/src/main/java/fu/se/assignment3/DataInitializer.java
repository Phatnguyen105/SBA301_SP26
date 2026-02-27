package fu.se.assignment3;

import fu.se.assignment3.entity.Staff;
import fu.se.assignment3.repository.StaffRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    private static final String DEFAULT_STAFF_EMAIL = "admin@fuminihotel.com";
    private static final String DEFAULT_STAFF_PASSWORD = "Admin@123";
    private static final String DEFAULT_STAFF_NAME = "Staff Admin";

    @Bean
    CommandLineRunner initStaff(StaffRepository staffRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            java.util.Optional<Staff> existing = staffRepository.findByStaffEmail(DEFAULT_STAFF_EMAIL);
            if (existing.isEmpty()) {
                Staff staff = Staff.builder()
                        .staffEmail(DEFAULT_STAFF_EMAIL)
                        .password(passwordEncoder.encode(DEFAULT_STAFF_PASSWORD))
                        .fullName(DEFAULT_STAFF_NAME)
                        .build();
                staffRepository.save(staff);
                System.out.println("[DataInitializer] Default staff account created.");
            } else {
                Staff staff = existing.get();
                // Re-encode password if it is not a BCrypt hash (e.g. stored as plain text)
                if (!staff.getPassword().startsWith("$2")) {
                    staff.setPassword(passwordEncoder.encode(DEFAULT_STAFF_PASSWORD));
                    staffRepository.save(staff);
                    System.out.println("[DataInitializer] Default staff password re-encoded.");
                }
            }
        };
    }
}
