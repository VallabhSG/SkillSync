package com.skillsync.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "project_ideas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectIdea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    @Column(name = "difficulty_level")
    private String difficultyLevel;

    @Column(name = "required_skills", length = 500)
    private String requiredSkills; // Comma-separated skill names

    @Column(name = "estimated_time")
    private String estimatedTime;

    private String category;

    @Column(name = "github_url")
    private String githubUrl;

    @Column(name = "upvote_count")
    private Integer upvoteCount = 0;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
