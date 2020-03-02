package com.fpt.etutoring.dto.impl;

import com.fpt.etutoring.dto.BaseDTO;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class RoleDTO extends BaseDTO {
    private String roleName;
    private String roleDescription;
    private Set<UserDTO> users = new HashSet<>(0);
}
