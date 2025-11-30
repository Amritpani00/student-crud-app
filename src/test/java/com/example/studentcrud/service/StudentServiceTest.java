package com.example.studentcrud.service;

import com.example.studentcrud.dto.StudentDTO;
import com.example.studentcrud.entity.Student;
import com.example.studentcrud.exception.ResourceNotFoundException;
import com.example.studentcrud.exception.ValidationException;
import com.example.studentcrud.repository.StudentRepository;
import com.example.studentcrud.service.impl.StudentServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class StudentServiceTest {

    @InjectMocks
    StudentServiceImpl studentService;

    @Mock
    StudentRepository studentRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllStudents_ShouldReturnListOfStudents() {
        Student student1 = createStudent(1L, "John", "Doe", "john.doe@example.com");
        Student student2 = createStudent(2L, "Jane", "Smith", "jane.smith@example.com");
        List<Student> students = Arrays.asList(student1, student2);

        when(studentRepository.findAll()).thenReturn(students);

        List<StudentDTO> result = studentService.getAllStudents();

        assertEquals(2, result.size());
        assertEquals("John", result.get(0).getFirstName());
        assertEquals("Jane", result.get(1).getFirstName());
        verify(studentRepository, times(1)).findAll();
    }

    @Test
    void getStudentById_WhenStudentExists_ShouldReturnStudent() {
        Student student = createStudent(1L, "John", "Doe", "john.doe@example.com");

        when(studentRepository.findById(1L)).thenReturn(Optional.of(student));

        StudentDTO result = studentService.getStudentById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("John", result.getFirstName());
        verify(studentRepository, times(1)).findById(1L);
    }

    @Test
    void getStudentById_WhenStudentNotExists_ShouldThrowException() {
        when(studentRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            studentService.getStudentById(1L);
        });

        verify(studentRepository, times(1)).findById(1L);
    }

    @Test
    void createStudent_WithValidData_ShouldCreateStudent() {
        StudentDTO studentDTO = new StudentDTO(null, "John", "Doe", "john.doe@example.com");
        Student savedStudent = createStudent(1L, "John", "Doe", "john.doe@example.com");

        when(studentRepository.save(any(Student.class))).thenReturn(savedStudent);

        StudentDTO result = studentService.createStudent(studentDTO);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("John", result.getFirstName());
        verify(studentRepository, times(1)).save(any(Student.class));
    }

    @Test
    void createStudent_WithEmptyFirstName_ShouldThrowValidationException() {
        StudentDTO studentDTO = new StudentDTO(null, "", "Doe", "john.doe@example.com");

        assertThrows(ValidationException.class, () -> {
            studentService.createStudent(studentDTO);
        });

        verify(studentRepository, never()).save(any(Student.class));
    }

    @Test
    void createStudent_WithEmptyLastName_ShouldThrowValidationException() {
        StudentDTO studentDTO = new StudentDTO(null, "John", "", "john.doe@example.com");

        assertThrows(ValidationException.class, () -> {
            studentService.createStudent(studentDTO);
        });

        verify(studentRepository, never()).save(any(Student.class));
    }

    @Test
    void createStudent_WithInvalidEmail_ShouldThrowValidationException() {
        StudentDTO studentDTO = new StudentDTO(null, "John", "Doe", "invalid-email");

        assertThrows(ValidationException.class, () -> {
            studentService.createStudent(studentDTO);
        });

        verify(studentRepository, never()).save(any(Student.class));
    }

    @Test
    void updateStudent_WhenStudentExists_ShouldUpdateStudent() {
        Student existingStudent = createStudent(1L, "John", "Doe", "john.doe@example.com");
        StudentDTO updateDTO = new StudentDTO(null, "Jane", "Smith", "jane.smith@example.com");
        Student updatedStudent = createStudent(1L, "Jane", "Smith", "jane.smith@example.com");

        when(studentRepository.findById(1L)).thenReturn(Optional.of(existingStudent));
        when(studentRepository.save(any(Student.class))).thenReturn(updatedStudent);

        StudentDTO result = studentService.updateStudent(1L, updateDTO);

        assertNotNull(result);
        assertEquals("Jane", result.getFirstName());
        assertEquals("jane.smith@example.com", result.getEmail());
        verify(studentRepository, times(1)).findById(1L);
        verify(studentRepository, times(1)).save(any(Student.class));
    }

    @Test
    void updateStudent_WhenStudentNotExists_ShouldThrowException() {
        StudentDTO updateDTO = new StudentDTO(null, "Jane", "Smith", "jane.smith@example.com");

        when(studentRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            studentService.updateStudent(1L, updateDTO);
        });

        verify(studentRepository, times(1)).findById(1L);
        verify(studentRepository, never()).save(any(Student.class));
    }

    @Test
    void deleteStudent_WhenStudentExists_ShouldDeleteStudent() {
        when(studentRepository.existsById(1L)).thenReturn(true);
        doNothing().when(studentRepository).deleteById(1L);

        studentService.deleteStudent(1L);

        verify(studentRepository, times(1)).existsById(1L);
        verify(studentRepository, times(1)).deleteById(1L);
    }

    @Test
    void deleteStudent_WhenStudentNotExists_ShouldThrowException() {
        when(studentRepository.existsById(1L)).thenReturn(false);

        assertThrows(ResourceNotFoundException.class, () -> {
            studentService.deleteStudent(1L);
        });

        verify(studentRepository, times(1)).existsById(1L);
        verify(studentRepository, never()).deleteById(1L);
    }

    private Student createStudent(Long id, String firstName, String lastName, String email) {
        Student student = new Student();
        student.setId(id);
        student.setFirstName(firstName);
        student.setLastName(lastName);
        student.setEmail(email);
        return student;
    }
}
