package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.ResponseController;
import com.fpt.etutoring.entity.impl.Role;
import com.fpt.etutoring.entity.impl.Student;
import com.fpt.etutoring.entity.impl.Tutor;
import com.fpt.etutoring.entity.impl.User;
import com.fpt.etutoring.error.ApiMessage;
import com.fpt.etutoring.export.pojo.UserImportExport;
import com.fpt.etutoring.service.RoleService;
import com.fpt.etutoring.service.StudentService;
import com.fpt.etutoring.service.TutorService;
import com.fpt.etutoring.service.UserService;
import com.fpt.etutoring.util.Constant;
import com.fpt.etutoring.util.ExcelUtil;
import com.fpt.etutoring.util.RoleName;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(Constant.PATH_IMPORT_EXPORT)
@CrossOrigin(value = {"*"}, exposedHeaders = {"Content-Disposition"})
@Slf4j
public class ImportExportController extends ResponseController {
    @Autowired
    private StudentService studentService;
    @Autowired
    private TutorService tutorService;
    @Autowired
    private RoleService roleService;
    @Autowired
    private UserService userService;

    @PostMapping(value = Constant.PATH_SAVE_FILE)
    public ResponseEntity<?> upload(@NotNull @RequestParam("file") MultipartFile excelFile) throws IOException {
        List<UserImportExport> userImportExports = new ArrayList<>();

        XSSFWorkbook workbook = new XSSFWorkbook(excelFile.getInputStream());
        XSSFSheet worksheet = workbook.getSheetAt(0);
        for(int i = 1; i < worksheet.getPhysicalNumberOfRows(); i++) {
            XSSFRow row = worksheet.getRow(i);

            UserImportExport importExport = new UserImportExport();
            importExport.setEmail(row.getCell(0).getStringCellValue());
            importExport.setEnabled((short) row.getCell(1).getNumericCellValue());
            importExport.setFullname(row.getCell(2).getStringCellValue());
            importExport.setGender((short) row.getCell(3).getNumericCellValue());

            String pass = null;
            if (row.getCell(4).getCellType().equals(CellType.NUMERIC))
                pass = String.valueOf(row.getCell(4).getNumericCellValue());
            else if (row.getCell(4).getCellType().equals(CellType.STRING))
                pass = row.getCell(4).getStringCellValue();
            importExport.setPassword(pass);

            importExport.setUsername(row.getCell(5).getStringCellValue());
            importExport.setRolename(row.getCell(6).getStringCellValue());
            userImportExports.add(importExport);
        }

        if (!CollectionUtils.isEmpty(userImportExports)) {
            Role roleTutor = roleService.findByName(RoleName.TUTOR.getValue());
            Role roleStudent = roleService.findByName(RoleName.STUDENT.getValue());
            List<Student> students = new ArrayList<>();
            List<Tutor> tutors = new ArrayList<>();
            userImportExports.forEach(im -> {
                User user = userService.findByUsername(im.getUsername());
                if (user == null)
                    user = new User();
                user.setEmail(im.getEmail());
                user.setEnabled(im.getEnabled());
                user.setFullname(im.getFullname());
                user.setGender(im.getGender());
                user.setPassword(im.getPassword());
                user.setUsername(im.getUsername());

                if (im.getRolename().equalsIgnoreCase(RoleName.STUDENT.getValue())) {
                    user.setRole(roleStudent);
                    Student student = new Student();
                    student.setUser(userService.createOrUpdate(user));
                    students.add(student);
                }
                if (im.getRolename().equalsIgnoreCase(RoleName.TUTOR.getValue())) {
                    user.setRole(roleTutor);
                    Tutor tutor = new Tutor();
                    tutor.setUser(userService.createOrUpdate(user));
                    tutors.add(tutor);
                }
            });
            if (!CollectionUtils.isEmpty(tutors))
                tutorService.saveAll(tutors);
            if(!CollectionUtils.isEmpty(students))
                studentService.saveAll(students);
        }
        return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
    }

    @GetMapping(value = Constant.PATH_LOAD_FILE)
    public void donwload(HttpServletRequest req, HttpServletResponse res) {
        List<Student> students = studentService.list();
        List<Tutor> tutors = tutorService.list();
        List<UserImportExport> importExports = new ArrayList<>();
        if (!CollectionUtils.isEmpty(students)) {
            students.forEach(s -> {
                UserImportExport userImportExport = new UserImportExport();
                userImportExport.setRolename(RoleName.STUDENT.getValue());
                userImportExport.setEmail(s.getUser().getEmail());
                userImportExport.setEnabled(s.getUser().getEnabled());
                userImportExport.setFullname(s.getUser().getFullname());
                userImportExport.setGender(s.getUser().getGender());
                userImportExport.setPassword(s.getUser().getPassword());
                userImportExport.setUsername(s.getUser().getUsername());
                importExports.add(userImportExport);
            });
        }
        if (!CollectionUtils.isEmpty(tutors)) {
            tutors.forEach(t -> {
                UserImportExport userImportExport = new UserImportExport();
                userImportExport.setRolename(RoleName.TUTOR.getValue());
                userImportExport.setEmail(t.getUser().getEmail());
                userImportExport.setEnabled(t.getUser().getEnabled());
                userImportExport.setFullname(t.getUser().getFullname());
                userImportExport.setGender(t.getUser().getGender());
                userImportExport.setPassword(t.getUser().getPassword());
                userImportExport.setUsername(t.getUser().getUsername());
                importExports.add(userImportExport);
            });
        }

        try {
            ExcelUtil.exportToExcel(req, res,
                    Constant.EXCEL_STUDENT_AND_TUTOR, importExports);
        } catch (Exception e) {
            log.error("export excel error:{}", e);
        }
    }

}