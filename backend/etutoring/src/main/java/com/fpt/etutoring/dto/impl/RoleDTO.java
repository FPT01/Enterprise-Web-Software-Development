package com.fpt.etutoring.dto.impl;

import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class RoleDTO {
    private Long id;
    private String roleName;
    private String roleDescription;
    private Set<UserDTO> users = new HashSet<>(0);
}
