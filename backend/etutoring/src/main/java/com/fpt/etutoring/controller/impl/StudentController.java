package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.dto.impl.StudentDTO;
import com.fpt.etutoring.util.Constant;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(Constant.PATH_STUDENT)
@CrossOrigin
public class StudentController implements BaseController<StudentDTO, Long> {

    @Override
    public List<StudentDTO> list() {
        return null;
    }

    @Override
    public StudentDTO createOrUpdate(StudentDTO json) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public StudentDTO findById(Long id) {
        return null;
    }
}
