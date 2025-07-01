package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.createDto.CreateFeedbackDTO;
import hsf302.com.hiemmuon.dto.createDto.UpdateFeedbackDTO;
import hsf302.com.hiemmuon.dto.responseDto.FeedbackViewDTO;
import hsf302.com.hiemmuon.entity.Customer;
import hsf302.com.hiemmuon.entity.Doctor;
import hsf302.com.hiemmuon.entity.Feedback;
import hsf302.com.hiemmuon.repository.CustomerRepository;
import hsf302.com.hiemmuon.repository.DoctorRepository;
import hsf302.com.hiemmuon.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private CustomerRepository customerRepository;

    // CREATE

    public void createFeedback(int customerId, CreateFeedbackDTO feedbackDTO) {
        Doctor doctor = doctorRepository.findById(feedbackDTO.getDoctorId())
                .orElseThrow(()-> new RuntimeException("Khong ton tai bac si"));

        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(()-> new RuntimeException("Khong ton tai khach hang"));

        Feedback feedback = new Feedback();
        feedback.setDoctor(doctor);
        feedback.setCustomer(customer);
        feedback.setRating(feedbackDTO.getRating());
        feedback.setComment(feedbackDTO.getComment());
        feedback.setCreateAt(LocalDateTime.now());

        feedbackRepository.save(feedback);
    }

    // AVERAGE RATING
    public Double getAverageRatingForDoctorId(int doctorId){
        Double avg = feedbackRepository.getAverageRatingByDoctorId(doctorId);
        return avg == null ? 0.0 : avg;
    }

    // READ
    public List<FeedbackViewDTO> getAllFeedbacks() {
        return feedbackRepository.getAllFeedbacksView();
    }

    public List<FeedbackViewDTO> getFeedbacksByDoctor(int doctorId) {
        return feedbackRepository.getByDoctor(doctorId);
    }

    public List<FeedbackViewDTO> getFeedbacksByCustomer(int customerId) {
        return feedbackRepository.getByCustomer(customerId);
    }

    // UPDATE
    public void updateFeedback(int feedbackId, UpdateFeedbackDTO dto) {
        Feedback feedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy feedback"));

        feedback.setComment(dto.getComment());
        feedback.setRating(dto.getRating());
        feedbackRepository.save(feedback);
    }

    // DELETE
    public void deleteFeedback(int feedbackId) {
        if (!feedbackRepository.existsById(feedbackId)) {
            throw new RuntimeException("Không tìm thấy feedback");
        }
        feedbackRepository.deleteById(feedbackId);
    }


}
