package com.fpt.etutoring.service;

import com.fpt.etutoring.entity.impl.Student;
import com.fpt.etutoring.export.pojo.StudentExcel;

import java.util.Date;
import java.util.List;

public interface StudentService {
    List<Student> list();
    Student createOrUpdate(Student json);
    void delete(Long id);
    Student findById(Long id);
    List<StudentExcel> findStudentsWithoutTutor();
    List<StudentExcel> getStudentsSevenToTwentyEight(Date from, Date to);
    void saveAll(List<Student> students);
}
