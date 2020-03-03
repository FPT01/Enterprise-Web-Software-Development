package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.dto.ResponseDTO;
import com.fpt.etutoring.dto.impl.StudentDTO;
import com.fpt.etutoring.entity.impl.Student;
import com.fpt.etutoring.service.StudentService;
import com.fpt.etutoring.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(Constant.PATH_STUDENT)
@CrossOrigin
public class StudentController implements BaseController<StudentDTO, Long> {

    @Autowired
    private StudentService studentService;

    @Override
    @GetMapping(Constant.PATH)
    public List<StudentDTO> list() {
        List<Student> students = studentService.list();
        List<StudentDTO> studentDTOS = new ArrayList<>();
        if (!CollectionUtils.isEmpty(students)) {
            students.forEach(s -> {
                StudentDTO studentDTO = ResponseDTO.accepted().getObject(s, StudentDTO.class);
                studentDTOS.add(studentDTO);
            });
        }
        return studentDTOS;
    }

    @Override
    @PostMapping(value = Constant.PATH_SAVE, consumes = "application/json", produces = "application/json")
    public StudentDTO createOrUpdate(@RequestBody StudentDTO json) {
        Student from = ResponseDTO.accepted().getObject(json, Student.class);
        Student student = studentService.createOrUpdate(from);
        return ResponseDTO.accepted().getObject(student, StudentDTO.class);
    }

    @Override
    @DeleteMapping(value = Constant.PATH_DELETE, consumes = "application/json", produces = "application/json")
    public void delete(@PathVariable Long id) {
        studentService.delete(id);
    }

    @Override
    @GetMapping(value = Constant.PATH_FIND_BY_ID, consumes = "application/json", produces = "application/json")
    public StudentDTO findById(@PathVariable Long id) {
        Student student = studentService.findById(id);
        return ResponseDTO.accepted().getObject(student, StudentDTO.class);
    }
}
