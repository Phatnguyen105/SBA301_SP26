package org.kun.asmbe.service;

import lombok.RequiredArgsConstructor;
import org.kun.asmbe.dto.CreateAccountDTO;
import org.kun.asmbe.dto.LoginDTO;
import org.kun.asmbe.dto.SystemAccountDTO;
import org.kun.asmbe.dto.UpdateAccountDTO;
import org.kun.asmbe.entity.SystemAccount;
import org.kun.asmbe.exception.BadRequestException;
import org.kun.asmbe.exception.ResourceNotFoundException;
import org.kun.asmbe.repository.SystemAccountRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SystemAccountService implements ISystemAccountService {

    private final SystemAccountRepository accountRepository;

    /* ======================= READ ======================= */

    @Transactional(readOnly = true)
    public List<SystemAccountDTO> getAllAccounts() {
        return accountRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public SystemAccountDTO getAccountById(Integer id) {
        SystemAccount account = findAccountById(id);
        return toDTO(account);
    }

    @Transactional(readOnly = true)
    public List<SystemAccountDTO> searchAccounts(String keyword) {
        return accountRepository.searchAccounts(keyword)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /* ======================= CREATE ======================= */

    @Transactional
    public SystemAccountDTO createAccount(CreateAccountDTO dto) {
        checkEmailExists(dto.getAccountEmail());

        SystemAccount account = new SystemAccount();
        account.setAccountName(dto.getAccountName());
        account.setAccountEmail(dto.getAccountEmail());
        account.setAccountRole(dto.getAccountRole());
        account.setAccountPassword(dto.getAccountPassword());

        return toDTO(accountRepository.save(account));
    }

    /* ======================= UPDATE ======================= */

    @Transactional
    public SystemAccountDTO updateAccount(Integer id, UpdateAccountDTO dto) {
        SystemAccount account = findAccountById(id);

        if (!account.getAccountEmail().equals(dto.getAccountEmail())) {
            checkEmailExists(dto.getAccountEmail());
        }

        account.setAccountName(dto.getAccountName());
        account.setAccountEmail(dto.getAccountEmail());
        account.setAccountRole(dto.getAccountRole());

        if (dto.getAccountPassword() != null && !dto.getAccountPassword().isBlank()) {
            account.setAccountPassword(dto.getAccountPassword());
        }

        return toDTO(accountRepository.save(account));
    }

    /* ======================= DELETE ======================= */

    @Transactional
    public void deleteAccount(Integer id) {
        SystemAccount account = findAccountById(id);

        if (accountRepository.hasCreatedNewsArticles(id)) {
            throw new BadRequestException("Cannot delete account. Account has created news articles.");
        }

        accountRepository.delete(account);
    }

    /* ======================= LOGIN ======================= */

    @Transactional(readOnly = true)
    public SystemAccountDTO login(LoginDTO dto) {
        SystemAccount account = accountRepository.findByAccountEmail(dto.getAccountEmail())
                .orElseThrow(() -> new BadRequestException("Invalid email or password"));

        if (!account.getAccountPassword().equals(dto.getAccountPassword())) {
            throw new BadRequestException("Invalid email or password");
        }

        return toDTO(account);
    }

    /* ======================= HELPERS ======================= */

    private SystemAccount findAccountById(Integer id) {
        return accountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found with id: " + id));
    }

    private void checkEmailExists(String email) {
        if (accountRepository.findByAccountEmail(email).isPresent()) {
            throw new BadRequestException("Email already exists: " + email);
        }
    }

    private SystemAccountDTO toDTO(SystemAccount account) {
        return new SystemAccountDTO(
                account.getAccountId(),
                account.getAccountName(),
                account.getAccountEmail(),
                account.getAccountRole(),
                null // never expose password
        );
    }
}
