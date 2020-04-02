package com.fpt.etutoring.controller;

import com.fpt.etutoring.error.ApiMessage;
import com.fpt.etutoring.error.StorageFileNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

public abstract class ResponseController {
    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<?> buildResponseEntity(ApiMessage apiMessage) {
        return new ResponseEntity<>(apiMessage, apiMessage.getStatus());
    }

}
