package com.fpt.etutoring.export.pojo;

import com.fpt.etutoring.export.ExcelCell;
import com.fpt.etutoring.export.ExcelSheet;
import lombok.Data;

import java.io.Serializable;

@Data
@ExcelSheet("Student")
public class StudentExcel2 implements Serializable {
    @ExcelCell(value = "ID")
    private Long id;

    @ExcelCell(value = "Full Name")
    private String fullname;

    @ExcelCell(value = "User Name")
    private String username;

    @ExcelCell(value = "7 days")
    private String sevenDays;

    @ExcelCell(value = "28 days")
    private String twentyEightDays;
}
