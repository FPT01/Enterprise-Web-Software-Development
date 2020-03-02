package com.fpt.etutoring.dto.impl;

import com.fpt.etutoring.dto.BaseDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDTO extends BaseDTO {
    private Long id;
    private String content;
    private UserDTO owner;
    private DocumentDTO document;
}
