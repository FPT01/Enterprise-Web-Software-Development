package com.fpt.etutoring.dto.impl;

import com.fpt.etutoring.dto.BaseDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotificationDTO extends BaseDTO {
    private String description;
    private UserDTO user;
    private RoomDTO room;
}
