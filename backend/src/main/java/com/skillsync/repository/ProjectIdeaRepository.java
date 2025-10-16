package com.skillsync.repository;

import com.skillsync.model.ProjectIdea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectIdeaRepository extends JpaRepository<ProjectIdea, Long> {
    List<ProjectIdea> findByCategory(String category);
    List<ProjectIdea> findByDifficultyLevel(String difficultyLevel);
    List<ProjectIdea> findAllByOrderByUpvoteCountDesc();
}
