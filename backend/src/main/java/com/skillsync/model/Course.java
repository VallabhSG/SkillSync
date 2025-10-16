package com.skillsync.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "courses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    private String provider; // e.g., "Udemy", "Coursera", "YouTube"

    @Column(name = "course_url", length = 500)
    private String courseUrl;

    @Column(name = "difficulty_level")
    private String difficultyLevel;

    private String category;

    @Column(name = "estimated_duration")
    private String estimatedDuration; // e.g., "4 weeks", "10 hours"

    private Double rating;

    @Column(name = "is_free")
    private Boolean isFree = false;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
