package com.skillsync.controller;

import com.skillsync.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/verification")
@CrossOrigin(origins = "*")
public class VerificationController {

    @Autowired
    private AuthService authService;

    /**
     * Verify email with token
     * GET /api/verification/verify?token={token}
     */
    @GetMapping("/verify")
    public ResponseEntity<?> verifyEmail(@RequestParam String token) {
        authService.verifyEmail(token);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Email verified successfully! You can now access all features."
        ));
    }

    /**
     * Resend verification email
     * POST /api/verification/resend
     * Body: { "email": "user@example.com" }
     */
    @PostMapping("/resend")
    public ResponseEntity<?> resendVerificationEmail(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        authService.resendVerificationEmail(email);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Verification email has been sent. Please check your inbox."
        ));
    }
}
