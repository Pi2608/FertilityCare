package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.createDto.TreatmentStepDTO;
import hsf302.com.hiemmuon.entity.CycleStep;
import hsf302.com.hiemmuon.entity.TreatmentStep;
import hsf302.com.hiemmuon.repository.CycleStepRepository;
import hsf302.com.hiemmuon.repository.TreatmentServiceRepository;
import hsf302.com.hiemmuon.repository.TreatmentStepRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TreatmentStepService {

    @Autowired
    private TreatmentServiceRepository treatmentServiceRepository;

    @Autowired
    private TreatmentStepRepository treatmentStepRepository;

    @Autowired
    private CycleStepRepository cycleStepRepository;

    public TreatmentStep getStepByServiceAndStepOrder(int serviceId, int stepOrder) {
        return treatmentStepRepository.findByStepOrderAndService_ServiceId(stepOrder, serviceId);
    }

    public List<TreatmentStep> findAllStepsByServiceId(int serviceId) {
        return treatmentStepRepository.findAllByService_ServiceId(serviceId);
    }

    public TreatmentStep createStep(Integer serviceId, TreatmentStepDTO dto) {

        TreatmentStep step = new TreatmentStep();

        if (treatmentServiceRepository.findByServiceId(serviceId)) {
            step.setStepOrder(dto.getStepOrder());
            step.setTitle(dto.getTitle());
            step.setDescription(dto.getDescription());
            step.setExpectedDuration(dto.getExpectedDuration());

        }
        return treatmentStepRepository.save(step);
    }

    public TreatmentStep updateStep(Integer stepId, TreatmentStepDTO dto) {
        TreatmentStep step = treatmentStepRepository.findByStepId(stepId);
        if (step != null) {
            boolean updated = false;

            if (dto.getStepOrder() != null) {
                step.setStepOrder(dto.getStepOrder());
                updated = true;
            }
            if (dto.getTitle() != null) {
                step.setTitle(dto.getTitle());
                updated = true;
            }
            if (dto.getDescription() != null) {
                step.setDescription(dto.getDescription());
                updated = true;
            }
            if (dto.getExpectedDuration() != null) {
                step.setExpectedDuration(dto.getExpectedDuration());
                updated = true;
            }

            if (updated) {
                treatmentStepRepository.save(step);

                // 🌀 Cập nhật các CycleStep liên quan
                List<CycleStep> cycleSteps = cycleStepRepository.findAllByTreatmentStep(step);
                for (CycleStep cs : cycleSteps) {
                    if (dto.getStepOrder() != null) {
                        cs.setStepOrder(dto.getStepOrder());
                    }
                    if (dto.getDescription() != null) {
                        cs.setDescription(dto.getDescription());
                    }
                    cycleStepRepository.save(cs);
                }
            }
        }
        return step;
    }

}