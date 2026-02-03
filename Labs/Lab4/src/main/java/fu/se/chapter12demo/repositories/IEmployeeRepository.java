package fu.se.chapter12demo.repositories;

import fu.se.chapter12demo.pojos.Employee;

import java.util.List;

public interface IEmployeeRepository {

    // Lấy toàn bộ danh sách nhân viên
    List<Employee> getAllEmployees();

    // Lấy nhân viên theo mã (EMP01, EMP02, ...)
    Employee getEmployeeById(String empId);

    // Thêm mới nhân viên
    Employee create(Employee employee);

    // Xóa nhân viên theo mã (String)
    Employee delete(String empId);
}
