package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.responseDto.TreatmentStepDTO;
import hsf302.com.hiemmuon.entity.TreatmentStep;
import hsf302.com.hiemmuon.repository.TreatmentStepRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TreatmentStepService {

    @Autowired
    private TreatmentStepRepository treatmentStepRepository;

    public TreatmentStep getStepByServiceAndStepOrder(int serviceId, int stepOrder) {
        return treatmentStepRepository.findByStepOrderAndService_ServiceId(stepOrder, serviceId);
    }

    public List<TreatmentStepDTO> findAllStepsByServiceId(int serviceId) {
        List<TreatmentStep> steps = treatmentStepRepository.findAllByService_ServiceId(serviceId);
        return steps.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private TreatmentStepDTO convertToDTO(TreatmentStep step) {
        TreatmentStepDTO dto = new TreatmentStepDTO();
        dto.setStepOrder(step.getStepOrder());
        dto.setTitle(step.getTitle());
        dto.setDescription(step.getDescription());
        return dto;
    }
}
