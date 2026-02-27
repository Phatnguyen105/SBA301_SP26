package fu.se.assignment3.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "room")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "roomid")
    private Integer roomId;

    @NotBlank(message = "Room number is required")
    @Size(max = 50)
    @Column(name = "roomnumber", nullable = false, length = 50, unique = true)
    private String roomNumber;

    @Size(max = 500)
    @Column(name = "roomdescription", length = 500)
    private String roomDescription;

    @Min(value = 1, message = "Capacity must be at least 1")
    @Column(name = "roommaxcapacity", nullable = false)
    private Integer roomMaxCapacity;

    /** 0 = Available, 1 = Occupied, 2 = Deleted/Inactive */
    @Column(name = "roomstatus", nullable = false)
    private Integer roomStatus = 0;

    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be positive")
    @Column(name = "roompriceperday", nullable = false, precision = 18, scale = 2)
    private BigDecimal roomPricePerDay;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "roomtypeid", nullable = false)
    private RoomType roomType;

    @JsonIgnore
    @OneToMany(mappedBy = "room")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<BookingDetail> bookingDetails;
}
