package com.fpt.etutoring.export.pojo;

import com.fpt.etutoring.export.ExcelCell;
import com.fpt.etutoring.export.ExcelSheet;
import lombok.Data;

@Data
@ExcelSheet("Student and Tutor")
public class UserImportExport {
    @ExcelCell(value = "Email")
    private String email;
    @ExcelCell(value = "Enable")
    private Short enabled;
    @ExcelCell(value = "Full Name")
    private String fullname;
    @ExcelCell(value = "Gender")
    private Short gender;
    @ExcelCell(value = "Password")
    private String password;
    @ExcelCell(value = "User Name")
    private String username;
    @ExcelCell(value = "Role Name")
    private String rolename;
}
