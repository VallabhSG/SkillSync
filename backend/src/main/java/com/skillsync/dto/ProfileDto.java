package com.skillsync.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDto {
    private Long id;
    private Long userId;
    private String fullName;
    private String educationLevel;
    private String careerGoal;
    private String interests;
    private Integer yearsOfExperience;
    private Set<String> skills; // Skill names
}
