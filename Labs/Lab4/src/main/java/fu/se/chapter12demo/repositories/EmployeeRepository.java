package fu.se.chapter12demo.repositories;

import fu.se.chapter12demo.pojos.Employee;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class EmployeeRepository implements IEmployeeRepository {

    // Khởi tạo danh sách nhân viên (nên để final)
    private final List<Employee> employees = createList();

    private static List<Employee> createList() {
        return new ArrayList<>(Arrays.asList(
                new Employee("EMP01", "Steven Paris", "Technical Manager", 3000),
                new Employee("EMP02", "John Lemon", "Developer", 1000),
                new Employee("EMP03", "Steven Paris", "Tester", 3000),
                new Employee("EMP04", "David William", "Accountant", 1000),
                new Employee("EMP05", "Christopher Robert", "HR Manager", 3000),
                new Employee("EMP06", "George Ronald", "Developer", 1000)
        ));
    }

    // Lấy toàn bộ danh sách nhân viên
    @Override
    public List<Employee> getAllEmployees() {
        return employees;
    }

    // Tìm nhân viên theo ID (String)
    @Override
    public Employee getEmployeeById(String empId) {
        for (Employee emp : employees) {
            if (emp.getId().equals(empId)) {
                return emp;
            }
        }
        return null;
    }

    // Xóa nhân viên theo ID (String)
    @Override
    public Employee delete(String id) {
        Iterator<Employee> iterator = employees.iterator();
        while (iterator.hasNext()) {
            Employee emp = iterator.next();
            if (emp.getId().equals(id)) {
                iterator.remove();
                return emp;
            }
        }
        return null;
    }

    // Thêm mới nhân viên
    @Override
    public Employee create(Employee employee) {
        employees.add(employee);
        return employee;
    }
}
