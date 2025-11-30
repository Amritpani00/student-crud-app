package com.example.studentcrud.config;

import com.example.studentcrud.entity.Student;
import com.example.studentcrud.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public void run(String... args) throws Exception {
        // Check if database is empty
        if (studentRepository.count() == 0) {
            // Add sample students
            Student student1 = new Student();
            student1.setFirstName("John");
            student1.setLastName("Doe");
            student1.setEmail("john.doe@example.com");
            studentRepository.save(student1);

            Student student2 = new Student();
            student2.setFirstName("Jane");
            student2.setLastName("Smith");
            student2.setEmail("jane.smith@example.com");
            studentRepository.save(student2);

            Student student3 = new Student();
            student3.setFirstName("Michael");
            student3.setLastName("Johnson");
            student3.setEmail("michael.johnson@example.com");
            studentRepository.save(student3);

            System.out.println("Sample data initialized successfully!");
        }
    }
}
