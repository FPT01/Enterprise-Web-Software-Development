package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.dto.impl.RoleDTO;
import com.fpt.etutoring.util.Constant;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(Constant.PATH_ROLE)
@CrossOrigin
public class RoleController implements BaseController<RoleDTO, Long> {

    @Override
    public List<RoleDTO> list() {
        return null;
    }

    @Override
    public RoleDTO createOrUpdate(RoleDTO json) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public RoleDTO findById(Long id) {
        return null;
    }
}
