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
                return generateMockRecommendations(prompt);
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
            return generateMockRecommendations(prompt);
        }
    }

    /**
     * Generate mock recommendations based on the prompt content
     * This analyzes the user's skills and interests from the prompt
     */
    private Map<String, Object> generateMockRecommendations(String prompt) {
        Map<String, Object> recommendations = new HashMap<>();

        // Analyze prompt to determine user's domain
        String lowerPrompt = prompt.toLowerCase();

        // Determine career path based on skills and interests
        boolean isUIUX = lowerPrompt.contains("ui") || lowerPrompt.contains("ux") ||
                         lowerPrompt.contains("design") || lowerPrompt.contains("figma") ||
                         lowerPrompt.contains("user interface") || lowerPrompt.contains("user experience");

        boolean isFrontend = lowerPrompt.contains("react") || lowerPrompt.contains("javascript") ||
                            lowerPrompt.contains("css") || lowerPrompt.contains("html") ||
                            lowerPrompt.contains("frontend") || lowerPrompt.contains("web design");

        boolean isBackend = lowerPrompt.contains("java") || lowerPrompt.contains("spring") ||
                           lowerPrompt.contains("backend") || lowerPrompt.contains("api") ||
                           lowerPrompt.contains("database");

        boolean isDataScience = lowerPrompt.contains("data") || lowerPrompt.contains("python") ||
                               lowerPrompt.contains("analytics") || lowerPrompt.contains("machine learning");

        boolean isDevOps = lowerPrompt.contains("devops") || lowerPrompt.contains("docker") ||
                          lowerPrompt.contains("kubernetes") || lowerPrompt.contains("cloud");

        List<String> roles = new ArrayList<>();
        List<String> missingSkills = new ArrayList<>();
        List<String> courses = new ArrayList<>();
        List<String> projects = new ArrayList<>();
        String insights = "";

        if (isUIUX) {
            // UI/UX Designer Path
            roles.add("UI/UX Designer");
            roles.add("Product Designer");
            roles.add("Interaction Designer");

            missingSkills.add("Advanced Figma Prototyping");
            missingSkills.add("User Research Methods");
            missingSkills.add("Design Systems");
            missingSkills.add("Usability Testing");

            courses.add("Google UX Design Professional Certificate - Coursera");
            courses.add("UI/UX Design Specialization - Coursera");
            courses.add("Advanced Figma: Design Systems - Udemy");

            projects.add("Design a complete mobile app with user research and testing");
            projects.add("Create a design system for a SaaS product");

            insights = "As a UI/UX designer, you have a great foundation in design principles. " +
                      "Focus on expanding your user research skills, learn advanced prototyping techniques, " +
                      "and build a strong portfolio showcasing your design process from research to final designs. " +
                      "Understanding basic HTML/CSS can also help you collaborate better with developers.";

        } else if (isFrontend) {
            // Frontend Developer Path
            roles.add("Frontend Developer");
            roles.add("React Developer");
            roles.add("UI Developer");

            missingSkills.add("TypeScript");
            missingSkills.add("Next.js");
            missingSkills.add("State Management (Redux/Zustand)");
            missingSkills.add("Testing (Jest, React Testing Library)");

            courses.add("React - The Complete Guide - Udemy");
            courses.add("TypeScript for React Developers - Udemy");
            courses.add("Next.js & React - The Complete Guide - Udemy");

            projects.add("Build a responsive e-commerce site with React and TypeScript");
            projects.add("Create a real-time chat application with WebSockets");

            insights = "With your frontend skills, you're well-positioned for modern web development roles. " +
                      "Master TypeScript and a modern framework like Next.js to stay competitive. " +
                      "Focus on performance optimization, accessibility, and testing to become a senior developer.";

        } else if (isDataScience) {
            // Data Science Path
            roles.add("Data Analyst");
            roles.add("Data Scientist");
            roles.add("Machine Learning Engineer");

            missingSkills.add("Advanced Python (Pandas, NumPy)");
            missingSkills.add("Machine Learning Algorithms");
            missingSkills.add("SQL and Database Design");
            missingSkills.add("Data Visualization (Tableau, Power BI)");

            courses.add("Machine Learning Specialization - Coursera");
            courses.add("Python for Data Science - Udemy");
            courses.add("SQL for Data Analysis - Coursera");

            projects.add("Build a predictive model for customer churn");
            projects.add("Create an interactive dashboard for sales analytics");

            insights = "Data science is a rapidly growing field with excellent opportunities. " +
                      "Strengthen your statistical knowledge, master Python libraries, and build a portfolio " +
                      "of data projects showcasing your analytical and visualization skills.";

        } else if (isDevOps) {
            // DevOps Path
            roles.add("DevOps Engineer");
            roles.add("Cloud Engineer");
            roles.add("Site Reliability Engineer");

            missingSkills.add("Kubernetes");
            missingSkills.add("CI/CD Pipelines");
            missingSkills.add("Infrastructure as Code (Terraform)");
            missingSkills.add("Monitoring and Logging");

            courses.add("Docker Mastery - Udemy");
            courses.add("Kubernetes for Beginners - Udemy");
            courses.add("AWS Certified Solutions Architect - Udemy");

            projects.add("Set up a complete CI/CD pipeline for a microservices app");
            projects.add("Deploy a scalable application on Kubernetes");

            insights = "DevOps engineers are in high demand. Focus on mastering containerization, " +
                      "cloud platforms, and automation. Get hands-on experience with real deployments " +
                      "and consider getting AWS or Azure certifications.";

        } else if (isBackend) {
            // Backend Developer Path (default)
            roles.add("Backend Developer");
            roles.add("Java Developer");
            roles.add("API Developer");

            missingSkills.add("Spring Boot");
            missingSkills.add("REST API Design");
            missingSkills.add("Microservices Architecture");
            missingSkills.add("Database Optimization");

            courses.add("Spring Boot Masterclass - Udemy");
            courses.add("RESTful Web Services - Udemy");
            courses.add("SQL for Data Science - Coursera");

            projects.add("Build a RESTful API for a Library Management System");
            projects.add("Create a Microservices-based E-commerce Platform");

            insights = "Backend development offers stable career opportunities. Master Spring Boot, " +
                      "understand microservices architecture, and learn database optimization. " +
                      "Building scalable APIs and understanding cloud deployment will make you highly valuable.";
        } else {
            // Generic Full Stack Path
            roles.add("Full Stack Developer");
            roles.add("Software Engineer");
            roles.add("Web Developer");

            missingSkills.add("Modern Frontend Framework (React/Vue)");
            missingSkills.add("Backend Framework (Spring Boot/Node.js)");
            missingSkills.add("Database Management");
            missingSkills.add("Version Control (Git)");

            courses.add("Full Stack Web Development - Coursera");
            courses.add("React - The Complete Guide - Udemy");
            courses.add("Node.js - The Complete Guide - Udemy");

            projects.add("Build a full-stack social media application");
            projects.add("Create a task management system with real-time updates");

            insights = "As a full stack developer, you can work on both frontend and backend. " +
                      "Focus on mastering one stack deeply (like MERN or Spring Boot + React), " +
                      "then expand your knowledge. Build complete applications to showcase your skills.";
        }

        recommendations.put("recommendedRoles", roles);
        recommendations.put("missingSkills", missingSkills);
        recommendations.put("recommendedCourses", courses);
        recommendations.put("projectIdeas", projects);
        recommendations.put("insights", insights);

        return recommendations;
    }
}
