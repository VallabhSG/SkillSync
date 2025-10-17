package com.skillsync.controller;

import com.skillsync.repository.UserRepository;
import com.skillsync.repository.VerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VerificationTokenRepository verificationTokenRepository;

    /**
     * TEMPORARY ENDPOINT - Delete user by email
     * DELETE THIS AFTER TESTING!
     */
    @DeleteMapping("/delete-user/{email}")
    public ResponseEntity<?> deleteUserByEmail(@PathVariable String email) {
        try {
            userRepository.findByEmail(email).ifPresent(user -> {
                // Tokens are auto-deleted due to CASCADE
                userRepository.delete(user);
            });

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "User deleted successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of(
                "success", false,
                "message", "Error: " + e.getMessage()
            ));
        }
    }

    /**
     * TEMPORARY ENDPOINT - Clear all users
     * DELETE THIS AFTER TESTING!
     */
    @DeleteMapping("/clear-all-users")
    public ResponseEntity<?> clearAllUsers() {
        try {
            verificationTokenRepository.deleteAll();
            userRepository.deleteAll();

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "All users cleared successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of(
                "success", false,
                "message", "Error: " + e.getMessage()
            ));
        }
    }
}
