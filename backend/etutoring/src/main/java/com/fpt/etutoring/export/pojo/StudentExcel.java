package com.fpt.etutoring.export.pojo;

import com.fpt.etutoring.export.ExcelCell;
import com.fpt.etutoring.export.ExcelSheet;
import lombok.Data;

import java.io.Serializable;

@Data
@ExcelSheet("Student")
public class StudentExcel implements Serializable {
    @ExcelCell(value = "ID")
    private Long id;

    @ExcelCell(value = "Full Name")
    private String fullname;
}
