package com.fpt.etutoring.util;

public enum RoleName {
    ADMIN("admin"), STUDENT("student"), TUTOR("tutor"), STAFF("staff");

    private String value = null;

    private RoleName(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }
}
