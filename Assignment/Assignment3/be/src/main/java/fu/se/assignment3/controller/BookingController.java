package fu.se.assignment3.controller;

import fu.se.assignment3.dto.BookingRequest;
import fu.se.assignment3.entity.BookingDetail;
import fu.se.assignment3.entity.BookingReservation;
import fu.se.assignment3.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    /** Staff: get all bookings */
    @GetMapping
    public ResponseEntity<List<BookingReservation>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    /** Get bookings of a specific customer */
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<BookingReservation>> getBookingsByCustomer(@PathVariable Integer customerId) {
        return ResponseEntity.ok(bookingService.getBookingsByCustomer(customerId));
    }

    /** Get a booking by its ID */
    @GetMapping("/{id}")
    public ResponseEntity<?> getBookingById(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(bookingService.getBookingById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /** Get booking details for a reservation */
    @GetMapping("/{id}/details")
    public ResponseEntity<List<BookingDetail>> getBookingDetails(@PathVariable Integer id) {
        return ResponseEntity.ok(bookingService.getDetailsByBookingId(id));
    }

    /** Create a new booking reservation */
    @PostMapping
    public ResponseEntity<?> createBooking(@Valid @RequestBody BookingRequest request) {
        try {
            return ResponseEntity.ok(bookingService.createBooking(request));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /** Delete a booking reservation */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable Integer id) {
        try {
            bookingService.deleteBooking(id);
            return ResponseEntity.ok("Booking deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
