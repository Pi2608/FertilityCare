package hsf302.com.hiemmuon.dto.createDto;

import hsf302.com.hiemmuon.enums.Genders;

import java.time.LocalDate;

public class CreateManagerRequest {
    private String name;
    private String email;
    private String password;
    private String phone;
    private Genders gender;
    private LocalDate dob;

    public CreateManagerRequest(String name, String email, String password, String phone, Genders gender, LocalDate dob) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.gender = gender;
        this.dob = dob;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Genders getGender() {
        return gender;
    }

    public void setGender(Genders gender) {
        this.gender = gender;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }
}
