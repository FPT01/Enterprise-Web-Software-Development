package com.fpt.etutoring.controller.impl;


import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.dao.impl.UserDao;
import com.fpt.etutoring.dto.RequestDTO;
import com.fpt.etutoring.dto.ResponseDTO;
import com.fpt.etutoring.dto.impl.UserDTO;
import com.fpt.etutoring.entity.impl.User;
import com.fpt.etutoring.service.SecurityService;
import com.fpt.etutoring.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(Constant.PATH_USER)
public class UserController extends BaseController<User> {
//    @Autowired
//    private SecurityService securityService;

    @Autowired
    private UserDao userDao;

    @PostMapping(Constant.PATH_LOGIN)
    public String login(@RequestDTO(UserDTO.class) User user) {
//        return securityService.autoLogin(user.getUsername(), user.getPassword());
        User u = userDao.getUserByUsernameAndPassword(user.getUsername(), user.getPassword());
        if (u != null)
            return u.getRole().getRoleName();

        return "";
    }

    @GetMapping("/getAll")
    public List<UserDTO> getAll() {
        List<User> users = super.list();
        List<UserDTO> dtos = new ArrayList<>();
        if (!CollectionUtils.isEmpty(users)) {
            users.forEach(u -> {
                UserDTO dto = ResponseDTO.accepted().getDTOObject(u, UserDTO.class);
                dtos.add(dto);
            });
        }
        return dtos;
    }

}
