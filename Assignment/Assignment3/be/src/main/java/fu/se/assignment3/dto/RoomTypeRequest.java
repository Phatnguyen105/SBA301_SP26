package fu.se.assignment3.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RoomTypeRequest {

    @NotBlank(message = "Room type name is required")
    @Size(max = 100)
    private String roomTypeName;

    @Size(max = 500)
    private String typeDescription;

    @Size(max = 500)
    private String typeNote;
}
