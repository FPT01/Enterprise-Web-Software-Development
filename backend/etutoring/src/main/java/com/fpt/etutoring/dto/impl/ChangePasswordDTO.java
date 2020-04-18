package com.fpt.etutoring.dto.impl;

import lombok.Data;

@Data
public class ChangePasswordDTO {
    private String oldPassword;
    private String newPassword;
    private String username;
}
