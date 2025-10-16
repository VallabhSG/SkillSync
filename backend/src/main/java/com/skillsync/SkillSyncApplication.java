package com.skillsync;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.client.WebClient;

@SpringBootApplication
public class SkillSyncApplication {

    public static void main(String[] args) {
        SpringApplication.run(SkillSyncApplication.class, args);
        System.out.println("\n========================================");
        System.out.println("✓ SkillSync Application Started Successfully!");
        System.out.println("✓ Server running on: http://localhost:8080");
        System.out.println("✓ H2 Console: http://localhost:8080/h2-console");
        System.out.println("✓ API Base URL: http://localhost:8080/api");
        System.out.println("========================================\n");
    }

    @Bean
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }
}
