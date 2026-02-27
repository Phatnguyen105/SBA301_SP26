package fu.se.assignment3.repository;

import fu.se.assignment3.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {

    boolean existsByRoomNumber(String roomNumber);

    List<Room> findByRoomStatus(Integer roomStatus);

    List<Room> findByRoomTypeRoomTypeId(Integer roomTypeId);

    @Query("SELECT CASE WHEN COUNT(bd) > 0 THEN true ELSE false END FROM BookingDetail bd WHERE bd.room.roomId = :roomId")
    boolean hasBookingDetails(Integer roomId);
}
