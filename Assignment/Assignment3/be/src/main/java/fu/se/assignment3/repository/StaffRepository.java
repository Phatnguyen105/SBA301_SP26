package fu.se.assignment3.repository;

import fu.se.assignment3.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StaffRepository extends JpaRepository<Staff, Integer> {
    Optional<Staff> findByStaffEmail(String email);
    boolean existsByStaffEmail(String email);
}
