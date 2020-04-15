package com.fpt.etutoring.dto.impl;

import com.fpt.etutoring.dto.BaseDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TutorDTO extends BaseDTO {
    private UserDTO user;
//    private AllocationDTO allocation;
    private MeetingDTO meeting;
}
