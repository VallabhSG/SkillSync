package com.skillsync.service;

import com.skillsync.config.JwtTokenProvider;
import com.skillsync.dto.AuthRequest;
import com.skillsync.dto.AuthResponse;
import com.skillsync.dto.UserDto;
import com.skillsync.exception.ApiException;
import com.skillsync.model.Role;
import com.skillsync.model.User;
import com.skillsync.model.VerificationToken;
import com.skillsync.repository.UserRepository;
import com.skillsync.repository.VerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private VerificationTokenRepository verificationTokenRepository;

    @Autowired
    private EmailService emailService;

    @Transactional
    public AuthResponse register(UserDto userDto) {
        // Check if username already exists
        if (userRepository.existsByUsername(userDto.getUsername())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Username is already taken");
        }

        // Check if email already exists
        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Email is already in use");
        }

        // Create new user
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setRole(Role.USER);
        user.setEnabled(true);
        user.setEmailVerified(false); // Email not verified yet

        User savedUser = userRepository.save(user);

        // Generate verification token
        String verificationToken = UUID.randomUUID().toString();
        VerificationToken token = new VerificationToken(verificationToken, savedUser);
        verificationTokenRepository.save(token);

        // Send verification email
        try {
            emailService.sendVerificationEmail(
                    savedUser.getEmail(),
                    savedUser.getUsername(),
                    verificationToken
            );
        } catch (Exception e) {
            System.err.println("Failed to send verification email: " + e.getMessage());
            // Continue with registration even if email fails
        }

        // Generate JWT token (user can still login but should see verification prompt)
        String jwtToken = tokenProvider.generateTokenFromUsername(savedUser.getUsername());

        return new AuthResponse(
                jwtToken,
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getEmail(),
                savedUser.getRole().name(),
                savedUser.isEmailVerified()
        );
    }

    /**
     * Verify email with token
     */
    @Transactional
    public void verifyEmail(String token) {
        VerificationToken verificationToken = verificationTokenRepository.findByToken(token)
                .orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Invalid verification token"));

        if (verificationToken.isUsed()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Token has already been used");
        }

        if (verificationToken.isExpired()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Token has expired. Please request a new verification email");
        }

        User user = verificationToken.getUser();
        user.setEmailVerified(true);
        userRepository.save(user);

        verificationToken.setUsed(true);
        verificationTokenRepository.save(verificationToken);

        // Send welcome email
        try {
            emailService.sendWelcomeEmail(user.getEmail(), user.getUsername());
        } catch (Exception e) {
            System.err.println("Failed to send welcome email: " + e.getMessage());
        }
    }

    /**
     * Resend verification email
     */
    @Transactional
    public void resendVerificationEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "User not found"));

        if (user.isEmailVerified()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Email is already verified");
        }

        // Delete old tokens
        verificationTokenRepository.findByUser(user).ifPresent(oldToken -> {
            verificationTokenRepository.delete(oldToken);
        });

        // Generate new token
        String verificationToken = UUID.randomUUID().toString();
        VerificationToken token = new VerificationToken(verificationToken, user);
        verificationTokenRepository.save(token);

        // Send email
        emailService.sendVerificationEmail(user.getEmail(), user.getUsername(), verificationToken);
    }

    public AuthResponse login(AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.getUsername(),
                        authRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.generateToken(authentication);

        User user = userRepository.findByUsername(authRequest.getUsername())
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "User not found"));

        return new AuthResponse(
                token,
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().name(),
                user.isEmailVerified()
        );
    }
}
