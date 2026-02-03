package fu.se.chapter12demo.services;

import fu.se.chapter12demo.pojos.Employee;

import java.util.List;

public interface IEmployeeService {

    // Lấy toàn bộ danh sách nhân viên
    List<Employee> getAllEmployees();

    // Lấy nhân viên theo mã
    Employee getEmployeeById(String empId);

    // Thêm mới nhân viên
    Employee create(Employee employee);

    // Xóa nhân viên theo mã
    Employee delete(String empId);
}
