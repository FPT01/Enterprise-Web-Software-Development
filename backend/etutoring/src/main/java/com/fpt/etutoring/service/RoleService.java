package com.fpt.etutoring.service;

import com.fpt.etutoring.entity.impl.Role;

import java.util.List;

public interface RoleService {
    List<Role> list();
    Role createOrUpdate(Role json);
    void delete(Long id);
    Role findById(Long id);
    Role findByName(String rolename);
}
