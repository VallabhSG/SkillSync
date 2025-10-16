package com.skillsync.service;

import com.skillsync.dto.CourseDto;
import com.skillsync.exception.ApiException;
import com.skillsync.model.Course;
import com.skillsync.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public List<CourseDto> getAllCourses() {
        return courseRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public CourseDto getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Course not found"));
        return convertToDto(course);
    }

    public List<CourseDto> getCoursesByCategory(String category) {
        return courseRepository.findByCategory(category).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public CourseDto createCourse(CourseDto courseDto) {
        Course course = new Course();
        course.setTitle(courseDto.getTitle());
        course.setDescription(courseDto.getDescription());
        course.setProvider(courseDto.getProvider());
        course.setCourseUrl(courseDto.getCourseUrl());
        course.setDifficultyLevel(courseDto.getDifficultyLevel());
        course.setCategory(courseDto.getCategory());
        course.setEstimatedDuration(courseDto.getEstimatedDuration());
        course.setRating(courseDto.getRating());
        course.setIsFree(courseDto.getIsFree());

        Course saved = courseRepository.save(course);
        return convertToDto(saved);
    }

    private CourseDto convertToDto(Course course) {
        CourseDto dto = new CourseDto();
        dto.setId(course.getId());
        dto.setTitle(course.getTitle());
        dto.setDescription(course.getDescription());
        dto.setProvider(course.getProvider());
        dto.setCourseUrl(course.getCourseUrl());
        dto.setDifficultyLevel(course.getDifficultyLevel());
        dto.setCategory(course.getCategory());
        dto.setEstimatedDuration(course.getEstimatedDuration());
        dto.setRating(course.getRating());
        dto.setIsFree(course.getIsFree());
        return dto;
    }
}
