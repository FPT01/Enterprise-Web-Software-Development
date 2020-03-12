package com.fpt.etutoring.controller;

import com.fpt.etutoring.error.ApiMessage;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface BaseController<T, V> {
    List<T> list();
    ResponseEntity<?> createOrUpdate(T json);
    ResponseEntity<?> delete(V id);
    ResponseEntity<?> findById(V id);
    ResponseEntity<?> buildResponseEntity(ApiMessage apiMessage);
}
