package com.skillsync.controller;

import com.skillsync.dto.ProfileDto;
import com.skillsync.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @PostMapping("/user/{userId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ProfileDto> createOrUpdateProfile(
            @PathVariable Long userId,
            @RequestBody ProfileDto profileDto) {
        ProfileDto created = profileService.createOrUpdateProfile(userId, profileDto);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ProfileDto> getProfileByUserId(@PathVariable Long userId) {
        ProfileDto profile = profileService.getProfileByUserId(userId);
        return ResponseEntity.ok(profile);
    }
}
