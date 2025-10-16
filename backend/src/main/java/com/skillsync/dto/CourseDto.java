package com.skillsync.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseDto {
    private Long id;
    private String title;
    private String description;
    private String provider;
    private String courseUrl;
    private String difficultyLevel;
    private String category;
    private String estimatedDuration;
    private Double rating;
    private Boolean isFree;
}
