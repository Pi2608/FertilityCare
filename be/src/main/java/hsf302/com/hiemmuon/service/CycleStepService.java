package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.createDto.NoteMedicineScheduleDTO;
import hsf302.com.hiemmuon.dto.responseDto.CycleStepDTO;
import hsf302.com.hiemmuon.dto.responseDto.MedicineDTO;
import hsf302.com.hiemmuon.dto.responseDto.MedicineScheduleDTO;
import hsf302.com.hiemmuon.entity.Cycle;
import hsf302.com.hiemmuon.entity.CycleStep;
import hsf302.com.hiemmuon.entity.MedicineSchedule;
import hsf302.com.hiemmuon.enums.StatusCycle;
import hsf302.com.hiemmuon.exception.NotFoundException;
import hsf302.com.hiemmuon.repository.CycleRepository;
import hsf302.com.hiemmuon.repository.CycleStepRepository;
import hsf302.com.hiemmuon.repository.MedicineScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CycleStepService {

    @Autowired
    private CycleStepRepository cycleStepRepository;

    @Autowired
    private CycleRepository cycleRepository;

    @Autowired
    private MedicineScheduleRepository medicineScheduleRepository;

    public List<CycleStepDTO> getAllCycleStep(int cycleId) {

        if (!cycleRepository.existsById(cycleId)) {
            throw new NotFoundException("Không tìm thấy chu kỳ điều trị với cycleId = " + cycleId);
        }

        return cycleStepRepository.findByCycle_CycleId(cycleId)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    public CycleStepDTO getCycleStep(int cycleId, int stepOrder) {
        CycleStep step = cycleStepRepository.findByCycle_CycleIdAndStepOrder(cycleId, stepOrder);
        if (step == null) {
            throw new NotFoundException(
                    String.format("Không tìm thấy bước điều trị với cycleId = %d và stepOrder = %d", cycleId, stepOrder)
            );
        }
        return convertToDTO(step);
    }

    public CycleStepDTO updateCycleStepStatus(int cycleId, int stepId, StatusCycle status) {
        CycleStep step = cycleStepRepository.findByCycle_CycleIdAndStepOrder(cycleId, stepId);
        step.setStatusCycleStep(status);
        cycleStepRepository.save(step);

        if (status == StatusCycle.stopped) {
            List<CycleStep> lateSteps = cycleStepRepository
                    .findByCycle_CycleIdAndStepOrderGreaterThan(cycleId, step.getStepOrder());

            for (CycleStep lateStep : lateSteps) {
                lateStep.setStatusCycleStep(StatusCycle.stopped);
            }
            cycleStepRepository.saveAll(lateSteps);

            Cycle cycle = step.getCycle();
            cycle.setStatus(StatusCycle.stopped);
            cycleRepository.save(cycle);
        }
        return convertToDTO(step);
    }

    private CycleStepDTO convertToDTO(CycleStep cycleStep) {
        List<MedicineSchedule> schedules = medicineScheduleRepository.findByCycleStep_StepId(cycleStep.getStepId());

        List<MedicineScheduleDTO> medicineScheduleDTOs = schedules.stream().map(schedule -> {
            List<MedicineDTO> medicineDTOList = List.of(
                    new MedicineDTO(
                            schedule.getMedicine().getName(),
                            schedule.getMedicine().getDiscription(),
                            schedule.getMedicine().getDose(),
                            schedule.getMedicine().getFrequency(),
                            schedule.getMedicine().getTime()
                    )
            );

            return new MedicineScheduleDTO(
                    schedule.getMedicationId(),
                    schedule.getCycleStep().getStepOrder(),
                    schedule.getMedicine().getName(),
                    schedule.getStartDate(),
                    schedule.getEndDate(),
                    schedule.getEventDate(),
                    schedule.getStatus(),
                    schedule.getNote()
            );
        }).collect(Collectors.toList());

        return new CycleStepDTO(
                cycleStep.getStepOrder(),
                cycleStep.getCycle().getService().getName(),
                cycleStep.getDescription(),
                cycleStep.getEventdate(),
                cycleStep.getStatusCycleStep(),
                cycleStep.getNote(),
                null
        );
    }

    public NoteMedicineScheduleDTO updateNote(int cycleId, int stepId, String note) {
        CycleStep cycleStep = cycleStepRepository.findByCycle_CycleIdAndStepOrder(cycleId, stepId);

        cycleStep.setNote(note);
        cycleStepRepository.save(cycleStep);

        return new NoteMedicineScheduleDTO(note);
    }

}
