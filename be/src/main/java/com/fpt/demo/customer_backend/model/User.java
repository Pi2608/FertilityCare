package com.fpt.demo.customer_backend.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;


    private LocalDate create_at;
    private LocalDate dob;
    private String email;
    private String gender;
    private String name;
    private String password_hash;
    private String phone;
    private LocalDate update_at;

    private Integer role_id;

    public User() {
    }

    public User(Long user_id, LocalDate create_at, LocalDate dob, String email, String gender, String name, String password_hash, String phone, LocalDate update_at, Integer role_id) {
        this.user_id = user_id;
        this.create_at = create_at;
        this.dob = dob;
        this.email = email;
        this.gender = gender;
        this.name = name;
        this.password_hash = password_hash;
        this.phone = phone;
        this.update_at = update_at;
        this.role_id = role_id;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public LocalDate getCreate_at() {
        return create_at;
    }

    public void setCreate_at(LocalDate create_at) {
        this.create_at = create_at;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword_hash() {
        return password_hash;
    }

    public void setPassword_hash(String password_hash) {
        this.password_hash = password_hash;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public LocalDate getUpdate_at() {
        return update_at;
    }

    public void setUpdate_at(LocalDate update_at) {
        this.update_at = update_at;
    }

    public Integer getRole_id() {
        return role_id;
    }

    public void setRole_id(Integer role_id) {
        this.role_id = role_id;
    }

}
