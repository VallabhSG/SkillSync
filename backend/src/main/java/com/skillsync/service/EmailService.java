package com.skillsync.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username:noreply@skillsync.com}")
    private String fromEmail;

    @Value("${app.frontend.url:http://localhost:3000}")
    private String frontendUrl;

    /**
     * Send verification email with token
     */
    public void sendVerificationEmail(String toEmail, String username, String token) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("Verify Your SkillSync Account");

            String verificationLink = frontendUrl + "/verify-email?token=" + token;

            String htmlContent = buildVerificationEmailHtml(username, verificationLink);
            helper.setText(htmlContent, true);

            mailSender.send(message);
            System.out.println("Verification email sent to: " + toEmail);
        } catch (MessagingException e) {
            System.err.println("Failed to send verification email: " + e.getMessage());
            // In production, you might want to queue this for retry
        }
    }

    /**
     * Send welcome email after verification
     */
    public void sendWelcomeEmail(String toEmail, String username) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("Welcome to SkillSync!");

            String htmlContent = buildWelcomeEmailHtml(username);
            helper.setText(htmlContent, true);

            mailSender.send(message);
            System.out.println("Welcome email sent to: " + toEmail);
        } catch (MessagingException e) {
            System.err.println("Failed to send welcome email: " + e.getMessage());
        }
    }

    /**
     * Send password reset email
     */
    public void sendPasswordResetEmail(String toEmail, String username, String resetToken) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("Reset Your SkillSync Password");

            String resetLink = frontendUrl + "/reset-password?token=" + resetToken;

            String htmlContent = buildPasswordResetEmailHtml(username, resetLink);
            helper.setText(htmlContent, true);

            mailSender.send(message);
            System.out.println("Password reset email sent to: " + toEmail);
        } catch (MessagingException e) {
            System.err.println("Failed to send password reset email: " + e.getMessage());
        }
    }

    /**
     * Build HTML email template for verification
     */
    private String buildVerificationEmailHtml(String username, String verificationLink) {
        return """
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                    .button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                    .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🚀 Welcome to SkillSync!</h1>
                    </div>
                    <div class="content">
                        <h2>Hi %s,</h2>
                        <p>Thank you for signing up for SkillSync! We're excited to help you on your career journey.</p>
                        <p>Please verify your email address by clicking the button below:</p>
                        <p style="text-align: center;">
                            <a href="%s" class="button">Verify Email Address</a>
                        </p>
                        <p>Or copy and paste this link into your browser:</p>
                        <p style="word-break: break-all; background: #fff; padding: 10px; border-radius: 5px;">%s</p>
                        <p><strong>This link will expire in 24 hours.</strong></p>
                        <p>If you didn't create an account with SkillSync, you can safely ignore this email.</p>
                    </div>
                    <div class="footer">
                        <p>© 2024 SkillSync. All rights reserved.</p>
                        <p>AI-Powered Career Path Recommendation System</p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(username, verificationLink, verificationLink);
    }

    /**
     * Build HTML email template for welcome
     */
    private String buildWelcomeEmailHtml(String username) {
        return """
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                    .feature { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #667eea; }
                    .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🎉 Your Account is Verified!</h1>
                    </div>
                    <div class="content">
                        <h2>Welcome, %s!</h2>
                        <p>Your email has been successfully verified. You can now access all features of SkillSync:</p>

                        <div class="feature">
                            <h3>📝 Create Your Profile</h3>
                            <p>Upload your resume or manually enter your skills and experience.</p>
                        </div>

                        <div class="feature">
                            <h3>🤖 AI Career Recommendations</h3>
                            <p>Get personalized career path suggestions based on your skills.</p>
                        </div>

                        <div class="feature">
                            <h3>📚 Explore Courses</h3>
                            <p>Access 500+ curated courses from top platforms.</p>
                        </div>

                        <div class="feature">
                            <h3>🎯 Take Skill Assessments</h3>
                            <p>Test your knowledge and track your progress.</p>
                        </div>

                        <p style="text-align: center; margin-top: 30px;">
                            <a href="%s" style="display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px;">Get Started Now</a>
                        </p>
                    </div>
                    <div class="footer">
                        <p>© 2024 SkillSync. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(username, frontendUrl);
    }

    /**
     * Build HTML email template for password reset
     */
    private String buildPasswordResetEmailHtml(String username, String resetLink) {
        return """
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                    .button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                    .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 5px; }
                    .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🔒 Password Reset Request</h1>
                    </div>
                    <div class="content">
                        <h2>Hi %s,</h2>
                        <p>We received a request to reset your password. Click the button below to create a new password:</p>
                        <p style="text-align: center;">
                            <a href="%s" class="button">Reset Password</a>
                        </p>
                        <p>Or copy and paste this link into your browser:</p>
                        <p style="word-break: break-all; background: #fff; padding: 10px; border-radius: 5px;">%s</p>

                        <div class="warning">
                            <strong>⚠️ Important:</strong>
                            <ul>
                                <li>This link will expire in 1 hour</li>
                                <li>If you didn't request this, please ignore this email</li>
                                <li>Your password will remain unchanged</li>
                            </ul>
                        </div>
                    </div>
                    <div class="footer">
                        <p>© 2024 SkillSync. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(username, resetLink, resetLink);
    }
}
