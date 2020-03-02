package com.fpt.etutoring.service.impl;

import com.fpt.etutoring.dao.impl.RoleDao;
import com.fpt.etutoring.entity.impl.Role;
import com.fpt.etutoring.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleImpl implements RoleService {
    @Autowired
    private RoleDao roleDao;

    @Override
    public List<Role> list() {
        return roleDao.findAll();
    }

    @Override
    public Role createOrUpdate(Role json) {
        return roleDao.save(json);
    }

    @Override
    public void delete(Long id) {
        roleDao.deleteById(id);
    }

    @Override
    public Role findById(Long id) {
        return roleDao.findById(id).get();
    }
}
