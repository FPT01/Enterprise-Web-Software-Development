package com.fpt.etutoring.service;

import com.fpt.etutoring.entity.impl.Student;

import java.util.List;

public interface StudentService {
    List<Student> list();
    Student createOrUpdate(Student json);
    void delete(Long id);
    Student findById(Long id);
}
