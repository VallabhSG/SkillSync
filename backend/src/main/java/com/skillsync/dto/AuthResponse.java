package com.skillsync.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String type = "Bearer";
    private Long userId;
    private String username;
    private String email;
    private String role;
    private boolean emailVerified;

    public AuthResponse(String token, Long userId, String username, String email, String role, boolean emailVerified) {
        this.token = token;
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.role = role;
        this.emailVerified = emailVerified;
    }
}
