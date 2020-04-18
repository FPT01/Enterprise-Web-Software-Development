package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.ResponseController;
import com.fpt.etutoring.error.ApiMessage;
import com.fpt.etutoring.util.Constant;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import java.io.IOException;

@RestController
@RequestMapping(Constant.PATH_IMPORT_EXPORT)
@CrossOrigin(value = {"*"}, exposedHeaders = {"Content-Disposition"})
public class ImportExportController extends ResponseController {

    @PostMapping(value = Constant.PATH_SAVE_FILE)
    public ResponseEntity<?> upload(@NotNull @RequestParam("file") MultipartFile excelFile) throws IOException {
        XSSFWorkbook workbook = new XSSFWorkbook(excelFile.getInputStream());
        XSSFSheet worksheet = workbook.getSheetAt(0);
        for(int i = 1; i < worksheet.getPhysicalNumberOfRows(); i++) {
            XSSFRow row = worksheet.getRow(i);

//            tempStudent.setId((int) row.getCell(0).getNumericCellValue());
//            tempStudent.setContent(row.getCell(1).getStringCellValue());
        }
        return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
    }

}