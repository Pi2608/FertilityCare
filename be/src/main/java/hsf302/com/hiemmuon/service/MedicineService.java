package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.entity.Medicine;
import hsf302.com.hiemmuon.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }
}