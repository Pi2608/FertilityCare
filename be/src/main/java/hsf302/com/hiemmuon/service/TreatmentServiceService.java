package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.createDto.CreateTreatmentServiceDTO;
import hsf302.com.hiemmuon.dto.updateDto.UpdateServiceDTO;
import hsf302.com.hiemmuon.entity.TreatmentService;
import hsf302.com.hiemmuon.repository.TreatmentServiceRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TreatmentServiceService {

    @Autowired
    private TreatmentServiceRepository treatmentServiceRepository;

    public List<TreatmentService> findAll() {
        return treatmentServiceRepository.findAll();
    }

    public TreatmentService createTreatmentService(
            CreateTreatmentServiceDTO treatmentServiceDTO) {

        TreatmentService treatmentService = new TreatmentService();
        if (treatmentServiceRepository.findByName(treatmentServiceDTO.getName()) != null) {
            throw new IllegalArgumentException("Service with this name already exists");
        }

        treatmentService.setName(treatmentServiceDTO.getName());
        treatmentService.setPrice(treatmentServiceDTO.getPrice());
        treatmentService.setDescription(treatmentServiceDTO.getDescription());
        treatmentService.setSuccessRate(treatmentServiceDTO.getSuccessRate());
        treatmentService.setSpecifications(treatmentServiceDTO.getSpecialfications());
        treatmentService.setActive(true);

        return treatmentServiceRepository.save(treatmentService);
    }

    public TreatmentService updateTreatmentService(
            int id,
            @Valid UpdateServiceDTO updateServiceDTO) {

        TreatmentService service = treatmentServiceRepository.findById(id);

        if (updateServiceDTO.getPrice() != null) {
            service.setPrice(updateServiceDTO.getPrice());
        }
        if (updateServiceDTO.getDescription() != null && !updateServiceDTO.getDescription().trim().isEmpty()) {
            service.setDescription(updateServiceDTO.getDescription());
        }
        if (updateServiceDTO.getSuccessRate() != null) {
            service.setSuccessRate(updateServiceDTO.getSuccessRate());
        }
        if (updateServiceDTO.getSpecialfications() != null && !updateServiceDTO.getSpecialfications().trim().isEmpty()) {
            service.setSpecifications(updateServiceDTO.getSpecialfications());
        }
        return treatmentServiceRepository.save(service);
    }

    public TreatmentService updateServiceActive(
            int id,
            boolean active) {

        TreatmentService service = treatmentServiceRepository.findById(id);
        service.setActive(active);
        return treatmentServiceRepository.save(service);
    }

    public TreatmentService getServiceById(int id) {
        return treatmentServiceRepository.findById(id);
    }
    public TreatmentService getServiceByName(String name) {
        return treatmentServiceRepository.findByName(name);
    }
    public List<TreatmentService> getServiceByStatus() {
        return treatmentServiceRepository.findByIsActive(true);
    }
}