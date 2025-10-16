package com.skillsync.controller;

import com.skillsync.dto.CareerRecommendationDto;
import com.skillsync.service.CareerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/career")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CareerController {

    @Autowired
    private CareerService careerService;

    @PostMapping("/recommendations/{userId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<CareerRecommendationDto> generateRecommendation(@PathVariable Long userId) {
        CareerRecommendationDto recommendation = careerService.generateRecommendation(userId);
        return ResponseEntity.ok(recommendation);
    }

    @GetMapping("/recommendations/{userId}/latest")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<CareerRecommendationDto> getLatestRecommendation(@PathVariable Long userId) {
        CareerRecommendationDto recommendation = careerService.getLatestRecommendation(userId);
        return ResponseEntity.ok(recommendation);
    }

    @GetMapping("/recommendations/{userId}/all")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<CareerRecommendationDto>> getAllRecommendations(@PathVariable Long userId) {
        List<CareerRecommendationDto> recommendations = careerService.getAllRecommendations(userId);
        return ResponseEntity.ok(recommendations);
    }
}
