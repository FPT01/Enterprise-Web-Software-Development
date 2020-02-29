package com.fpt.etutoring.dto.impl;

import com.fpt.etutoring.dto.BaseDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class UserInfoDTO extends BaseDTO {
    private String name;
    private Date dob;
    private String address;
    private String email;
    private String phone;
    private UserDTO userDTO;
}
