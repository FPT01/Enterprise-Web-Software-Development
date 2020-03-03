package com.fpt.etutoring.dto.impl;

import com.fpt.etutoring.dto.BaseDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class AllocationDTO extends BaseDTO {
    private  Long id;
    private Date startTime;
    private Date endTime;
    private StudentDTO student;
}
