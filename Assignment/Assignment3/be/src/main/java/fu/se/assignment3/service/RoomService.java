package fu.se.assignment3.service;

import fu.se.assignment3.dto.RoomRequest;
import fu.se.assignment3.entity.Room;
import fu.se.assignment3.entity.RoomType;
import fu.se.assignment3.repository.RoomRepository;
import fu.se.assignment3.repository.RoomTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public List<Room> getAvailableRooms() {
        return roomRepository.findByRoomStatus(0);
    }

    public Room getRoomById(Integer id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + id));
    }

    public Room createRoom(RoomRequest request) {
        if (roomRepository.existsByRoomNumber(request.getRoomNumber())) {
            throw new RuntimeException("Room number already exists");
        }
        RoomType roomType = roomTypeRepository.findById(request.getRoomTypeId())
                .orElseThrow(() -> new RuntimeException("RoomType not found with id: " + request.getRoomTypeId()));

        Room room = Room.builder()
                .roomNumber(request.getRoomNumber())
                .roomDescription(request.getRoomDescription())
                .roomMaxCapacity(request.getRoomMaxCapacity())
                .roomStatus(request.getRoomStatus() != null ? request.getRoomStatus() : 0)
                .roomPricePerDay(request.getRoomPricePerDay())
                .roomType(roomType)
                .build();
        return roomRepository.save(room);
    }

    public Room updateRoom(Integer id, RoomRequest request) {
        Room room = getRoomById(id);

        if (!room.getRoomNumber().equalsIgnoreCase(request.getRoomNumber())
                && roomRepository.existsByRoomNumber(request.getRoomNumber())) {
            throw new RuntimeException("Room number already in use");
        }

        RoomType roomType = roomTypeRepository.findById(request.getRoomTypeId())
                .orElseThrow(() -> new RuntimeException("RoomType not found with id: " + request.getRoomTypeId()));

        room.setRoomNumber(request.getRoomNumber());
        room.setRoomDescription(request.getRoomDescription());
        room.setRoomMaxCapacity(request.getRoomMaxCapacity());
        room.setRoomStatus(request.getRoomStatus());
        room.setRoomPricePerDay(request.getRoomPricePerDay());
        room.setRoomType(roomType);

        return roomRepository.save(room);
    }

    public void deleteRoom(Integer id) {
        Room room = getRoomById(id);
        if (roomRepository.hasBookingDetails(id)) {
            // Soft delete: mark as inactive
            room.setRoomStatus(2);
            roomRepository.save(room);
        } else {
            roomRepository.delete(room);
        }
    }
}
