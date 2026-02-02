package fu.se.chapter13orchid.controllers;

import fu.se.chapter13orchid.dtos.response.OrchidResponse;
import fu.se.chapter13orchid.pojos.Orchid;
import fu.se.chapter13orchid.services.IOrchidService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import fu.se.chapter13orchid.dtos.request.OrchidCreateRequest;
import fu.se.chapter13orchid.dtos.request.OrchidUpdateRequest;

import java.util.List;

@RestController
@RequestMapping("/api/orchids")
public class OrchidController {

    private final IOrchidService orchidService;

    public OrchidController(IOrchidService orchidService) {
        this.orchidService = orchidService;
    }

    // GET /api/orchids
    @GetMapping
    public ResponseEntity<List<OrchidResponse>> getAll() {
        return ResponseEntity.ok(orchidService.findAll());
    }

    // GET /api/orchids/{id}
    @GetMapping("/{id}")
    public ResponseEntity<OrchidResponse> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(orchidService.findById(id));
    }

    // POST /api/orchids
    @PostMapping
    public ResponseEntity<OrchidResponse> create(
            @RequestBody OrchidCreateRequest request
    ) {
        OrchidResponse created = orchidService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // PUT /api/orchids/{id}
    @PutMapping("/{id}")
    public ResponseEntity<OrchidResponse> update(
            @PathVariable Integer id,
            @RequestBody OrchidUpdateRequest request
    ) {
        return ResponseEntity.ok(orchidService.update(id, request));
    }

    // DELETE /api/orchids/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        orchidService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
