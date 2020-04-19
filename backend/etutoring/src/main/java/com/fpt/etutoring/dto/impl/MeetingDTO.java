package com.fpt.etutoring.dto.impl;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fpt.etutoring.dto.BaseDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class MeetingDTO extends BaseDTO {
    private String title;
    private String description;
    private String type;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd@HH:mm:ss.SSSZ")
    private Date startTime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd@HH:mm:ss.SSSZ")
    private Date endTime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd@HH:mm:ss.SSSZ")
    private Date creationTime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd@HH:mm:ss.SSSZ")
    private Date modifiedTime;
    private Set<StudentDTO> studentDTOS = new HashSet<>(0);
    private Set<TutorDTO> tutorDTOS = new HashSet<>(0);
}
