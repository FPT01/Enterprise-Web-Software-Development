package com.fpt.etutoring.dao.impl;

import com.fpt.etutoring.entity.impl.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleDao extends JpaRepository<Role, Long> {
    Role findByRoleName(String rolename);
}
