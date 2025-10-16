package com.skillsync;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.web.reactive.function.client.WebClient;

@SpringBootApplication
public class SkillSyncApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(SkillSyncApplication.class, args);
        Environment env = context.getEnvironment();

        String port = env.getProperty("server.port", "8080");
        String[] activeProfiles = env.getActiveProfiles();
        String profileInfo = activeProfiles.length > 0 ? String.join(", ", activeProfiles) : "default";

        System.out.println("\n========================================");
        System.out.println("✓ SkillSync Application Started Successfully!");
        System.out.println("✓ Active Profile(s): " + profileInfo);
        System.out.println("✓ Server running on port: " + port);
        System.out.println("✓ API Base URL: http://localhost:" + port + "/api");
        System.out.println("✓ Health Check: http://localhost:" + port + "/api/health");
        System.out.println("========================================\n");
    }

    @Bean
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }
}
