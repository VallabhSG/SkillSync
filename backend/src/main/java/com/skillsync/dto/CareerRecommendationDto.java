package com.skillsync.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CareerRecommendationDto {
    private Long id;
    private Long userId;
    private List<String> recommendedRoles;
    private List<String> missingSkills;
    private List<String> recommendedCourses;
    private List<String> projectIdeas;
    private String aiInsights;
    private Double confidenceScore;
    private LocalDateTime createdAt;
}
