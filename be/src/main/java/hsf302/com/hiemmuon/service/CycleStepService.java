package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.entityDto.CycleStepDTO;
import hsf302.com.hiemmuon.entity.Cycle;
import hsf302.com.hiemmuon.entity.CycleStep;
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

    public List<CycleStepDTO> getAllCycleStepByMe(HttpServletRequest request, int cycleId) {
        Cycle myCycle = cycleService.getCycleByMe(request, cycleId);
        return cycleStepRepository.findByCycle_CycleId(myCycle.getCycleId()).stream().map(
                cycleStep -> new CycleStepDTO(
                        cycleStep.getCycle().getService().getName(),
                        cycleStep.getDescription(),
                        cycleStep.getEventdate(),
                        cycleStep.getStatusCycleStep()
                )
        ).toList();
    }

    public CycleStepDTO getCycleStepByMe(HttpServletRequest request, int cycleId ,int stepId) {
        Cycle myCycle = cycleService.getCycleByMe(request, cycleId);
        System.out.println("CycleId: " + myCycle.getCycleId() + ", StepId: " + stepId);

        CycleStep step = cycleStepRepository.findByCycle_CycleIdAndStepId(myCycle.getCycleId(), stepId);
        return new CycleStepDTO(
                step.getCycle().getService().getName(),
                step.getDescription(),
                step.getEventdate(),
                step.getStatusCycleStep()
        );
    }

}
