package fu.se.assignment3.service;

import fu.se.assignment3.dto.BookingRequest;
import fu.se.assignment3.entity.*;
import fu.se.assignment3.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingReservationRepository bookingReservationRepository;

    @Autowired
    private BookingDetailRepository bookingDetailRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private RoomRepository roomRepository;

    public List<BookingReservation> getAllBookings() {
        return bookingReservationRepository.findAll();
    }

    public List<BookingReservation> getBookingsByCustomer(Integer customerId) {
        return bookingReservationRepository.findByCustomerCustomerId(customerId);
    }

    public BookingReservation getBookingById(Integer id) {
        return bookingReservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
    }

    @Transactional
    public BookingReservation createBooking(BookingRequest request) {
        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + request.getCustomerId()));

        LocalDate bookingDate = request.getBookingDate() != null ? request.getBookingDate() : LocalDate.now();

        // Use setters (not builder) to avoid Lombok/JPA managed-entity interaction issues.
        BookingReservation reservation = new BookingReservation();
        reservation.setCustomer(customer);
        reservation.setBookingDate(bookingDate);
        reservation.setTotalPrice(BigDecimal.ZERO);

        // saveAndFlush forces the IDENTITY INSERT immediately so the generated ID is
        // available in the same transaction before we build the child details.
        reservation = bookingReservationRepository.saveAndFlush(reservation);

        // Capture the generated ID into a plain local variable — never rely on calling
        // reservation.getBookReservationId() through a potentially proxied reference.
        Integer reservationId = reservation.getBookReservationId();
        if (reservationId == null) {
            throw new RuntimeException("Failed to obtain generated BookReservationID after save");
        }

        BigDecimal totalPrice = BigDecimal.ZERO;
        List<BookingDetail> details = new ArrayList<>();

        for (BookingRequest.BookingDetailRequest detailReq : request.getDetails()) {
            Room room = roomRepository.findById(detailReq.getRoomId())
                    .orElseThrow(() -> new RuntimeException("Room not found with id: " + detailReq.getRoomId()));

            long days = ChronoUnit.DAYS.between(detailReq.getStartDate(), detailReq.getEndDate());
            if (days <= 0) {
                throw new RuntimeException("End date must be after start date for room: " + room.getRoomNumber());
            }

            BigDecimal actualPrice = room.getRoomPricePerDay().multiply(BigDecimal.valueOf(days));
            totalPrice = totalPrice.add(actualPrice);

            // Set the composite PK explicitly from the local reservationId variable so
            // Hibernate never has a chance to see a null value for BookReservationID.
            BookingDetail detail = new BookingDetail();
            detail.setId(new BookingDetailId(reservationId, room.getRoomId()));
            detail.setBookingReservation(reservation);
            detail.setRoom(room);
            detail.setStartDate(detailReq.getStartDate());
            detail.setEndDate(detailReq.getEndDate());
            detail.setActualPrice(actualPrice);

            details.add(detail);
        }

        // saveAllAndFlush persists all details and flushes immediately within the transaction.
        bookingDetailRepository.saveAllAndFlush(details);

        reservation.setTotalPrice(totalPrice);
        return bookingReservationRepository.save(reservation);
    }

    @Transactional
    public void deleteBooking(Integer id) {
        BookingReservation reservation = getBookingById(id);
        bookingReservationRepository.delete(reservation);
    }

    public List<BookingDetail> getDetailsByBookingId(Integer bookingId) {
        return bookingDetailRepository.findByIdBookReservationId(bookingId);
    }
}
