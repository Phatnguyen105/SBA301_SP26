package fu.se.assignment3.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "room_type")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "roomtypeid")
    private Integer roomTypeId;

    @NotBlank(message = "Room type name is required")
    @Size(max = 100)
    @Column(name = "roomtypename", nullable = false, length = 100)
    private String roomTypeName;

    @Size(max = 500)
    @Column(name = "typedescription", length = 500)
    private String typeDescription;

    @Size(max = 500)
    @Column(name = "typenote", length = 500)
    private String typeNote;

    @JsonIgnore
    @OneToMany(mappedBy = "roomType", cascade = CascadeType.ALL)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<Room> rooms;
}
