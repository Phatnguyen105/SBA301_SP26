package fu.se.assignment3.service;

import fu.se.assignment3.dto.RoomTypeRequest;
import fu.se.assignment3.entity.RoomType;
import fu.se.assignment3.repository.RoomTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomTypeService {

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    public List<RoomType> getAllRoomTypes() {
        return roomTypeRepository.findAll();
    }

    public RoomType getRoomTypeById(Integer id) {
        return roomTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("RoomType not found with id: " + id));
    }

    public RoomType createRoomType(RoomTypeRequest request) {
        if (roomTypeRepository.existsByRoomTypeName(request.getRoomTypeName())) {
            throw new RuntimeException("Room type name already exists");
        }
        RoomType roomType = RoomType.builder()
                .roomTypeName(request.getRoomTypeName())
                .typeDescription(request.getTypeDescription())
                .typeNote(request.getTypeNote())
                .build();
        return roomTypeRepository.save(roomType);
    }

    public RoomType updateRoomType(Integer id, RoomTypeRequest request) {
        RoomType roomType = getRoomTypeById(id);
        roomType.setRoomTypeName(request.getRoomTypeName());
        roomType.setTypeDescription(request.getTypeDescription());
        roomType.setTypeNote(request.getTypeNote());
        return roomTypeRepository.save(roomType);
    }

    public void deleteRoomType(Integer id) {
        RoomType roomType = getRoomTypeById(id);
        roomTypeRepository.delete(roomType);
    }
}
