package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.dto.impl.StatisticDTO;
import com.fpt.etutoring.service.MessageService;
import com.fpt.etutoring.service.StudentService;
import com.fpt.etutoring.util.Constant;
import com.fpt.etutoring.util.DateUtil;
import com.fpt.etutoring.util.ExcelUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin
@RequestMapping(Constant.PATH_STATISTIC)
@Slf4j
public class StatisticController {

    @Autowired
    private MessageService messageService;
    @Autowired
    private StudentService studentService;

    @GetMapping(Constant.PATH_LAST_SEVEN_DAYS)
    public ResponseEntity<?> getLastSevenDays() {
        StatisticDTO dto = new StatisticDTO();
        dto.setLastSevenDays(messageService.getMessagesLastSevenDays());
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    @GetMapping(Constant.PATH_AVG_MSG)
    public ResponseEntity<?> getAvgMsg() {
        return ResponseEntity.status(HttpStatus.OK).body(messageService.getAverageMsg());
    }

    @GetMapping(Constant.PATH_STUDENT_WITHOUT_TUTOR)
    public void exportStudentWithoutTutor(HttpServletRequest req, HttpServletResponse res) {
        try {
            ExcelUtil.exportToExcel(req, res,
                    Constant.EXCEL_STUDENT_WITHOUT_TUTOR, studentService.findStudentsWithoutTutor());
        } catch (Exception e) {
            log.error("export excel error:{}", e);
        }
    }

    @GetMapping(Constant.PATH_STUDENT_WITH_NO_INTERACTION)
    public void exportStudentWithNoInteraction(HttpServletRequest req, HttpServletResponse res) {
        try {
            ExcelUtil.exportToExcel(req, res, Constant.EXCEL_STUDENT_WITH_NO_INTERACTION,
                    studentService.getStudentsSevenToTwentyEight(DateUtil.getLastSevenDays(),
                            DateUtil.getLastTwentyEightDays()));
        } catch (Exception e) {
            log.error("export excel error:{}", e);
        }
    }

}
