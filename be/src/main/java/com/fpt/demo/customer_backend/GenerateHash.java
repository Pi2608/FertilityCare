package com.fpt.demo.customer_backend;

import org.mindrot.jbcrypt.BCrypt;

public class GenerateHash {
    public static void main(String[] args) {
        String password = "123"; // Mật khẩu plaintext bạn muốn dùng
        String hashed = BCrypt.hashpw(password, BCrypt.gensalt());
        System.out.println("Hashed password: " + hashed);
    }
}