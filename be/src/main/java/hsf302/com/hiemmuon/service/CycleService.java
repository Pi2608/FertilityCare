package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.entityDto.CycleNoteDTO;
import hsf302.com.hiemmuon.dto.entityDto.CycleOfCustomerDTO;
import hsf302.com.hiemmuon.dto.entityDto.CycleOfDoctorDTO;
import hsf302.com.hiemmuon.dto.entityDto.CycleStepDTO;
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
        return cycles.stream().map(cycle -> new CycleOfCustomerDTO(
                cycle.getCycleId(),
                cycle.getDoctor().getUser().getName(),
                cycle.getService().getName(),
                cycle.getStartdate(),
                cycle.getEndDate(),
                cycle.getStatus(),
                cycle.getNote()
        )).toList();
    }

    public List<CycleOfDoctorDTO> getCycleOfDoctor(HttpServletRequest request) {
        User user = userService.getUserByJwt(request);
        List<Cycle> cycles = cycleRepository.findByDoctor_DoctorId(user.getDoctor().getDoctorId());

        return cycles.stream().map(cycle -> new CycleOfDoctorDTO(
                cycle.getCycleId(),
                cycle.getCustomer().getUser().getName(),
                cycle.getService().getName(),
                cycle.getStartdate(),
                cycle.getEndDate(),
                cycle.getStatus(),
                cycle.getNote()
        )).toList();
    }

    public CycleNoteDTO updateCycleNote(int cycleId, String note) {
        Cycle cycle = cycleRepository.findById(cycleId);
        cycle.setNote(note);
        return new CycleNoteDTO(cycle.getNote());
    }
}
