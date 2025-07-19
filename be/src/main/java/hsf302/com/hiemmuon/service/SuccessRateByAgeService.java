package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.createDto.CreateSuccessRateByAgeDTO;
import hsf302.com.hiemmuon.dto.responseDto.SuccessRateByAgeDTO;
import hsf302.com.hiemmuon.dto.updateDto.UpdateSuccessRateByAgeDTO;
import hsf302.com.hiemmuon.entity.SuccessRateByAge;
import hsf302.com.hiemmuon.entity.TreatmentService;
import hsf302.com.hiemmuon.repository.SuccessRateByAgeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SuccessRateByAgeService {

    @Autowired
    private SuccessRateByAgeRepository repository;

    public SuccessRateByAgeDTO create(CreateSuccessRateByAgeDTO dto) {
        TreatmentService treatmentService = new TreatmentService();
        treatmentService.setServiceId(dto.getTreatmentServiceId());

        SuccessRateByAge rate = new SuccessRateByAge();
        rate.setAgeGroup(dto.getAgeGroup());
        rate.setClinicalPregnancyRate(dto.getClinicalPregnancyRate());
        rate.setComparedToNationalAverage(dto.getComparedToNationalAverage());
        rate.setTreatmentService(treatmentService);
        repository.save(rate);
        return new SuccessRateByAgeDTO(
                dto.getAgeGroup(),
                dto.getClinicalPregnancyRate(),
                dto.getComparedToNationalAverage(),
                dto.getTreatmentServiceId()

        );
    }

    public SuccessRateByAgeDTO update(Long id, UpdateSuccessRateByAgeDTO dto) {
        SuccessRateByAge existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy tỷ lệ thành công!"));
        existing.setAgeGroup(dto.getAgeGroup());
        existing.setClinicalPregnancyRate(dto.getClinicalPregnancyRate());
        existing.setComparedToNationalAverage(dto.getComparedToNationalAverage());
        repository.save(existing);
        return new SuccessRateByAgeDTO(
                dto.getAgeGroup(),
                dto.getClinicalPregnancyRate(),
                dto.getComparedToNationalAverage()
        );
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public List<SuccessRateByAgeDTO> getAllByServiceId(int serviceId) {
        List<SuccessRateByAge> success = repository.findByTreatmentService_ServiceId(serviceId);
        return success.stream()
                .map(rate -> new SuccessRateByAgeDTO(
                        rate.getId(),
                        rate.getAgeGroup(),
                        rate.getClinicalPregnancyRate(),
                        rate.getComparedToNationalAverage(),
                        rate.getTreatmentService().getServiceId()))
                .toList();

    }

    public SuccessRateByAgeDTO getById(Long id) {
        SuccessRateByAge success = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bản ghi tỷ lệ thành công!"));

        return new SuccessRateByAgeDTO(
                success.getId(),
                success.getAgeGroup(),
                success.getClinicalPregnancyRate(),
                success.getComparedToNationalAverage(),
                success.getTreatmentService().getServiceId()
        );
    }
}
