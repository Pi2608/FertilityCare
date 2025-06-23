package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.createDto.CreateCycleDTO;
import hsf302.com.hiemmuon.dto.entityDto.CycleNoteDTO;
import hsf302.com.hiemmuon.dto.entityDto.CycleOfCustomerDTO;
import hsf302.com.hiemmuon.dto.entityDto.CycleOfDoctorDTO;
import hsf302.com.hiemmuon.entity.*;
import hsf302.com.hiemmuon.enums.StatusCycle;
import hsf302.com.hiemmuon.repository.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

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
    private MedicineRepository medicineRepository;

    @Autowired
    private MedicineScheduleRepository medicineScheduleRepository;

    public List<CycleOfCustomerDTO> getAllCycleOfCustomer(HttpServletRequest request) {
        User user = userService.getUserByJwt(request);
        List<Cycle> cycles = cycleRepository.findByCustomer_CustomerId(user.getCustomer().getCustomerId());
        return cycles.stream().map(this::convertToCycleOfCustomerDTO).toList();
    }

    public List<CycleOfDoctorDTO> getCycleOfDoctor(HttpServletRequest request) {
        User user = userService.getUserByJwt(request);
        List<Cycle> cycles = cycleRepository.findByDoctor_DoctorId(user.getDoctor().getDoctorId());
        return cycles.stream().map(this::convertToCycleOfDoctorDTO).toList();
    }

    public CycleNoteDTO updateCycleNote(int cycleId, String note) {
        Cycle cycle = cycleRepository.findById(cycleId);
        cycle.setNote(note);
        cycleRepository.save(cycle);
        return new CycleNoteDTO(cycle.getNote());
    }

    private CycleOfCustomerDTO convertToCycleOfCustomerDTO(Cycle cycle) {
        return new CycleOfCustomerDTO(
                cycle.getCycleId(),
                cycle.getDoctor().getUser().getName(),
                cycle.getService().getName(),
                cycle.getStartdate(),
                cycle.getEndDate(),
                cycle.getStatus(),
                cycle.getNote()
        );
    }

    private CycleOfDoctorDTO convertToCycleOfDoctorDTO(Cycle cycle) {
        return new CycleOfDoctorDTO(
                cycle.getCycleId(),
                cycle.getCustomer().getUser().getName(),
                cycle.getService().getName(),
                cycle.getStartdate(),
                cycle.getEndDate(),
                cycle.getStatus(),
                cycle.getNote()
        );
    }

    @Transactional
    public Cycle createCycle(CreateCycleDTO dto, HttpServletRequest request) {

        User user = userService.getUserByJwt(request);
        Doctor doctor = user.getDoctor();

        Customer customer = customerRepository.findById(dto.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        TreatmentService service = treatmentServiceRepository.findById(dto.getServiceId());

        // Tạo Cycle
        Cycle cycle = new Cycle();
        cycle.setCustomer(customer);
        cycle.setDoctor(doctor);
        cycle.setService(service);
        cycle.setStartdate(dto.getStartDate());
        cycle.setEndDate(dto.getStartDate().plusMonths(10));
        cycle.setNote(dto.getNote());
        cycle.setStatus(StatusCycle.ongoing);

        Cycle savedCycle = cycleRepository.save(cycle);

        // Lấy các bước điều trị theo service
        List<TreatmentStep> treatmentSteps = treatmentStepRepository
                .findByService_ServiceIdOrderByStepOrderAsc(service.getServiceId());

        LocalDate eventDate = dto.getStartDate().plusMonths(2);

        for (TreatmentStep step : treatmentSteps) {
            // Tạo CycleStep từ TreatmentStep
            CycleStep cycleStep = new CycleStep();
            cycleStep.setCycle(savedCycle);
            cycleStep.setTreatmentStep(step);
            cycleStep.setStepOrder(step.getStepOrder());
            cycleStep.setStatusCycleStep(StatusCycle.ongoing);
            cycleStep.setDescription(null);
            cycleStep.setEventdate(eventDate);

            CycleStep savedCycleStep = cycleStepRepository.save(cycleStep);

            // Lấy danh sách thuốc theo treatmentStepId
            List<Medicine> medicines = medicineRepository.findByTreatmentStep_Id(step.getId());

            for (Medicine medicine : medicines) {
                MedicineSchedule cycleMedicine = new MedicineSchedule();
                cycleMedicine.setCycleStep(savedCycleStep);
                cycleMedicine.setMedicine(medicine);
                cycleMedicine.setStartdate(eventDate);
                cycleMedicine.setEnddate(eventDate.plusDays(5));
                cycleMedicine.setNote(null);
                medicineScheduleRepository.save(cycleMedicine);
            }

            // Cập nhật ngày cho step tiếp theo
            eventDate = eventDate.plusMonths(2);
        }
        return savedCycle;
    }
}
