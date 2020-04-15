package com.fpt.etutoring.dto.impl;

import com.fpt.etutoring.dto.BaseDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentDTO extends BaseDTO {
//    private AllocationDTO allocation;
    private MeetingDTO meeting;
    private UserDTO user;
}
