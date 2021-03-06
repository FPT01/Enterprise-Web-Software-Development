package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.controller.ResponseController;
import com.fpt.etutoring.dto.ResponseDTO;
import com.fpt.etutoring.dto.impl.RoleDTO;
import com.fpt.etutoring.dto.impl.TutorDTO;
import com.fpt.etutoring.entity.impl.Role;
import com.fpt.etutoring.entity.impl.Tutor;
import com.fpt.etutoring.entity.impl.User;
import com.fpt.etutoring.error.ApiMessage;
import com.fpt.etutoring.service.RoleService;
import com.fpt.etutoring.service.TutorService;
import com.fpt.etutoring.service.UserService;
import com.fpt.etutoring.util.Constant;
import com.fpt.etutoring.util.RoleName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(Constant.PATH_TUTOR)
@CrossOrigin
public class TutorController extends ResponseController implements BaseController<TutorDTO, Long> {

    @Autowired
    private TutorService tutorService;
    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;
//    @Autowired
//    private StorageService storageService;

    @Override
    @GetMapping(Constant.PATH)
    public List<TutorDTO> list() {
        List<Tutor> tutors = tutorService.list();
        List<TutorDTO> tutorDTOS = new ArrayList<>();
        if(!CollectionUtils.isEmpty(tutors)) {
            tutors.forEach(t -> {
                TutorDTO tutorDTO = ResponseDTO.accepted().getObject(t, TutorDTO.class);
                if (tutorDTO.getUser().getRole() != null) {
                    RoleDTO roleDTO = ResponseDTO.accepted().getObject(tutorDTO.getUser().getRole(), RoleDTO.class);
                    roleDTO.setUsers(null);
                    tutorDTO.getUser().setRoleDTO(roleDTO);
                    tutorDTO.getUser().setRole(null);
                }
                tutorDTOS.add(tutorDTO);
            });
        }
        return tutorDTOS;
    }

    @Override
    @PostMapping(value = Constant.PATH_SAVE, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> createOrUpdate(@RequestBody TutorDTO json) {
        try {
            Tutor from = ResponseDTO.accepted().getObject(json, Tutor.class);
            if (json.getUser() != null) {
                User newUser = ResponseDTO.accepted().getObject(json.getUser(), User.class);
                Role newRole = roleService.findByName(RoleName.TUTOR.getValue());
                newRole.setUsers(null);
                newUser.setRole(newRole);
                User user = userService.createOrUpdate(newUser);
                from.setUser(user);
            }
            tutorService.createOrUpdate(from);
            return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
        } catch (Exception ex) {
            if (json.getId() == null)
                return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.ERROR_INSERT));
            else
                return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.ERROR_UPDATE));
        }
    }

    @Override
    @DeleteMapping(value = Constant.PATH_DELETE, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            tutorService.delete(id);
        } catch (Exception ex) {
            return buildResponseEntity(new ApiMessage(HttpStatus.OK, ex));
        }
        return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
    }

    @Override
    @GetMapping(value = Constant.PATH_FIND_BY_ID, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Tutor tutor = tutorService.findById(id);
        if (tutor == null)
            return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.ERROR_NOT_FOUND));
        return ResponseEntity.status(HttpStatus.OK).body(ResponseDTO.accepted().getObject(tutor, TutorDTO.class));
    }
}
