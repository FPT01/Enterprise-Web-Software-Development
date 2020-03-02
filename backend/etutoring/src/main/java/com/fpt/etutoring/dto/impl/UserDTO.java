package com.fpt.etutoring.dto.impl;

import com.fpt.etutoring.dto.BaseDTO;
import lombok.Data;

@Data
public class UserDTO extends BaseDTO {
    private String password;
    private String username;
    private Short enabled;
    private String fullname;
}
