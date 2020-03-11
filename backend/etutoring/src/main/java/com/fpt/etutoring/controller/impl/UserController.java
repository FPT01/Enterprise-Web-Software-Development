package com.fpt.etutoring.controller.impl;


import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.dto.RequestDTO;
import com.fpt.etutoring.dto.ResponseDTO;
import com.fpt.etutoring.dto.impl.RoleDTO;
import com.fpt.etutoring.dto.impl.UserDTO;
import com.fpt.etutoring.entity.impl.Role;
import com.fpt.etutoring.entity.impl.User;
import com.fpt.etutoring.service.UserService;
import com.fpt.etutoring.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(Constant.PATH_USER)
public class UserController implements BaseController<UserDTO, Long> {
//    @Autowired
//    private SecurityService securityService;

    @Autowired
    private UserService userService;


    @PostMapping(Constant.PATH_LOGIN)
    public ResponseEntity<UserDTO> login(@RequestDTO(UserDTO.class) User user) {
//        return securityService.autoLogin(user.getUsername(), user.getPassword());
        User u = userService.getUserByUsernameAndPassword(user.getUsername(), user.getPassword());
        if (u != null) {
            UserDTO userDTO = getUserWithRole(u);
            userDTO.setPassword(null);
            return new ResponseEntity<UserDTO>(userDTO, HttpStatus.OK);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.add("Custom-Header", "username or password is invalid ");
        return new ResponseEntity<>(null, headers, HttpStatus.BAD_REQUEST);
    }

    private UserDTO getUserWithRole(User u) {
        Role role = u.getRole();
        RoleDTO roleDTO = ResponseDTO.accepted().getObject(role, RoleDTO.class);
        roleDTO.setUsers(null);
        UserDTO userDTO = ResponseDTO.accepted().getObject(u, UserDTO.class);
        userDTO.setRoleDTO(roleDTO);
        return userDTO;
    }

    @Override
    @GetMapping(Constant.PATH)
    public List<UserDTO> list() {
        List<User> users = userService.list();
        List<UserDTO> dtos = new ArrayList<>();
        if (!CollectionUtils.isEmpty(users)) {
            users.forEach(u -> {
                UserDTO dto = getUserWithRole(u);
                dtos.add(dto);
            });
        }
        return dtos;
    }

    @Override
    @PostMapping(value = Constant.PATH_SAVE, consumes = "application/json", produces = "application/json")
    public UserDTO createOrUpdate(@RequestBody UserDTO json) {
        User from = ResponseDTO.accepted().getObject(json, User.class);
        User u = userService.createOrUpdate(from);
        return getUserWithRole(u);
    }

    @Override
    @DeleteMapping(value = Constant.PATH_DELETE, consumes = "application/json", produces = "application/json")
    public void delete(@PathVariable Long id) {
        User user = userService.findById(id);
        if (user != null) {
            user.setEnabled(Short.valueOf("0"));
            userService.createOrUpdate(user);
        }
    }

    @Override
    @GetMapping(value = Constant.PATH_FIND_BY_ID, consumes = "application/json", produces = "application/json")
    public UserDTO findById(@PathVariable Long id) {
        User u = userService.findById(id);
        return getUserWithRole(u);
    }
}
