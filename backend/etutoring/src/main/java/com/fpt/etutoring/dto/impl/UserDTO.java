package com.fpt.etutoring.dto.impl;

import com.fpt.etutoring.dto.BaseDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO extends BaseDTO {
    private String password;
    private String username;
    private Short enabled;
    private String fullname;
    private Short gender;
    private String avatar;
    private String email;
    private RoleDTO roleDTO;
    private RoleDTO role;
}
