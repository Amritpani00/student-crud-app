package com.example.studentcrud.service.impl;

import com.example.studentcrud.dto.StudentDTO;
import com.example.studentcrud.entity.Student;
import com.example.studentcrud.exception.ResourceNotFoundException;
import com.example.studentcrud.exception.ValidationException;
import com.example.studentcrud.repository.StudentRepository;
import com.example.studentcrud.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public List<StudentDTO> getAllStudents() {
        return studentRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public StudentDTO getStudentById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
        return convertToDTO(student);
    }

    @Override
    public StudentDTO createStudent(StudentDTO studentDTO) {
        validateStudent(studentDTO);
        Student student = convertToEntity(studentDTO);
        Student savedStudent = studentRepository.save(student);
        return convertToDTO(savedStudent);
    }

    @Override
    public StudentDTO updateStudent(Long id, StudentDTO studentDTO) {
        validateStudent(studentDTO);
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
        
        student.setFirstName(studentDTO.getFirstName());
        student.setLastName(studentDTO.getLastName());
        student.setEmail(studentDTO.getEmail());
        
        Student updatedStudent = studentRepository.save(student);
        return convertToDTO(updatedStudent);
    }

    @Override
    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Student not found with id: " + id);
        }
        studentRepository.deleteById(id);
    }

    private void validateStudent(StudentDTO studentDTO) {
        if (studentDTO.getFirstName() == null || studentDTO.getFirstName().trim().isEmpty()) {
            throw new ValidationException("First name is required");
        }
        if (studentDTO.getLastName() == null || studentDTO.getLastName().trim().isEmpty()) {
            throw new ValidationException("Last name is required");
        }
        if (studentDTO.getEmail() == null || studentDTO.getEmail().trim().isEmpty()) {
            throw new ValidationException("Email is required");
        }
        if (!studentDTO.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new ValidationException("Invalid email format");
        }
    }

    private StudentDTO convertToDTO(Student student) {
        return new StudentDTO(
                student.getId(),
                student.getFirstName(),
                student.getLastName(),
                student.getEmail()
        );
    }

    private Student convertToEntity(StudentDTO studentDTO) {
        Student student = new Student();
        student.setFirstName(studentDTO.getFirstName());
        student.setLastName(studentDTO.getLastName());
        student.setEmail(studentDTO.getEmail());
        return student;
    }
}
