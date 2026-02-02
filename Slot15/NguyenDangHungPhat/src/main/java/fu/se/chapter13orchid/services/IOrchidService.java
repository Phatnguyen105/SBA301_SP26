package fu.se.chapter13orchid.services;

import fu.se.chapter13orchid.dtos.request.OrchidCreateRequest;
import fu.se.chapter13orchid.dtos.request.OrchidUpdateRequest;
import fu.se.chapter13orchid.dtos.response.OrchidResponse;

import java.util.List;

public interface IOrchidService {

    List<OrchidResponse> findAll();

    OrchidResponse findById(Integer id);

    OrchidResponse create(OrchidCreateRequest request);

    OrchidResponse update(Integer id, OrchidUpdateRequest request);

    void deleteById(Integer id);
}
