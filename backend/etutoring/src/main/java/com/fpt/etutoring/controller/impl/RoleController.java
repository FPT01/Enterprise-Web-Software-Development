package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.dto.ResponseDTO;
import com.fpt.etutoring.dto.impl.RoleDTO;
import com.fpt.etutoring.entity.impl.Role;
import com.fpt.etutoring.error.ApiMessage;
import com.fpt.etutoring.service.RoleService;
import com.fpt.etutoring.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(Constant.PATH_ROLE)
@CrossOrigin
public class RoleController implements BaseController<RoleDTO, Long> {

    @Autowired
    private RoleService roleService;

    @Override
    @GetMapping(Constant.PATH)
    public List<RoleDTO> list() {
        List<Role> roles = roleService.list();
        List<RoleDTO> roleDTOS = new ArrayList<>();
        if(!CollectionUtils.isEmpty(roles)) {
            roles.forEach(r -> {
                RoleDTO roleDTO = ResponseDTO.accepted().getObject(r, RoleDTO.class);
                roleDTOS.add(roleDTO);
            });
        }
        return roleDTOS;
    }

    @Override
    @PostMapping(value = Constant.PATH_SAVE, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> createOrUpdate(@RequestBody RoleDTO json) {
        try {
            Role from = ResponseDTO.accepted().getObject(json, Role.class);
            roleService.createOrUpdate(from);
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
            roleService.delete(id);
        } catch (Exception ex) {
            return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, Constant.ERROR_DELETE));
        }
        return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
    }

    @Override
    @GetMapping(value = Constant.PATH_FIND_BY_ID, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Role r = roleService.findById(id);
        if (r == null)
            return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, Constant.ERROR_NOT_FOUND));
        return ResponseEntity.status(HttpStatus.OK).body(ResponseDTO.accepted().getObject(r, RoleDTO.class));
    }

    @Override
    public ResponseEntity<?> buildResponseEntity(ApiMessage apiMessage) {
        return new ResponseEntity<>(apiMessage, apiMessage.getStatus());
    }
}
