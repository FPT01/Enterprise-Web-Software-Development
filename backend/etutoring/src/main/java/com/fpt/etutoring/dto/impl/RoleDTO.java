package com.fpt.etutoring.dto.impl;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fpt.etutoring.dto.BaseDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class RoleDTO extends BaseDTO {
    private Long id;
    private String roleName;
    private String roleDescription;
    private Set<UserDTO> users = new HashSet<>(0);
}
