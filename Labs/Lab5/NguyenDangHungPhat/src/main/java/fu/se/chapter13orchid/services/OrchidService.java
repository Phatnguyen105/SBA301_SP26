package fu.se.chapter13orchid.services;

import fu.se.chapter13orchid.dtos.request.OrchidCreateRequest;
import fu.se.chapter13orchid.dtos.request.OrchidUpdateRequest;
import fu.se.chapter13orchid.dtos.response.OrchidResponse;
import fu.se.chapter13orchid.exceptions.ResourceNotFoundException;
import fu.se.chapter13orchid.pojos.Category;
import fu.se.chapter13orchid.pojos.Orchid;
import fu.se.chapter13orchid.repositories.ICategoryRepository;
import fu.se.chapter13orchid.repositories.IOrchidRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class OrchidService implements IOrchidService {

    private final IOrchidRepository orchidRepo;
    private final ICategoryRepository categoryRepo;

    public OrchidService(
            IOrchidRepository orchidRepo,
            ICategoryRepository categoryRepo
    ) {
        this.orchidRepo = orchidRepo;
        this.categoryRepo = categoryRepo;
    }

    // ================= MAPPER =================
    private OrchidResponse toResponse(Orchid orchid) {
        OrchidResponse res = new OrchidResponse();
        res.id = orchid.getId();
        res.orchidName = orchid.getOrchidName();
        res.description = orchid.getDescription();
        res.image = orchid.getImage();
        res.price = orchid.getPrice();
        res.isSpecial = orchid.getIsSpecial();

        if (orchid.getCategory() != null) {
            res.categoryId = orchid.getCategory().getId();
            res.categoryName = orchid.getCategory().getName();
        }

        return res;
    }

    // ================= GET ALL =================
    @Override
    public List<OrchidResponse> findAll() {
        return orchidRepo.findAllWithCategory()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // ================= GET BY ID =================
    @Override
    public OrchidResponse findById(Integer id) {
        Orchid orchid = orchidRepo.findByIdWithCategory(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Orchid with id " + id + " not found"
                        )
                );
        return toResponse(orchid);
    }

    // ================= CREATE =================
    @Override
    public OrchidResponse create(OrchidCreateRequest request) {

        Category category = categoryRepo.findById(request.getCategoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Category with id " + request.getCategoryId() + " not found"
                        )
                );

        Orchid orchid = new Orchid();
        orchid.setOrchidName(request.getOrchidName());
        orchid.setDescription(request.getDescription());
        orchid.setImage(request.getImage());
        orchid.setPrice(request.getPrice());
        orchid.setIsSpecial(request.getIsSpecial());
        orchid.setCategory(category);

        orchidRepo.save(orchid);

        // reload để đảm bảo category luôn có
        return findById(orchid.getId());
    }

    // ================= UPDATE =================
    @Override
    public OrchidResponse update(Integer id, OrchidUpdateRequest request) {

        Orchid orchid = orchidRepo.findByIdWithCategory(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Orchid with id " + id + " not found"
                        )
                );

        Category category = categoryRepo.findById(request.getCategoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Category with id " + request.getCategoryId() + " not found"
                        )
                );

        orchid.setOrchidName(request.getOrchidName());
        orchid.setDescription(request.getDescription());
        orchid.setImage(request.getImage());
        orchid.setPrice(request.getPrice());
        orchid.setIsSpecial(request.getIsSpecial());
        orchid.setCategory(category);

        orchidRepo.save(orchid);

        // reload lại entity sau update
        return findById(id);
    }

    // ================= DELETE =================
    @Override
    public void deleteById(Integer id) {
        if (!orchidRepo.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Orchid with id " + id + " not found"
            );
        }
        orchidRepo.deleteById(id);
    }
}
