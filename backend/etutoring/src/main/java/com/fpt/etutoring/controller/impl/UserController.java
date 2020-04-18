package com.fpt.etutoring.controller.impl;


import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.controller.ResponseController;
import com.fpt.etutoring.dto.ResponseDTO;
import com.fpt.etutoring.dto.impl.ChangePasswordDTO;
import com.fpt.etutoring.dto.impl.LoginDTO;
import com.fpt.etutoring.dto.impl.RoleDTO;
import com.fpt.etutoring.dto.impl.UserDTO;
import com.fpt.etutoring.entity.impl.Role;
import com.fpt.etutoring.entity.impl.User;
import com.fpt.etutoring.error.ApiMessage;
import com.fpt.etutoring.service.RoleService;
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
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(Constant.PATH_USER)
public class UserController extends ResponseController implements BaseController<UserDTO, Long> {
//    @Autowired
//    private SecurityService securityService;

    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;
//    @Autowired
//    private StorageService storageService;
//    @Autowired
//    private StringToUserDTOConverter converter;

    @PostMapping(value = Constant.PATH_CHANGE_PASSWORD)
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordDTO json) {
        User u = userService.findByUsername(json.getUsername());
        if (u != null) {
            u.setPassword(json.getNewPassword());
            userService.createOrUpdate(u);
            return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
        }
        return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.ERROR_NOT_FOUND));
    }

    @PostMapping(value = Constant.PATH_LOGIN)
    public ResponseEntity<?> login(@RequestBody LoginDTO json) {
//        return securityService.autoLogin(user.getUsername(), user.getPassword());
        User u = userService.getUserByUsernameAndPassword(json.getUsername(), json.getPassword());
        if (u != null && u.getEnabled() == 1) {
            UserDTO userDTO = getUserWithRole(u);
            userDTO.setPassword(null);
            return new ResponseEntity<>(userDTO, HttpStatus.OK);
        }
        return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.ERROR_LOGIN));
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

    /*@PostMapping(value = Constant.PATH_SAVE, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> save(@RequestParam(value = "file", required = false) MultipartFile file,
                                  @RequestParam(value = "id", required = false) Long id,
                                  @RequestParam("password") String password,
                                  @RequestParam("username") String username,
                                  @RequestParam("enabled") Short enabled,
                                  @RequestParam("fullname") String fullname,
                                  @RequestParam("gender") Short gender,
                                  @RequestParam("avatar") String avatar,
                                  @RequestParam("email") String email,
                                  @RequestParam("roleId") Long roleId) {
        if (file != null && file.getSize() > 0)
            storageService.store(file);

        UserDTO source = new UserDTO();
        if (id != null)
            source.setId(id);
        source.setPassword(password);
        source.setUsername(username);
        source.setEnabled(enabled);
        source.setFullname(fullname);
        source.setGender(gender);
        source.setAvatar(avatar);
        source.setEmail(email);
        RoleDTO roleDTO = new RoleDTO();
        roleDTO.setId(roleId);
        source.setRoleDTO(roleDTO);
        return createOrUpdate(source);
    }*/

    // fullname, username, email, gender
    @PostMapping(value = Constant.PATH_CHANGE_PROFILE, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> changeProfile(@RequestBody UserDTO json) {
            User newUser = userService.findById(json.getId());
            if (newUser != null) {
                newUser.setFullname(json.getFullname());
                newUser.setUsername(json.getUsername().trim());
                newUser.setEmail(json.getEmail());
                newUser.setGender(json.getGender());
                userService.createOrUpdate(newUser);
                return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
            }
        return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.ERROR_NOT_FOUND));
    }

    @Override
    @PostMapping(value = Constant.PATH_SAVE, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> createOrUpdate(@RequestBody UserDTO json) {
        try {
            User from = ResponseDTO.accepted().getObject(json, User.class);
            String newUsername = from.getUsername().trim();
            from.setUsername(newUsername);
            if (json.getRoleDTO() != null) {
                Role role = roleService.findById(json.getRoleDTO().getId());
                if (role != null)
                    from.setRole(role);
            }
            userService.createOrUpdate(from);
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
            User user = userService.findById(id);
            if (user != null) {
                user.setEnabled(Short.valueOf("0"));
                userService.createOrUpdate(user);
            }
        } catch (Exception ex) {
            return buildResponseEntity(new ApiMessage(HttpStatus.OK, ex));
        }
        return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
    }

    @Override
    @GetMapping(value = Constant.PATH_FIND_BY_ID, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        User u = userService.findById(id);
        if (u == null)
            return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.ERROR_NOT_FOUND));
        return ResponseEntity.status(HttpStatus.OK).body(getUserWithRole(u));
    }

    @GetMapping(value = Constant.PATH_FIND_BY_USERNAME, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> findByUsername(@PathVariable String username) {
        User u = userService.findByUsername(username);
        if (u == null)
            return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.ERROR_NOT_FOUND));
        u.setPassword(null);
        return ResponseEntity.status(HttpStatus.OK).body(getUserWithRole(u));
    }
}
