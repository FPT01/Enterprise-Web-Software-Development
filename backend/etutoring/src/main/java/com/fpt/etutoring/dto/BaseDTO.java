package com.fpt.etutoring.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
 @DTO
 @Getter
 @Setter
public abstract class BaseDTO implements Serializable {
  protected Long id;
}
