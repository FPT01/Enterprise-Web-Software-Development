package com.fpt.etutoring.dto.impl;

import com.fpt.etutoring.dto.BaseDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class MeetingDTO extends BaseDTO {
    private  Long id;
    private String title;
    private String description;
    private Date creationTime;
    private Date modifiedTime;
    private Set<UserDTO> users = new HashSet<>(0);
}
