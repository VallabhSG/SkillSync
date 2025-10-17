package com.skillsync.config;

import com.skillsync.model.AuthProvider;
import com.skillsync.model.Role;
import com.skillsync.model.User;
import com.skillsync.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.Optional;

@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Value("${app.frontend.url:http://localhost:5173}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User oAuth2User = oauthToken.getPrincipal();

        // Extract user information from OAuth2
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String providerId = oAuth2User.getAttribute("sub"); // Google's user ID
        String provider = oauthToken.getAuthorizedClientRegistrationId(); // "google"

        // Find or create user
        User user = findOrCreateUser(email, name, providerId, provider);

        // Generate JWT token
        String jwtToken = tokenProvider.generateTokenFromUsername(user.getUsername());

        // Redirect to frontend with token
        String targetUrl = UriComponentsBuilder.fromUriString(frontendUrl + "/oauth2/redirect")
                .queryParam("token", jwtToken)
                .queryParam("userId", user.getId())
                .queryParam("username", user.getUsername())
                .queryParam("email", user.getEmail())
                .queryParam("role", user.getRole().name())
                .build().toUriString();

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    private User findOrCreateUser(String email, String name, String providerId, String provider) {
        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isPresent()) {
            // User exists, update if needed
            User user = existingUser.get();

            // Update auth provider if it was local before
            if (user.getAuthProvider() == AuthProvider.LOCAL) {
                user.setAuthProvider(AuthProvider.valueOf(provider.toUpperCase()));
                user.setProviderId(providerId);
                user.setEmailVerified(true); // OAuth emails are verified
                userRepository.save(user);
            }

            return user;
        } else {
            // Create new user
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setUsername(generateUsername(email, name));
            newUser.setPassword(""); // No password for OAuth users
            newUser.setRole(Role.USER);
            newUser.setEnabled(true);
            newUser.setEmailVerified(true); // OAuth emails are verified
            newUser.setAuthProvider(AuthProvider.valueOf(provider.toUpperCase()));
            newUser.setProviderId(providerId);

            return userRepository.save(newUser);
        }
    }

    private String generateUsername(String email, String name) {
        // Try to use name first, fallback to email prefix
        String baseUsername = (name != null && !name.isEmpty())
                ? name.toLowerCase().replaceAll("\\s+", "")
                : email.split("@")[0];

        // Remove non-alphanumeric characters
        baseUsername = baseUsername.replaceAll("[^a-zA-Z0-9]", "");

        // Check if username exists
        String username = baseUsername;
        int counter = 1;
        while (userRepository.existsByUsername(username)) {
            username = baseUsername + counter;
            counter++;
        }

        return username;
    }
}
