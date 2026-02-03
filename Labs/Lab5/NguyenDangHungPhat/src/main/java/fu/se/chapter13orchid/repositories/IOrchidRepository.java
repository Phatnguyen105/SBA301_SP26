package fu.se.chapter13orchid.repositories;

import fu.se.chapter13orchid.pojos.Orchid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface IOrchidRepository extends JpaRepository<Orchid, Integer> {

    @Query("""
        SELECT o 
        FROM Orchid o 
        LEFT JOIN FETCH o.category
    """)
    List<Orchid> findAllWithCategory();

    @Query("""
    SELECT o FROM Orchid o
    JOIN FETCH o.category
    WHERE o.id = :id
""")
    Optional<Orchid> findByIdWithCategory(Integer id);

    @Query("""
        SELECT o 
        FROM Orchid o 
        LEFT JOIN FETCH o.category
        WHERE o.category.id = :categoryId
    """)
    List<Orchid> findByCategoryId(@Param("categoryId") Integer categoryId);

    @Query("""
        SELECT o 
        FROM Orchid o 
        LEFT JOIN FETCH o.category
        WHERE o.isSpecial = true
    """)
    List<Orchid> findSpecial();

    @Query("""
        SELECT o 
        FROM Orchid o 
        LEFT JOIN FETCH o.category
        WHERE o.price > :price
    """)
    List<Orchid> findPriceGreaterThan(@Param("price") Double price);
}
