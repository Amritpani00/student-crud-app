package com.example.studentcrud.controller;

import com.example.studentcrud.dto.StudentDTO;
import com.example.studentcrud.service.StudentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

class StudentControllerTest {

    @InjectMocks
    StudentController studentController;

    @Mock
    StudentService studentService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllStudents() {
        StudentDTO student1 = new StudentDTO(1L, "John", "Doe", "john.doe@example.com");
        StudentDTO student2 = new StudentDTO(2L, "Jane", "Smith", "jane.smith@example.com");
        List<StudentDTO> students = Arrays.asList(student1, student2);

        when(studentService.getAllStudents()).thenReturn(students);

        ResponseEntity<List<StudentDTO>> response = studentController.getAllStudents();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(2, response.getBody().size());
        assertEquals("John", response.getBody().get(0).getFirstName());
        verify(studentService, times(1)).getAllStudents();
    }

    @Test
    void getStudentById() {
        StudentDTO student = new StudentDTO(1L, "John", "Doe", "john.doe@example.com");

        when(studentService.getStudentById(1L)).thenReturn(student);

        ResponseEntity<StudentDTO> response = studentController.getStudentById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("John", response.getBody().getFirstName());
        assertEquals("john.doe@example.com", response.getBody().getEmail());
        verify(studentService, times(1)).getStudentById(1L);
    }

    @Test
    void createStudent() {
        StudentDTO studentDTO = new StudentDTO(null, "John", "Doe", "john.doe@example.com");
        StudentDTO createdStudent = new StudentDTO(1L, "John", "Doe", "john.doe@example.com");

        when(studentService.createStudent(studentDTO)).thenReturn(createdStudent);

        ResponseEntity<StudentDTO> response = studentController.createStudent(studentDTO);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(1L, response.getBody().getId());
        assertEquals("John", response.getBody().getFirstName());
        verify(studentService, times(1)).createStudent(studentDTO);
    }

    @Test
    void updateStudent() {
        StudentDTO studentDTO = new StudentDTO(null, "Jane", "Doe", "jane.doe@example.com");
        StudentDTO updatedStudent = new StudentDTO(1L, "Jane", "Doe", "jane.doe@example.com");

        when(studentService.updateStudent(1L, studentDTO)).thenReturn(updatedStudent);

        ResponseEntity<StudentDTO> response = studentController.updateStudent(1L, studentDTO);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Jane", response.getBody().getFirstName());
        assertEquals("jane.doe@example.com", response.getBody().getEmail());
        verify(studentService, times(1)).updateStudent(1L, studentDTO);
    }

    @Test
    void deleteStudent() {
        doNothing().when(studentService).deleteStudent(1L);

        ResponseEntity<Void> response = studentController.deleteStudent(1L);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(studentService, times(1)).deleteStudent(1L);
    }
}
