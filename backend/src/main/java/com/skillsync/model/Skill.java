package com.skillsync.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "skills")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @Column(length = 500)
    private String description;

    @Column(name = "category")
    private String category; // e.g., "Programming", "Database", "Framework", "Soft Skills"

    @Column(name = "difficulty_level")
    private String difficultyLevel; // e.g., "Beginner", "Intermediate", "Advanced"
}
