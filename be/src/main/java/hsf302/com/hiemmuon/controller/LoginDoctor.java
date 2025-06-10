//package hsf302.com.hiemmuon.controller;
//
//import hsf302.com.hiemmuon.pojo.Doctor;
//import hsf302.com.hiemmuon.pojo.User;
//import hsf302.com.hiemmuon.service.DoctorServiceImpl;
//import hsf302.com.hiemmuon.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.*;
//import jakarta.servlet.http.HttpSession;
//
//import java.util.Optional;
//
//@Controller
//public class LoginDoctor {
//
//    @Autowired
//    private DoctorServiceImpl doctorService;
//
//    @Autowired
//    private UserService userService;
//
//    @RequestMapping(value = "/loginDoctor", method = RequestMethod.GET)
//    public String getLoginDoctor() {
//        return "loginForDoctor";
//    }
//
//    @RequestMapping(value = "/loginForDoctor", method = RequestMethod.POST)
//    public String loginDoctor(@RequestParam String email,
//                              @RequestParam String password, Model model,
//                              HttpSession session) {
//
//
//        if (!userService.isValidUser(email, password)) {
//            model.addAttribute("error", "Sai email hoặc mật khẩu!");
//            return "loginForDoctor";
//        }
//
//        User user = userService.getUserByEmail(email);
//
//        Optional<Doctor> doctor = doctorService.getDoctorByUserId(user.getUserId());
//        if (!doctor.isPresent()) {
//            model.addAttribute("error", "Tài khoản này không phải bác sĩ!");
//            return "loginForDoctor";
//        }
//
//        model.addAttribute("doctor", doctor);
//        model.addAttribute("email", user.getEmail());
//
//        session.setAttribute("loggedInDoctor", doctor.get());
//
//        return "redirect:/doctors";
//    }
//}
