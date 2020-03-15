package com.fpt.etutoring.service.impl;

import com.fpt.etutoring.dao.impl.StudentDao;
import com.fpt.etutoring.dao.impl.UserDao;
import com.fpt.etutoring.entity.impl.Student;
import com.fpt.etutoring.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {
    @Autowired
    private StudentDao studentDao;
    @Autowired
    private UserDao userDao;

    @Override
    public List<Student> list() {
        return studentDao.findAll();
    }

    @Override
    public Student createOrUpdate(Student json) {
        return studentDao.save(json);
    }

    @Override
    public void delete(Long id) {
       studentDao.deleteById(id);
    }

    @Override
    public Student findById(Long id) {
        return studentDao.findById(id).get();
    }
}
