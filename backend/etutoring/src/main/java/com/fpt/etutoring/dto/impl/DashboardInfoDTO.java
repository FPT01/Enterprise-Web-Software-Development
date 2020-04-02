package com.fpt.etutoring.dto.impl;

import com.fpt.etutoring.dto.BaseDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DashboardInfoDTO extends BaseDTO {
    private UserDTO user;
    private String name;
    private Short gender;
    private String avatar;
    private String email;
}
