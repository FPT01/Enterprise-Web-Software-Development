package com.fpt.etutoring.dto.impl;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fpt.etutoring.dto.BaseDTO;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
public class AllocationDTO {
    private Set<StudentDTO> students = new HashSet<>(0);
    private Set<TutorDTO> tutors = new HashSet<>(0);
    private RoomDTO room;
}
