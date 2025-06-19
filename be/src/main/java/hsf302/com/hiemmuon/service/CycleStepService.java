package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.entityDto.CycleNoteDTO;
import hsf302.com.hiemmuon.dto.entityDto.CycleStepDTO;
import hsf302.com.hiemmuon.entity.Cycle;
import hsf302.com.hiemmuon.entity.CycleStep;
import hsf302.com.hiemmuon.enums.StatusCycle;
import hsf302.com.hiemmuon.repository.CycleRepository;
import hsf302.com.hiemmuon.repository.CycleStepRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CycleStepService {

    @Autowired
    private CycleStepRepository cycleStepRepository;

    @Autowired
    private CycleRepository cycleRepository;

    @Autowired
    private CycleService cycleService;

    public List<CycleStepDTO> getAllCycleStepByMe(int cycleId) {
        return cycleStepRepository.findByCycle_CycleId(cycleId).stream().map(
                cycleStep -> new CycleStepDTO(
                        cycleStep.getCycle().getService().getName(),
                        cycleStep.getDescription(),
                        cycleStep.getEventdate(),
                        cycleStep.getStatusCycleStep()
                )
        ).toList();
    }

    public CycleStepDTO getCycleStepByMe(int cycleId ,int stepId) {
        CycleStep step = cycleStepRepository.findByCycle_CycleIdAndStepId(cycleId, stepId);
        return new CycleStepDTO(
                step.getCycle().getService().getName(),
                step.getDescription(),
                step.getEventdate(),
                step.getStatusCycleStep()
        );
    }

    public CycleStepDTO updateCycleStepStatus(int cycleId, int stepId, StatusCycle status) {
        CycleStep step = cycleStepRepository.findByCycle_CycleIdAndStepId(cycleId, stepId);
        step.setStatusCycleStep(status);
        cycleStepRepository.save(step);
        return new CycleStepDTO(
                step.getCycle().getService().getName(),
                step.getDescription(),
                step.getEventdate(),
                step.getStatusCycleStep()
        );
    }
}
