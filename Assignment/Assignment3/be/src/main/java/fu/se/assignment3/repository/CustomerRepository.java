package fu.se.assignment3.repository;

import fu.se.assignment3.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    Optional<Customer> findByCustomerEmail(String email);

    boolean existsByCustomerEmail(String email);

    boolean existsByCustomerIdentityCard(String identityCard);
}
