package org.kun.asmbe.service;

import org.kun.asmbe.dto.CreateAccountDTO;
import org.kun.asmbe.dto.LoginDTO;
import org.kun.asmbe.dto.SystemAccountDTO;
import org.kun.asmbe.dto.UpdateAccountDTO;

import java.util.List;

public interface ISystemAccountService {
    List<SystemAccountDTO> getAllAccounts();
    SystemAccountDTO getAccountById(Integer id);
    List<SystemAccountDTO> searchAccounts(String keyword);
    SystemAccountDTO createAccount(CreateAccountDTO accountDTO);
    SystemAccountDTO updateAccount(Integer id, UpdateAccountDTO accountDTO);
    void deleteAccount(Integer id);
    SystemAccountDTO login(LoginDTO loginDTO);
}
