package com.fpt.etutoring.util;

public enum RoleName {
    ADMIN("Admin"), STUDENT("Student"), TUTOR("Tutor"), STAFF("Staff");

    private String value = null;

    private RoleName(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }
}
