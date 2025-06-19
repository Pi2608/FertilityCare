package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.entityDto.CycleStepDTO;
import hsf302.com.hiemmuon.entity.CycleStep;
import hsf302.com.hiemmuon.enums.StatusCycle;
import hsf302.com.hiemmuon.repository.CycleStepRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CycleStepService {

    @Autowired
    private CycleStepRepository cycleStepRepository;

    public List<CycleStepDTO> getAllCycleStepByMe(int cycleId) {
        return cycleStepRepository.findByCycle_CycleId(cycleId)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    public CycleStepDTO getCycleStepByMe(int cycleId, int stepId) {
        CycleStep step = cycleStepRepository.findByCycle_CycleIdAndStepId(cycleId, stepId);
        return convertToDTO(step);
    }

    public CycleStepDTO updateCycleStepStatus(int cycleId, int stepId, StatusCycle status) {
        CycleStep step = cycleStepRepository.findByCycle_CycleIdAndStepId(cycleId, stepId);
        step.setStatusCycleStep(status);
        cycleStepRepository.save(step);
        return convertToDTO(step);
    }

    private CycleStepDTO convertToDTO(CycleStep cycleStep) {
        return new CycleStepDTO(
                cycleStep.getCycle().getService().getName(),
                cycleStep.getDescription(),
                cycleStep.getEventdate(),
                cycleStep.getStatusCycleStep()
        );
    }

}
