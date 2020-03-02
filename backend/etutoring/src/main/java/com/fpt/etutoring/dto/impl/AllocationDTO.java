package com.fpt.etutoring.dto.impl;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fpt.etutoring.dto.BaseDTO;
import lombok.Data;

import java.util.Date;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class AllocationDTO extends BaseDTO {
    private  Long id;
    private Date startTime;
    private Date endTime;
    private StudentDTO student;
}
