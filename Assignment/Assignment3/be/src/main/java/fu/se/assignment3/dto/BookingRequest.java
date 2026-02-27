package fu.se.assignment3.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class BookingRequest {

    @NotNull(message = "Customer ID is required")
    private Integer customerId;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate bookingDate;

    @NotEmpty(message = "At least one room detail is required")
    @Valid
    private List<BookingDetailRequest> details;

    @Data
    public static class BookingDetailRequest {

        @NotNull(message = "Room ID is required")
        private Integer roomId;

        @NotNull(message = "Start date is required")
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate startDate;

        @NotNull(message = "End date is required")
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate endDate;
    }
}
