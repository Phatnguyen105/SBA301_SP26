package fu.se.assignment3.repository;

import fu.se.assignment3.entity.BookingDetail;
import fu.se.assignment3.entity.BookingDetailId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingDetailRepository extends JpaRepository<BookingDetail, BookingDetailId> {

    List<BookingDetail> findByIdBookReservationId(Integer bookReservationId);

    boolean existsByRoomRoomId(Integer roomId);
}
