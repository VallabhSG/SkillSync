package com.skillsync.controller;

import com.skillsync.dto.CourseDto;
import com.skillsync.dto.SkillDto;
import com.skillsync.model.Skill;
import com.skillsync.repository.SkillRepository;
import com.skillsync.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private CourseService courseService;

    @Autowired
    private SkillRepository skillRepository;

    @PostMapping("/courses")
    public ResponseEntity<CourseDto> createCourse(@RequestBody CourseDto courseDto) {
        CourseDto created = courseService.createCourse(courseDto);
        return ResponseEntity.ok(created);
    }

    @PostMapping("/skills")
    public ResponseEntity<SkillDto> createSkill(@RequestBody SkillDto skillDto) {
        Skill skill = new Skill();
        skill.setName(skillDto.getName());
        skill.setDescription(skillDto.getDescription());
        skill.setCategory(skillDto.getCategory());
        skill.setDifficultyLevel(skillDto.getDifficultyLevel());

        Skill saved = skillRepository.save(skill);

        SkillDto response = new SkillDto();
        response.setId(saved.getId());
        response.setName(saved.getName());
        response.setDescription(saved.getDescription());
        response.setCategory(saved.getCategory());
        response.setDifficultyLevel(saved.getDifficultyLevel());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/skills")
    public ResponseEntity<List<SkillDto>> getAllSkills() {
        List<SkillDto> skills = skillRepository.findAll().stream()
                .map(skill -> {
                    SkillDto dto = new SkillDto();
                    dto.setId(skill.getId());
                    dto.setName(skill.getName());
                    dto.setDescription(skill.getDescription());
                    dto.setCategory(skill.getCategory());
                    dto.setDifficultyLevel(skill.getDifficultyLevel());
                    return dto;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(skills);
    }
}
