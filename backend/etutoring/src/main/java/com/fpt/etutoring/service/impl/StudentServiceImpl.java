package com.fpt.etutoring.service.impl;

import com.fpt.etutoring.dao.impl.StudentDao;
import com.fpt.etutoring.entity.impl.Student;
import com.fpt.etutoring.export.pojo.StudentExcel;
import com.fpt.etutoring.export.pojo.StudentExcel2;
import com.fpt.etutoring.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {
    @Autowired
    private StudentDao studentDao;

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

    @Override
    public List<StudentExcel> findStudentsWithoutTutor() {
        return getStudentExcels(studentDao.findStudentsWithoutTutor());
    }

    @Override
    public List<StudentExcel2> getStudentsSevenToTwentyEight(Date from, Date to) {
        // 7 days
        List<Student> students1 = studentDao.getStudentsSevenToTwentyEight1(from);
        students1.addAll(studentDao.findStudentsWithoutTutor());
        // 28 days
        List<Student> students2 = studentDao.getStudentsSevenToTwentyEight2(to);
        List<StudentExcel2> students = getStudentExcels(students1, true);
        students.addAll(getStudentExcels(students2, false));
        return students;
    }

    @Override
    public void saveAll(List<Student> students) {
        studentDao.saveAll(students);
    }

    @Override
    public List<Student> findByMeetingId(Long id) {
        return null;
    }

    private List<StudentExcel> getStudentExcels(List<Student> students) {
        List<StudentExcel> studentExcels = new ArrayList<>();
        if (!CollectionUtils.isEmpty(students)) {
            students.forEach(s -> {
                StudentExcel studentExcel = new StudentExcel();
                studentExcel.setId(s.getId());
                studentExcel.setFullname(s.getUser().getFullname());
                studentExcel.setUsername(s.getUser().getUsername());
                studentExcels.add(studentExcel);
            });
        }
        return studentExcels;
    }

    private List<StudentExcel2> getStudentExcels(List<Student> students, Boolean isSeven) {
        List<StudentExcel2> studentExcels = new ArrayList<>();
        if (!CollectionUtils.isEmpty(students)) {
            students.forEach(s -> {
                StudentExcel2 studentExcel = new StudentExcel2();
                studentExcel.setId(s.getId());
                studentExcel.setFullname(s.getUser().getFullname());
                studentExcel.setUsername(s.getUser().getUsername());
                if (isSeven)
                    studentExcel.setSevenDays("Yes");
                else
                    studentExcel.setTwentyEightDays("Yes");
                studentExcels.add(studentExcel);
            });
        }
        return studentExcels;
    }
}
