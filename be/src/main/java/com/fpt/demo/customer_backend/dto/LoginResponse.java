package com.fpt.demo.customer_backend.dto;

import com.fpt.demo.customer_backend.model.User;

public class LoginResponse {
    private String message;
    private String token;
    private User user;

    public LoginResponse(String message, String token, User user) {
        this.message = message;
        this.token = token;
        this.user = user;
    }

    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }


}
