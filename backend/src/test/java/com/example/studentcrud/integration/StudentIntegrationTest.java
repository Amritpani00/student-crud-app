package com.example.studentcrud.integration;

import com.example.studentcrud.entity.Student;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class StudentIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void testCreateAndGetStudent() {
        Student student = new Student();
        student.setFirstName("John");
        student.setLastName("Doe");
        student.setEmail("john.doe@example.com");

        ResponseEntity<Student> createResponse = restTemplate.postForEntity("/api/students", student, Student.class);
        assertEquals(HttpStatus.OK, createResponse.getStatusCode());
        Student createdStudent = createResponse.getBody();
        assertEquals("John", createdStudent.getFirstName());

        ResponseEntity<Student> getResponse = restTemplate.getForEntity("/api/students/" + createdStudent.getId(), Student.class);
        assertEquals(HttpStatus.OK, getResponse.getStatusCode());
        assertEquals("John", getResponse.getBody().getFirstName());
    }
}
