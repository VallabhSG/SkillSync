package com.skillsync.repository;

import com.skillsync.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByCategory(String category);
    List<Course> findByDifficultyLevel(String difficultyLevel);
    List<Course> findByIsFree(Boolean isFree);
}
