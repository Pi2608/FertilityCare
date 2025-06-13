package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.CreateTreatmentServiceDTO;
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

    public TreatmentService createTreatmentService(CreateTreatmentServiceDTO treatmentServiceDTO) {
        TreatmentService treatmentService = new TreatmentService();
        if (treatmentServiceRepository.findByName(treatmentServiceDTO.getName()) != null) {
            throw new IllegalArgumentException("Service with this name already exists");
        }
        treatmentService.setName(treatmentServiceDTO.getName());
        treatmentService.setPrice(treatmentServiceDTO.getPrice());
        treatmentService.setDescription(treatmentServiceDTO.getDescription());
        treatmentService.setSuccessRate(treatmentServiceDTO.getSuccessRate());
        treatmentService.setSpecialfications(treatmentServiceDTO.getSpecialfications());

        return treatmentServiceRepository.save(treatmentService);
    }
}