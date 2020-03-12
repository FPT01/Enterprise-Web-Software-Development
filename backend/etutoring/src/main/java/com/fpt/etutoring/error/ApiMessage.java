package com.fpt.etutoring.error;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class ApiMessage {
    private HttpStatus status;
    private String message;

    public ApiMessage(HttpStatus status) {
        this.status = status;
    }

    public ApiMessage(HttpStatus status, Throwable ex) {
        this.status = status;
        this.message = "Unexpected error";
    }

    public ApiMessage(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    public ApiMessage(HttpStatus status, String message, Throwable ex) {
        this.status = status;
        this.message = message;
    }
}
