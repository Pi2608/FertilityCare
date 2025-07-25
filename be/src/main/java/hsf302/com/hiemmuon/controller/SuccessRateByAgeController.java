package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.createDto.CreateSuccessRateByAgeDTO;
import hsf302.com.hiemmuon.dto.responseDto.SuccessRateByAgeDTO;
import hsf302.com.hiemmuon.dto.updateDto.UpdateSuccessRateByAgeDTO;
import hsf302.com.hiemmuon.entity.SuccessRateByAge;
import hsf302.com.hiemmuon.service.SuccessRateByAgeService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "10. Success Rate Controller")
@RestController
@RequestMapping("/api/success-rates")
public class SuccessRateByAgeController {

    @Autowired
    private SuccessRateByAgeService service;

    @PostMapping
    public SuccessRateByAgeDTO create(@RequestBody CreateSuccessRateByAgeDTO rate) {
        return service.create(rate);
    }

    @PutMapping("/{id}")
    public SuccessRateByAgeDTO update(@PathVariable Long id, @RequestBody UpdateSuccessRateByAgeDTO dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/service/{serviceId}")
    public List<SuccessRateByAgeDTO> getByServiceId(@PathVariable int serviceId) {
        return service.getAllByServiceId(serviceId);
    }

    @GetMapping("/{id}")
    public SuccessRateByAgeDTO getById(@PathVariable Long id) {
        return service.getById(id);
    }
}
