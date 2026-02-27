package fu.se.assignment3.security;

import fu.se.assignment3.entity.Customer;
import fu.se.assignment3.entity.Staff;
import fu.se.assignment3.repository.CustomerRepository;
import fu.se.assignment3.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Look up staff account from database (BCrypt password)
        java.util.Optional<Staff> staffOpt = staffRepository.findByStaffEmail(email);
        if (staffOpt.isPresent()) {
            Staff staff = staffOpt.get();
            return new org.springframework.security.core.userdetails.User(
                    staff.getStaffEmail(),
                    staff.getPassword(),
                    List.of(new SimpleGrantedAuthority("ROLE_STAFF"))
            );
        }

        // Customer from database
        Customer customer = customerRepository.findByCustomerEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        return new org.springframework.security.core.userdetails.User(
                customer.getCustomerEmail(),
                customer.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_CUSTOMER"))
        );
    }
}
