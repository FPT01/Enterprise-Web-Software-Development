package com.fpt.etutoring.dto.impl;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fpt.etutoring.dto.BaseDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class StudentDTO extends BaseDTO {
    private Long id;
    private String roleDescription;
    private UserDTO user;
}
