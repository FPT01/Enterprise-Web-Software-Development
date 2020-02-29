package com.fpt.etutoring.service;

public interface SecurityService {
    String findLoggedInUsername();

    String autoLogin(String username, String password);
}
