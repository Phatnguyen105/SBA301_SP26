package fu.se.assignment3.controller;

import fu.se.assignment3.dto.RoomTypeRequest;
import fu.se.assignment3.entity.RoomType;
import fu.se.assignment3.service.RoomTypeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/room-types")
public class RoomTypeController {

    @Autowired
    private RoomTypeService roomTypeService;

    @GetMapping
    public ResponseEntity<List<RoomType>> getAllRoomTypes() {
        return ResponseEntity.ok(roomTypeService.getAllRoomTypes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRoomTypeById(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(roomTypeService.getRoomTypeById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> createRoomType(@Valid @RequestBody RoomTypeRequest request) {
        try {
            return ResponseEntity.ok(roomTypeService.createRoomType(request));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateRoomType(@PathVariable Integer id,
                                             @Valid @RequestBody RoomTypeRequest request) {
        try {
            return ResponseEntity.ok(roomTypeService.updateRoomType(id, request));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRoomType(@PathVariable Integer id) {
        try {
            roomTypeService.deleteRoomType(id);
            return ResponseEntity.ok("Room type deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
