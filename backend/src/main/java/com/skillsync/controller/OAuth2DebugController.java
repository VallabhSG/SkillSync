package com.skillsync.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.client.OAuth2ClientProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/oauth2")
@CrossOrigin(origins = "*")
public class OAuth2DebugController {

    @Autowired(required = false)
    private OAuth2ClientProperties oAuth2ClientProperties;

    @GetMapping("/debug")
    public ResponseEntity<?> debugOAuth2(HttpServletRequest request) {
        Map<String, Object> info = new HashMap<>();

        // Get base URL
        String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
        info.put("baseUrl", baseUrl);
        info.put("scheme", request.getScheme());
        info.put("serverName", request.getServerName());
        info.put("serverPort", request.getServerPort());
        info.put("contextPath", request.getContextPath());

        // Get headers
        Map<String, String> headers = new HashMap<>();
        headers.put("X-Forwarded-Proto", request.getHeader("X-Forwarded-Proto"));
        headers.put("X-Forwarded-Host", request.getHeader("X-Forwarded-Host"));
        headers.put("X-Forwarded-For", request.getHeader("X-Forwarded-For"));
        headers.put("Host", request.getHeader("Host"));
        info.put("headers", headers);

        // Expected redirect URI
        String expectedRedirectUri = baseUrl + "/login/oauth2/code/google";
        info.put("expectedRedirectUri", expectedRedirectUri);

        // OAuth2 config
        if (oAuth2ClientProperties != null && oAuth2ClientProperties.getRegistration() != null) {
            var googleReg = oAuth2ClientProperties.getRegistration().get("google");
            if (googleReg != null) {
                info.put("configuredRedirectUri", googleReg.getRedirectUri());
                info.put("clientIdConfigured", googleReg.getClientId() != null && !googleReg.getClientId().isEmpty());
            }
        }

        return ResponseEntity.ok(info);
    }
}
