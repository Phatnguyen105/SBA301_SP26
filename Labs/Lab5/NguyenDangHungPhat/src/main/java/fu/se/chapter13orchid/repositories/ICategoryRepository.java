package fu.se.chapter13orchid.repositories;

import fu.se.chapter13orchid.pojos.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICategoryRepository extends JpaRepository<Category, Integer> {
}
