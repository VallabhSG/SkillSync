package com.skillsync.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "career_recommendations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CareerRecommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "recommended_roles", length = 1000)
    private String recommendedRoles; // JSON array as string

    @Column(name = "missing_skills", length = 1000)
    private String missingSkills; // JSON array as string

    @Column(name = "recommended_courses", length = 2000)
    private String recommendedCourses; // JSON array as string

    @Column(name = "project_ideas", length = 2000)
    private String projectIdeas; // JSON array as string

    @Column(name = "ai_insights", length = 2000)
    private String aiInsights; // Additional AI-generated insights

    @Column(name = "confidence_score")
    private Double confidenceScore; // AI confidence level (0.0 to 1.0)

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
