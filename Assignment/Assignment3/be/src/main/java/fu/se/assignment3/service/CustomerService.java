package fu.se.assignment3.service;

import fu.se.assignment3.dto.CustomerRequest;
import fu.se.assignment3.entity.Customer;
import fu.se.assignment3.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer getCustomerById(Integer id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));
    }

    public Customer updateCustomer(Integer id, CustomerRequest request) {
        Customer customer = getCustomerById(id);

        // Check email uniqueness if changed
        if (!customer.getCustomerEmail().equalsIgnoreCase(request.getCustomerEmail())
                && customerRepository.existsByCustomerEmail(request.getCustomerEmail())) {
            throw new RuntimeException("Email already in use");
        }

        customer.setCustomerFullName(request.getCustomerFullName());
        customer.setCustomerTelephone(request.getCustomerTelephone());
        customer.setCustomerEmail(request.getCustomerEmail());
        customer.setCustomerIdentityCard(request.getCustomerIdentityCard());
        customer.setCustomerBirthday(request.getCustomerBirthday());
        if (request.getCustomerStatus() != null) {
            customer.setCustomerStatus(request.getCustomerStatus());
        }

        return customerRepository.save(customer);
    }

    public void deleteCustomer(Integer id) {
        Customer customer = getCustomerById(id);
        // Soft delete: set status to 0
        customer.setCustomerStatus(0);
        customerRepository.save(customer);
    }
}
