package fu.se.chapter13orchid.services;

import fu.se.chapter13orchid.dtos.response.CategoryResponse;
import fu.se.chapter13orchid.repositories.ICategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService implements ICategoryService {

    private final ICategoryRepository repo;

    public CategoryService(ICategoryRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<CategoryResponse> findAll() {
        return repo.findAll()
                .stream()
                .map(c -> {
                    CategoryResponse dto = new CategoryResponse();
                    dto.setId(c.getId());
                    dto.setName(c.getName());
                    return dto;
                })
                .toList();
    }
}
