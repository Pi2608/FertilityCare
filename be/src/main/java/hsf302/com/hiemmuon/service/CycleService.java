package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.createDto.CreateCycleDTO;
import hsf302.com.hiemmuon.dto.responseDto.CycleDTO;
import hsf302.com.hiemmuon.dto.responseDto.CycleNoteDTO;
import hsf302.com.hiemmuon.dto.responseDto.CycleStepDTO;
import hsf302.com.hiemmuon.entity.*;
import hsf302.com.hiemmuon.enums.StatusCycle;
import hsf302.com.hiemmuon.repository.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CycleService {

    @Autowired
    private CycleRepository cycleRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private TreatmentServiceRepository treatmentServiceRepository;

    @Autowired
    private TreatmentStepRepository treatmentStepRepository;

    @Autowired
    private CycleStepRepository cycleStepRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    public List<CycleDTO> getAllCycleOfCustomer(HttpServletRequest request) {
        User user = userService.getUserByJwt(request);
        if (user.getCustomer() == null) {
            throw new RuntimeException("User không phải là khách hàng.");
        }
        List<Cycle> cycles = cycleRepository.findByCustomer_CustomerId(user.getCustomer().getCustomerId());
        return cycles.stream().map(this::convertToCycleDTO).toList();
    }

    public List<CycleDTO> getAllCycleOfDoctor(HttpServletRequest request) {
        User user = userService.getUserByJwt(request);
        if (user.getDoctor() == null) {
            throw new RuntimeException("User không phải là bác sĩ.");
        }
        List<Cycle> cycles = cycleRepository.findByDoctor_DoctorId(user.getDoctor().getDoctorId());
        return cycles.stream().map(this::convertToCycleDTO).toList();
    }

    public CycleDTO getCurrentCycleByCustomerId(HttpServletRequest request) {
        User user = userService.getUserByJwt(request);

        Cycle currentCycle = cycleRepository.findByStatusAndCustomer_CustomerId(StatusCycle.ongoing, user.getUserId());
        return convertToCycleDTO(currentCycle);
    }


    public CycleNoteDTO updateCycleNote(int cycleId, String note) {
        Cycle cycle = cycleRepository.findById(cycleId);
        cycle.setNote(note);
        cycleRepository.save(cycle);
        return new CycleNoteDTO(cycle.getNote());
    }

    @Transactional
    public CycleDTO createCycle(CreateCycleDTO dto, HttpServletRequest request) {

        User user = userService.getUserByJwt(request);
        Doctor doctor = user.getDoctor();

        Customer customer = customerRepository.findById(dto.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        TreatmentService service = treatmentServiceRepository.findById(dto.getServiceId());

        // Tính ngày kết thúc theo logic hệ thống
        LocalDate endDate = dto.getStartDate().plusMonths(10);

        List<Cycle> overlappingCycles = cycleRepository.findOverlappingCycles(
                dto.getCustomerId(),
                dto.getStartDate(),
                endDate,
                StatusCycle.ongoing);


        if (!overlappingCycles.isEmpty()) {
            throw new RuntimeException("Khách hàng này đã có một chu kỳ điều trị trong thời gian này.");
        }

        // Tạo Cycle
        Cycle cycle = new Cycle();
        cycle.setCustomer(customer);
        cycle.setDoctor(doctor);
        cycle.setService(service);
        cycle.setStartDate(dto.getStartDate());
        cycle.setEndDate(dto.getStartDate().plusMonths(10));
        cycle.setNote(dto.getNote());
        cycle.setStatus(StatusCycle.ongoing);

        Cycle savedCycle = cycleRepository.save(cycle);

        List<TreatmentStep> treatmentSteps = treatmentStepRepository
                .findByService_ServiceIdOrderByStepOrderAsc(service.getServiceId());

        List<CycleStepDTO> listStep = new ArrayList<>();

        for (int i = 0; i < treatmentSteps.size(); i++) {
            TreatmentStep step = treatmentSteps.get(i);

            CycleStep cycleStep = new CycleStep();
            cycleStep.setCycle(savedCycle);
            cycleStep.setTreatmentStep(step);
            cycleStep.setStepOrder(step.getStepOrder());
            cycleStep.setStatusCycleStep(StatusCycle.ongoing);
            cycleStep.setDescription(step.getDescription());

            if (i == 0) {
                cycleStep.setStartDate(dto.getStartDate());
                cycleStep.setEventdate(dto.getStartDate().plusDays(1).atTime(10, 0));
            }

            cycleStepRepository.save(cycleStep);

            CycleStepDTO cycleStepDTO = CycleStepDTO.builder()
                    .stepId(cycleStep.getStepId())
                    .stepOrder(cycleStep.getStepOrder())
                    .service(cycle.getService().getName())
                    .description(cycleStep.getDescription())
                    .startDate(cycleStep.getStartDate())
                    .eventDate(cycleStep.getEventdate())
                    .statusCycleStep(cycleStep.getStatusCycleStep())
                    .note(cycleStep.getNote())
                    .build();
            listStep.add(cycleStepDTO);
        }

        return new CycleDTO(
                savedCycle.getCycleId(),
                savedCycle.getCustomer().getCustomerId(),
                savedCycle.getCustomer().getUser().getName(),
                Period.between(savedCycle.getCustomer().getUser().getDob(), LocalDate.now()).getYears(),
                savedCycle.getDoctor().getDoctorId(),
                savedCycle.getDoctor().getUser().getName(),
                savedCycle.getService().getServiceId(),
                savedCycle.getService().getName(),
                savedCycle.getStartDate(),
                savedCycle.getEndDate(),
                savedCycle.getStatus(),
                savedCycle.getNote(),
                listStep
        );
    }

    public CycleDTO getCycleByAppointmentId(HttpServletRequest request, int appointmentId) {
        User user = userService.getUserByJwt(request);
//        if (user.getDoctor() == null) {
//            throw new RuntimeException("Bạn không phải là bác sĩ.");
//        }

        // Tìm appointment trước để lấy thông tin cycle
        Appointment appointment = appointmentRepository.findById(appointmentId);

        // Lấy cycle từ appointment
        Cycle cycle = appointment.getCycleStep().getCycle();
        if (cycle == null) {
            throw new RuntimeException("Cuộc hẹn này không có chu kỳ điều trị liên kết.");
        }

//        // Kiểm tra quyền truy cập - chỉ bác sĩ phụ trách cycle mới được xem
//        if (cycle.getDoctor() == null || cycle.getDoctor().getDoctorId() != user.getDoctor().getDoctorId()) {
//            throw new RuntimeException("Bạn không có quyền xem chu kỳ điều trị này.");
//        }

        return convertToCycleFODTO(cycle);
    }
    private CycleDTO convertToCycleDTO(Cycle cycle) {
        List<CycleStepDTO> stepDTOs = new ArrayList<>();

        CycleStep ongoingStep = cycleStepRepository
                .findFirstByCycle_CycleIdAndStatusCycleStepOrderByStepOrderAsc(
                        cycle.getCycleId(), StatusCycle.ongoing);

        if (ongoingStep != null) {
            stepDTOs.add(convertToCycleStepDTO(ongoingStep));
        } else {
            List<CycleStep> finishedSteps = cycleStepRepository
                    .findByCycle_CycleIdAndStatusCycleStepOrderByStepOrderAsc(
                            cycle.getCycleId(), StatusCycle.finished);

            if (!finishedSteps.isEmpty()) {
                CycleStep lastFinishedStep = finishedSteps.get(finishedSteps.size() - 1);
                stepDTOs.add(convertToCycleStepDTO(lastFinishedStep));
            }
        }

        return CycleDTO.builder()
                .cycleId(cycle.getCycleId())
                .customerId(cycle.getCustomer().getCustomerId())
                .customerName(cycle.getCustomer().getUser().getName())
                .customerAge(Period.between(
                        cycle.getCustomer().getUser().getDob(),
                        LocalDate.now()).getYears())
                .doctorId(cycle.getDoctor().getDoctorId())
                .doctorName(cycle.getDoctor().getUser().getName())
                .serviceId(cycle.getService().getServiceId())
                .serviceName(cycle.getService().getName())
                .startDate(cycle.getStartDate())
                .endDate(cycle.getEndDate())
                .status(cycle.getStatus())
                .note(cycle.getNote())
                .cycleStep(stepDTOs)
                .build();
    }

    private CycleStepDTO convertToCycleStepDTO(CycleStep step) {
        return CycleStepDTO.builder()
                .stepId(step.getStepId())
                .stepOrder(step.getStepOrder())
                .service(step.getCycle().getService().getName())
                .description(step.getDescription())
                .eventDate(step.getEventdate())
                .statusCycleStep(step.getStatusCycleStep())
                .note(step.getNote())
                .startDate(step.getStartDate())
                .build();
    }

    private CycleDTO convertToCycleFODTO(Cycle cycle) {
        List<CycleStepDTO> stepDTOs = new ArrayList<>();

        // 1. Lấy tất cả các bước đã hoàn thành
        List<StatusCycle> includedStatuses = List.of(StatusCycle.finished, StatusCycle.stopped);
        List<CycleStep> finishedSteps = cycleStepRepository
                .findByCycle_CycleIdAndStatusCycleStepInOrderByStepOrderAsc(
                        cycle.getCycleId(), includedStatuses);

        for (CycleStep step : finishedSteps) {
            stepDTOs.add(convertToCycleStepDTO(step));
        }

        // 2. Thêm bước đang diễn ra (nếu có)
        CycleStep ongoingStep = cycleStepRepository
                .findFirstByCycle_CycleIdAndStatusCycleStepOrderByStepOrderAsc(
                        cycle.getCycleId(), StatusCycle.ongoing);

        if (ongoingStep != null) {
            stepDTOs.add(convertToCycleStepDTO(ongoingStep));
        }

        return CycleDTO.builder()
                .cycleId(cycle.getCycleId())
                .customerId(cycle.getCustomer().getCustomerId())
                .customerName(cycle.getCustomer().getUser().getName())
                .customerAge(Period.between(
                        cycle.getCustomer().getUser().getDob(),
                        LocalDate.now()).getYears())
                .doctorId(cycle.getDoctor().getDoctorId())
                .doctorName(cycle.getDoctor().getUser().getName())
                .serviceId(cycle.getService().getServiceId())
                .serviceName(cycle.getService().getName())
                .startDate(cycle.getStartDate())
                .endDate(cycle.getEndDate())
                .status(cycle.getStatus())
                .note(cycle.getNote())
                .cycleStep(stepDTOs)
                .build();
    }
}