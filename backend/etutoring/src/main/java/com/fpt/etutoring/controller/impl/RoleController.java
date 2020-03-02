package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.dto.ResponseDTO;
import com.fpt.etutoring.dto.impl.RoleDTO;
import com.fpt.etutoring.entity.impl.Role;
import com.fpt.etutoring.service.RoleService;
import com.fpt.etutoring.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
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
    public RoleDTO createOrUpdate(@RequestBody RoleDTO json) {
        Role from = ResponseDTO.accepted().getObject(json, Role.class);
        Role r = roleService.createOrUpdate(from);
        return ResponseDTO.accepted().getObject(r, RoleDTO.class);
    }

    @Override
    @DeleteMapping(value = Constant.PATH_DELETE, consumes = "application/json", produces = "application/json")
    public void delete(@PathVariable Long id) {
        roleService.delete(id);
    }

    @Override
    @GetMapping(value = Constant.PATH_FIND_BY_ID, consumes = "application/json", produces = "application/json")
    public RoleDTO findById(@PathVariable Long id) {
        Role r = roleService.findById(id);
        return ResponseDTO.accepted().getObject(r, RoleDTO.class);
    }
}
