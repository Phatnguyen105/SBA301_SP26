package fu.se.chapter13orchid.services;

import fu.se.chapter13orchid.dtos.response.CategoryResponse;

import java.util.List;

public interface ICategoryService {
    List<CategoryResponse> findAll();
}
