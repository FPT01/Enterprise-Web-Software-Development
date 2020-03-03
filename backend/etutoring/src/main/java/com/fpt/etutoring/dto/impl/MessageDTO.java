package com.fpt.etutoring.dto.impl;

import com.fpt.etutoring.dto.BaseDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class MessageDTO extends BaseDTO {
    private Long id;
    private String content;
    private Date time;
    private Short status;
    private UserDTO sender;
    private UserDTO receiver;
}
