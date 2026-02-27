package fu.se.assignment3.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingDetailId implements Serializable {

    @Column(name = "book_reservationid")
    private Integer bookReservationId;

    @Column(name = "roomid")
    private Integer roomId;
}
