package com.skillsync.repository;

import com.skillsync.model.CareerRecommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CareerRecommendationRepository extends JpaRepository<CareerRecommendation, Long> {
    List<CareerRecommendation> findByUserIdOrderByCreatedAtDesc(Long userId);
    CareerRecommendation findFirstByUserIdOrderByCreatedAtDesc(Long userId);
}
