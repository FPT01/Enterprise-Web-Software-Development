package com.fpt.etutoring.service.impl;

import com.fpt.etutoring.dao.impl.MessageDao;
import com.fpt.etutoring.dao.impl.StudentDao;
import com.fpt.etutoring.entity.impl.Message;
import com.fpt.etutoring.entity.impl.Student;
import com.fpt.etutoring.export.pojo.StudentExcel;
import com.fpt.etutoring.export.pojo.StudentExcel2;
import com.fpt.etutoring.service.StudentService;
import com.fpt.etutoring.util.RoleName;
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
    @Autowired
    private MessageDao messageDao;

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
        List<Student> sevenDays = new ArrayList<>();
        List<Message> messages = messageDao.getStudentsSevenToTwentyEight1(from, to, RoleName.STUDENT.getValue());
        if (!CollectionUtils.isEmpty(messages)) {
            messages.forEach(m -> {
                Student st = studentDao.findStudentByUserId(m.getSender().getId());
                if (st != null)
                    sevenDays.add(st);
            });
        }
        // 28 days
        List<Student> students2 = new ArrayList<>();
        List<Message> messages2 = messageDao.getStudentsSevenToTwentyEight2(to, RoleName.STUDENT.getValue());
        if (!CollectionUtils.isEmpty(messages2)) {
            messages2.forEach(m-> {
                Student st = studentDao.findStudentByUserId(m.getSender().getId());
                if (st != null)
                    students2.add(st);
            });
        }
        List<StudentExcel2> students = getStudentExcels(sevenDays, true);
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
