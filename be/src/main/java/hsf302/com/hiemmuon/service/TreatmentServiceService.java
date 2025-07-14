package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.service.CreateTreatmentServiceDTO;
import hsf302.com.hiemmuon.dto.service.UpdateServiceDTO;
import hsf302.com.hiemmuon.entity.TreatmentService;
import hsf302.com.hiemmuon.repository.TreatmentServiceRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Service
public class TreatmentServiceService {

    @Autowired
    private TreatmentServiceRepository treatmentServiceRepository;

    public List<TreatmentService> findAll() {
        return treatmentServiceRepository.findAll();
    }

    public TreatmentService createTreatmentService(CreateTreatmentServiceDTO treatmentServiceDTO) {

        if (treatmentServiceRepository.findByName(treatmentServiceDTO.getName()) != null) {
            throw new IllegalArgumentException("Dịch vụ với tên này đã tồn tại");
        }

        TreatmentService treatmentService = new TreatmentService();
        treatmentService.setName(treatmentServiceDTO.getName());
        treatmentService.setPrice(treatmentServiceDTO.getPrice());
        treatmentService.setDescription(treatmentServiceDTO.getDescription());
        treatmentService.setSuccessRate(treatmentServiceDTO.getSuccessRate());
        treatmentService.setSpecifications(treatmentServiceDTO.getSpecifications());
        treatmentService.setTargetPatient(treatmentServiceDTO.getTargetPatient());
        treatmentService.setFaq(treatmentServiceDTO.getFaq());
        treatmentService.setActive(true);

        return treatmentServiceRepository.save(treatmentService);
    }


    public TreatmentService updateTreatmentService(
            @RequestParam int id,
            @Valid @RequestBody UpdateServiceDTO updateServiceDTO) {

        TreatmentService service = treatmentServiceRepository.findById(id);
        if (service == null) {
            throw new IllegalArgumentException("Không tìm thấy dịch vụ với ID: " + id);
        }

        if (updateServiceDTO.getName() != null) {
            service.setName(updateServiceDTO.getName());
        }

        if (updateServiceDTO.getPrice() != null) {
            service.setPrice(updateServiceDTO.getPrice());
        }

        if (updateServiceDTO.getDescription() != null) {
            service.setDescription(updateServiceDTO.getDescription());
        }

        if (updateServiceDTO.getSuccessRate() != null) {
            service.setSuccessRate(updateServiceDTO.getSuccessRate());
        }

        if (updateServiceDTO.getSpecifications() != null) {
            service.setSpecifications(updateServiceDTO.getSpecifications());
        }

        if (updateServiceDTO.getTargetPatient() != null) {
            service.setTargetPatient(updateServiceDTO.getTargetPatient());
        }

        if (updateServiceDTO.getFaq() != null) {
            service.setFaq(updateServiceDTO.getFaq());
        }

        return treatmentServiceRepository.save(service);
    }


    public TreatmentService updateServiceActive(
            @RequestParam int id,
            boolean active) {

        TreatmentService service = treatmentServiceRepository.findById(id);
        service.setActive(active);
        return treatmentServiceRepository.save(service);
    }

    public TreatmentService getServiceById(int id) {
        return treatmentServiceRepository.findById(id);
    }
    public TreatmentService getServiceByName(String name) {
        return treatmentServiceRepository.findByName(name);
    }
    public List<TreatmentService> getServiceByStatus() {
        return treatmentServiceRepository.findByIsActive(true);
    }
}