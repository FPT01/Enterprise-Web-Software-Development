package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.controller.ResponseController;
import com.fpt.etutoring.dto.ResponseDTO;
import com.fpt.etutoring.dto.impl.RoleDTO;
import com.fpt.etutoring.dto.impl.StudentDTO;
import com.fpt.etutoring.entity.impl.Role;
import com.fpt.etutoring.entity.impl.Student;
import com.fpt.etutoring.entity.impl.User;
import com.fpt.etutoring.error.ApiMessage;
import com.fpt.etutoring.service.RoleService;
import com.fpt.etutoring.service.StudentService;
import com.fpt.etutoring.service.UserService;
import com.fpt.etutoring.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(Constant.PATH_STUDENT)
@CrossOrigin
public class StudentController extends ResponseController implements BaseController<StudentDTO, Long> {

    @Autowired
    private StudentService studentService;
    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;

    @Override
    @GetMapping(Constant.PATH)
    public List<StudentDTO> list() {
        List<Student> students = studentService.list();
        List<StudentDTO> studentDTOS = new ArrayList<>();
        if (!CollectionUtils.isEmpty(students)) {
            students.forEach(s -> {
                StudentDTO studentDTO = ResponseDTO.accepted().getObject(s, StudentDTO.class);
                if (studentDTO.getUser().getRole() != null) {
                    RoleDTO roleDTO = ResponseDTO.accepted().getObject(studentDTO.getUser().getRole(), RoleDTO.class);
                    roleDTO.setUsers(null);
                    studentDTO.getUser().setRoleDTO(roleDTO);
                    studentDTO.getUser().setRole(null);
                }
                studentDTOS.add(studentDTO);
            });
        }
        return studentDTOS;
    }

    @Override
    @PostMapping(value = Constant.PATH_SAVE, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> createOrUpdate(@RequestBody StudentDTO json) {
        try {
            Student from = ResponseDTO.accepted().getObject(json, Student.class);
            if (json.getUser() != null) {
                User newUser = ResponseDTO.accepted().getObject(json.getUser(), User.class);
                Role newRole = roleService.findById(json.getUser().getRoleDTO().getId());
                newRole.setUsers(null);
                newUser.setRole(newRole);
                User user = userService.createOrUpdate(newUser);
                from.setUser(user);
            }
            studentService.createOrUpdate(from);
            return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
        } catch (Exception ex) {
            if (json.getId() == null)
                return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, Constant.ERROR_INSERT));
            else
                return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, Constant.ERROR_UPDATE));
        }
    }

    @Override
    @DeleteMapping(value = Constant.PATH_DELETE, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            studentService.delete(id);
        } catch (Exception ex) {
            return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, ex));
        }
        return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
    }

    @Override
    @GetMapping(value = Constant.PATH_FIND_BY_ID, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Student student = studentService.findById(id);
        if (student == null)
            return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, Constant.ERROR_NOT_FOUND));
        return ResponseEntity.status(HttpStatus.OK).body(ResponseDTO.accepted().getObject(student, StudentDTO.class));
    }

    @Override
    public ResponseEntity<?> buildResponseEntity(ApiMessage apiMessage) {
        return new ResponseEntity<>(apiMessage, apiMessage.getStatus());
    }
}
