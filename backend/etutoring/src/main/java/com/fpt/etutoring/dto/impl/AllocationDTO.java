package com.fpt.etutoring.dto.impl;

import com.fpt.etutoring.dto.BaseDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class AllocationDTO extends BaseDTO {
    private Date startTime;
    private Date endTime;
    private Set<StudentDTO> students = new HashSet<>(0);
}
