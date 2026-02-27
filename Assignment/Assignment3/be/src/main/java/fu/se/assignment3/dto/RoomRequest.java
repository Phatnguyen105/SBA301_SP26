package fu.se.assignment3.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class RoomRequest {

    @NotBlank(message = "Room number is required")
    @Size(max = 50)
    private String roomNumber;

    @Size(max = 500)
    private String roomDescription;

    @NotNull(message = "Max capacity is required")
    @Min(value = 1, message = "Capacity must be at least 1")
    private Integer roomMaxCapacity;

    @NotNull(message = "Room status is required")
    private Integer roomStatus;

    @NotNull(message = "Price per day is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be positive")
    private BigDecimal roomPricePerDay;

    @NotNull(message = "Room type is required")
    private Integer roomTypeId;
}
