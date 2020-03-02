package com.fpt.etutoring.dto;

import lombok.Data;

import java.io.Serializable;
 @DTO
 @Data
public abstract class BaseDTO implements Serializable {
  protected Long id;
}
