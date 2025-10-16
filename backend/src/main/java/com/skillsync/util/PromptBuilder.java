package com.skillsync.util;

import com.skillsync.model.UserProfile;

import java.util.stream.Collectors;

public class PromptBuilder {

    public static String buildCareerRecommendationPrompt(UserProfile profile) {
        StringBuilder prompt = new StringBuilder();

        prompt.append("You are a career advisor AI. Based on the following user profile, provide career recommendations.\n\n");
        prompt.append("User Profile:\n");
        prompt.append("- Education Level: ").append(profile.getEducationLevel() != null ? profile.getEducationLevel() : "Not specified").append("\n");
        prompt.append("- Years of Experience: ").append(profile.getYearsOfExperience() != null ? profile.getYearsOfExperience() : "Not specified").append("\n");
        prompt.append("- Career Goal: ").append(profile.getCareerGoal() != null ? profile.getCareerGoal() : "Not specified").append("\n");
        prompt.append("- Interests: ").append(profile.getInterests() != null ? profile.getInterests() : "Not specified").append("\n");

        if (profile.getSkills() != null && !profile.getSkills().isEmpty()) {
            String skills = profile.getSkills().stream()
                    .map(skill -> skill.getName())
                    .collect(Collectors.joining(", "));
            prompt.append("- Current Skills: ").append(skills).append("\n");
        } else {
            prompt.append("- Current Skills: None specified\n");
        }

        prompt.append("\nPlease provide the following in a structured JSON format:\n");
        prompt.append("1. Three recommended job roles that match their profile\n");
        prompt.append("2. Key missing skills they should learn for those roles\n");
        prompt.append("3. Three recommended courses to bridge the skill gap\n");
        prompt.append("4. Two project ideas they can work on to build their portfolio\n");
        prompt.append("5. Brief career insights and advice\n\n");
        prompt.append("Format your response as a JSON object with these keys: recommendedRoles (array), missingSkills (array), recommendedCourses (array), projectIdeas (array), insights (string)");

        return prompt.toString();
    }
}
