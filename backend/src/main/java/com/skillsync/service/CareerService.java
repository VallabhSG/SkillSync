package com.skillsync.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillsync.dto.CareerRecommendationDto;
import com.skillsync.exception.ApiException;
import com.skillsync.model.CareerRecommendation;
import com.skillsync.model.User;
import com.skillsync.model.UserProfile;
import com.skillsync.repository.CareerRecommendationRepository;
import com.skillsync.repository.UserProfileRepository;
import com.skillsync.repository.UserRepository;
import com.skillsync.util.PromptBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CareerService {

    @Autowired
    private CareerRecommendationRepository recommendationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserProfileRepository profileRepository;

    @Autowired
    private AIIntegrationService aiIntegrationService;

    @Autowired
    private ObjectMapper objectMapper;

    @Transactional
    public CareerRecommendationDto generateRecommendation(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "User not found"));

        UserProfile profile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND,
                        "User profile not found. Please create a profile first."));

        // Build AI prompt
        String prompt = PromptBuilder.buildCareerRecommendationPrompt(profile);

        // Get AI recommendations
        Map<String, Object> aiResponse = aiIntegrationService.generateCareerRecommendations(prompt);

        // Create and save recommendation
        CareerRecommendation recommendation = new CareerRecommendation();
        recommendation.setUser(user);

        try {
            recommendation.setRecommendedRoles(objectMapper.writeValueAsString(aiResponse.get("recommendedRoles")));
            recommendation.setMissingSkills(objectMapper.writeValueAsString(aiResponse.get("missingSkills")));
            recommendation.setRecommendedCourses(objectMapper.writeValueAsString(aiResponse.get("recommendedCourses")));
            recommendation.setProjectIdeas(objectMapper.writeValueAsString(aiResponse.get("projectIdeas")));
            recommendation.setAiInsights((String) aiResponse.get("insights"));
            recommendation.setConfidenceScore(0.85); // Default confidence
        } catch (JsonProcessingException e) {
            throw new ApiException(HttpStatus.INTERNAL_SERVER_ERROR, "Error processing AI response");
        }

        CareerRecommendation saved = recommendationRepository.save(recommendation);
        return convertToDto(saved);
    }

    public CareerRecommendationDto getLatestRecommendation(Long userId) {
        CareerRecommendation recommendation = recommendationRepository
                .findFirstByUserIdOrderByCreatedAtDesc(userId);

        if (recommendation == null) {
            throw new ApiException(HttpStatus.NOT_FOUND, "No recommendations found. Generate one first.");
        }

        return convertToDto(recommendation);
    }

    public List<CareerRecommendationDto> getAllRecommendations(Long userId) {
        List<CareerRecommendation> recommendations = recommendationRepository
                .findByUserIdOrderByCreatedAtDesc(userId);

        return recommendations.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private CareerRecommendationDto convertToDto(CareerRecommendation recommendation) {
        CareerRecommendationDto dto = new CareerRecommendationDto();
        dto.setId(recommendation.getId());
        dto.setUserId(recommendation.getUser().getId());
        dto.setAiInsights(recommendation.getAiInsights());
        dto.setConfidenceScore(recommendation.getConfidenceScore());
        dto.setCreatedAt(recommendation.getCreatedAt());

        try {
            dto.setRecommendedRoles(objectMapper.readValue(recommendation.getRecommendedRoles(), List.class));
            dto.setMissingSkills(objectMapper.readValue(recommendation.getMissingSkills(), List.class));
            dto.setRecommendedCourses(objectMapper.readValue(recommendation.getRecommendedCourses(), List.class));
            dto.setProjectIdeas(objectMapper.readValue(recommendation.getProjectIdeas(), List.class));
        } catch (JsonProcessingException e) {
            throw new ApiException(HttpStatus.INTERNAL_SERVER_ERROR, "Error parsing recommendation data");
        }

        return dto;
    }
}
