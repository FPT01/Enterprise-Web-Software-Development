package com.fpt.etutoring.dto.impl;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fpt.etutoring.dto.BaseDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class DocumentDTO extends BaseDTO {
    private Long id;
    private UserDTO owner;
    private String type;
    private String title;
    private String url;
    private String content;
    private Date creationTime;
    private Date modifiedTime;
}
