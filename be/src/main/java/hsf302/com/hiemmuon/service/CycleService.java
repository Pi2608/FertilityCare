package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.entityDto.CycleNoteDTO;
import hsf302.com.hiemmuon.dto.entityDto.CycleOfCustomerDTO;
import hsf302.com.hiemmuon.dto.entityDto.CycleOfDoctorDTO;
import hsf302.com.hiemmuon.entity.Cycle;
import hsf302.com.hiemmuon.entity.User;
import hsf302.com.hiemmuon.repository.CycleRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CycleService {

    @Autowired
    private CycleRepository cycleRepository;

    @Autowired
    private UserService userService;

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
}
