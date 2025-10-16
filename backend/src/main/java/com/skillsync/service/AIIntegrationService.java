package com.skillsync.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AIIntegrationService {

    @Value("${openai.api.key:your-api-key-here}")
    private String openaiApiKey;

    @Value("${openai.api.url:https://api.openai.com/v1/chat/completions}")
    private String openaiApiUrl;

    @Value("${openai.model:gpt-3.5-turbo}")
    private String model;

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    public AIIntegrationService(WebClient.Builder webClientBuilder, ObjectMapper objectMapper) {
        this.webClient = webClientBuilder.build();
        this.objectMapper = objectMapper;
    }

    public Map<String, Object> generateCareerRecommendations(String prompt) {
        try {
            // If API key is not configured, return mock data
            if (openaiApiKey.equals("your-api-key-here") || openaiApiKey.isEmpty()) {
                return generateMockRecommendations();
            }

            // Prepare request body
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", model);
            requestBody.put("messages", List.of(
                    Map.of("role", "user", "content", prompt)
            ));
            requestBody.put("temperature", 0.7);
            requestBody.put("max_tokens", 1000);

            // Call OpenAI API
            String response = webClient.post()
                    .uri(openaiApiUrl)
                    .header("Authorization", "Bearer " + openaiApiKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            // Parse response
            JsonNode rootNode = objectMapper.readTree(response);
            String content = rootNode.path("choices").get(0).path("message").path("content").asText();

            // Try to parse as JSON
            return objectMapper.readValue(content, Map.class);

        } catch (Exception e) {
            System.err.println("Error calling AI API: " + e.getMessage());
            // Return mock data as fallback
            return generateMockRecommendations();
        }
    }

    private Map<String, Object> generateMockRecommendations() {
        Map<String, Object> recommendations = new HashMap<>();

        List<String> roles = new ArrayList<>();
        roles.add("Backend Developer");
        roles.add("Full Stack Developer");
        roles.add("Software Engineer");
        recommendations.put("recommendedRoles", roles);

        List<String> missingSkills = new ArrayList<>();
        missingSkills.add("Spring Boot");
        missingSkills.add("REST API Design");
        missingSkills.add("Docker");
        missingSkills.add("Cloud Platforms (AWS/Azure)");
        recommendations.put("missingSkills", missingSkills);

        List<String> courses = new ArrayList<>();
        courses.add("Spring Boot Masterclass - Udemy");
        courses.add("Docker for Java Developers - Coursera");
        courses.add("AWS Certified Developer Course - A Cloud Guru");
        recommendations.put("recommendedCourses", courses);

        List<String> projects = new ArrayList<>();
        projects.add("Build a RESTful API for a Library Management System");
        projects.add("Create a Microservices-based E-commerce Platform with Docker");
        recommendations.put("projectIdeas", projects);

        recommendations.put("insights",
                "Based on your current skills, you have a solid foundation in programming. " +
                "To advance your career as a Backend/Full Stack Developer, focus on mastering " +
                "Spring Boot framework, containerization with Docker, and cloud deployment. " +
                "Building real-world projects will significantly boost your portfolio and job prospects.");

        return recommendations;
    }
}
