package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.repository.MedicineScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MedicineScheduleService {

    @Autowired
    private MedicineScheduleRepository medicineScheduleRepository;


}
