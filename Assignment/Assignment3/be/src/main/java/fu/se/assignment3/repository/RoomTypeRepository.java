package fu.se.assignment3.repository;

import fu.se.assignment3.entity.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomTypeRepository extends JpaRepository<RoomType, Integer> {
    boolean existsByRoomTypeName(String roomTypeName);
}
