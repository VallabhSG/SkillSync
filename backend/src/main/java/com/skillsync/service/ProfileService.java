package com.skillsync.service;

import com.skillsync.dto.ProfileDto;
import com.skillsync.exception.ApiException;
import com.skillsync.model.Skill;
import com.skillsync.model.User;
import com.skillsync.model.UserProfile;
import com.skillsync.repository.SkillRepository;
import com.skillsync.repository.UserProfileRepository;
import com.skillsync.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProfileService {

    @Autowired
    private UserProfileRepository profileRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Transactional
    public ProfileDto createOrUpdateProfile(Long userId, ProfileDto profileDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "User not found"));

        UserProfile profile = profileRepository.findByUserId(userId)
                .orElse(new UserProfile());

        profile.setUser(user);
        profile.setFullName(profileDto.getFullName());
        profile.setEducationLevel(profileDto.getEducationLevel());
        profile.setCareerGoal(profileDto.getCareerGoal());
        profile.setInterests(profileDto.getInterests());
        profile.setYearsOfExperience(profileDto.getYearsOfExperience());

        // Handle skills
        if (profileDto.getSkills() != null && !profileDto.getSkills().isEmpty()) {
            Set<Skill> skills = new HashSet<>();
            for (String skillName : profileDto.getSkills()) {
                Skill skill = skillRepository.findByName(skillName)
                        .orElseGet(() -> {
                            Skill newSkill = new Skill();
                            newSkill.setName(skillName);
                            newSkill.setCategory("General");
                            return skillRepository.save(newSkill);
                        });
                skills.add(skill);
            }
            profile.setSkills(skills);
        }

        UserProfile savedProfile = profileRepository.save(profile);
        return convertToDto(savedProfile);
    }

    public ProfileDto getProfileByUserId(Long userId) {
        UserProfile profile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Profile not found"));
        return convertToDto(profile);
    }

    private ProfileDto convertToDto(UserProfile profile) {
        ProfileDto dto = new ProfileDto();
        dto.setId(profile.getId());
        dto.setUserId(profile.getUser().getId());
        dto.setFullName(profile.getFullName());
        dto.setEducationLevel(profile.getEducationLevel());
        dto.setCareerGoal(profile.getCareerGoal());
        dto.setInterests(profile.getInterests());
        dto.setYearsOfExperience(profile.getYearsOfExperience());

        if (profile.getSkills() != null) {
            dto.setSkills(profile.getSkills().stream()
                    .map(Skill::getName)
                    .collect(Collectors.toSet()));
        }

        return dto;
    }
}
