package fu.se.assignment3.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "booking_detail")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingDetail {

    @EmbeddedId
    private BookingDetailId id;

    // insertable=false, updatable=false: the column values come exclusively from
    // the @EmbeddedId fields set in BookingDetailId, avoiding the @MapsId
    // derivation that can silently produce NULL for IDENTITY-generated PKs.
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "book_reservationid", insertable = false, updatable = false)
    private BookingReservation bookingReservation;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "roomid", insertable = false, updatable = false)
    private Room room;

    @NotNull(message = "Start date is required")
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @NotNull(message = "End date is required")
    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "actual_price", precision = 18, scale = 2)
    private BigDecimal actualPrice;
}
