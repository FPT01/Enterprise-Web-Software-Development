package com.fpt.etutoring.dto.impl;

import com.fpt.etutoring.dto.BaseDTO;
import com.fpt.etutoring.dto.RequestDTO;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.PostMapping;

import javax.persistence.Column;

@Getter
@Setter
public class UserDTO extends BaseDTO {
    private String password;
    private String username;
    private Short enabled;
}
