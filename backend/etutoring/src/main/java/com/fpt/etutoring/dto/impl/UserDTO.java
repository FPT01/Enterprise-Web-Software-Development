package com.fpt.etutoring.dto.impl;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fpt.etutoring.dto.BaseDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDTO extends BaseDTO {
    private String password;
    private String username;
    private Short enabled;
}
