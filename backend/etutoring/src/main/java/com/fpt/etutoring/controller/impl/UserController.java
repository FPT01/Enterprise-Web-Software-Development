package com.fpt.etutoring.controller.impl;


import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.controller.ResponseController;
import com.fpt.etutoring.converter.StringToUserDTOConverter;
import com.fpt.etutoring.dto.RequestDTO;
import com.fpt.etutoring.dto.ResponseDTO;
import com.fpt.etutoring.dto.impl.RoleDTO;
import com.fpt.etutoring.dto.impl.UserDTO;
import com.fpt.etutoring.entity.impl.Role;
import com.fpt.etutoring.entity.impl.User;
import com.fpt.etutoring.error.ApiMessage;
import com.fpt.etutoring.service.RoleService;
import com.fpt.etutoring.service.UserService;
import com.fpt.etutoring.storage.StorageService;
import com.fpt.etutoring.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(Constant.PATH_USER)
public class UserController extends ResponseController implements BaseController<UserDTO, Long> {
//    @Autowired
//    private SecurityService securityService;

    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;
    @Autowired
    private StorageService storageService;
    @Autowired
    private StringToUserDTOConverter converter;


    @PostMapping(Constant.PATH_LOGIN)
    public ResponseEntity<?> login(@RequestDTO(UserDTO.class) User user) {
//        return securityService.autoLogin(user.getUsername(), user.getPassword());
        User u = userService.getUserByUsernameAndPassword(user.getUsername(), user.getPassword());
        if (u != null && u.getEnabled() == 1) {
            UserDTO userDTO = getUserWithRole(u);
            userDTO.setPassword(null);
            return new ResponseEntity<>(userDTO, HttpStatus.OK);
        }
        return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, Constant.ERROR_LOGIN));
    }

    private UserDTO getUserWithRole(User u) {
        UserDTO userDTO = ResponseDTO.accepted().getObject(u, UserDTO.class);
        if (u.getRole() != null) {
            Role role = u.getRole();
            RoleDTO roleDTO = ResponseDTO.accepted().getObject(role, RoleDTO.class);
            roleDTO.setUsers(null);
            userDTO.setRole(null);
            userDTO.setRoleDTO(roleDTO);
        }
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

    @PostMapping(value = Constant.PATH_SAVE)
    public ResponseEntity<?> save(@RequestParam(value = "file", required = false) MultipartFile file,
                                  @RequestParam("dto") String source) {
        if (file != null && file.getSize() > 0)
            storageService.store(file);

        return createOrUpdate(converter.convert(source));
    }

    @Override
    public ResponseEntity<?> createOrUpdate(UserDTO json) {
        try {
            User from = ResponseDTO.accepted().getObject(json, User.class);
            if (json.getRoleDTO() != null) {
                Role role = roleService.findById(json.getRoleDTO().getId());
                if (role != null)
                    from.setRole(role);
            }
            userService.createOrUpdate(from);
            return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
        } catch (Exception ex) {
            if (json.getId() == null)
                return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, Constant.ERROR_INSERT));
            else
                return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, Constant.ERROR_UPDATE));
        }
    }

    @Override
    @DeleteMapping(value = Constant.PATH_DELETE)
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            User user = userService.findById(id);
            if (user != null) {
                user.setEnabled(Short.valueOf("0"));
                userService.createOrUpdate(user);
            }
        } catch (Exception ex) {
            return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, ex));
        }
        return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
    }

    @Override
    @GetMapping(value = Constant.PATH_FIND_BY_ID)
    public ResponseEntity<?> findById(@PathVariable Long id) {
        User u = userService.findById(id);
        if (u == null)
            return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, Constant.ERROR_NOT_FOUND));
        return ResponseEntity.status(HttpStatus.OK).body(getUserWithRole(u));
    }

    @GetMapping(value = Constant.PATH_LOAD_FILE)
    @ResponseBody
    public ResponseEntity<?> upload(@RequestParam(value = "filename") String filename) {
        if (filename == null)
            return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, Constant.ERROR_NOT_FOUND));

        Resource file = storageService.loadAsResource(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

    @Override
    public ResponseEntity<?> buildResponseEntity(ApiMessage apiMessage) {
        return new ResponseEntity<>(apiMessage, apiMessage.getStatus());
    }
}
