package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.ResponseController;
import com.fpt.etutoring.dto.impl.StatisticDTO;
import com.fpt.etutoring.dto.impl.SummaryDTO;
import com.fpt.etutoring.entity.impl.User;
import com.fpt.etutoring.error.ApiMessage;
import com.fpt.etutoring.service.*;
import com.fpt.etutoring.util.Constant;
import com.fpt.etutoring.util.DateUtil;
import com.fpt.etutoring.util.ExcelUtil;
import com.fpt.etutoring.util.RoleName;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(Constant.PATH_STATISTIC)
@Slf4j
public class StatisticController extends ResponseController {

    @Autowired
    private MessageService messageService;
    @Autowired
    private StudentService studentService;
    @Autowired
    private UserService userService;
    @Autowired
    private MeetingService meetingService;
    @Autowired
    private BlogPostService blogPostService;
    @Autowired
    private BlogCommentService blogCommentService;



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

    @GetMapping(value = Constant.PATH_SUMMARY, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> tutorSummary(@NotNull @PathVariable String username) {
        User user = userService.findByUsername(username);
        if (user == null)
            return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.ERROR_NOT_FOUND));

        List<Object[]> msgSenders = messageService.listMsgSenders(user.getId());
        List<Object[]> msgReceivers = messageService.listMsgReceivers(user.getId());
        Long totalBlogPost = blogPostService.getTotalBlogByUserId(user.getId());
        Long totalBlogComment = blogCommentService.getTotalBlogCommentByUserId(user.getId());
        Long totalMeetings = null;
        if (user.getRole().getRoleName().equalsIgnoreCase(RoleName.TUTOR.getValue()))
            totalMeetings = meetingService.totalTutorMeetings(user.getId());
        else
            totalMeetings = meetingService.totalStudentMeetings(user.getId());

        SummaryDTO summaryDTO = new SummaryDTO();
        summaryDTO.setSenders(getListUserMsgs(msgSenders));
        summaryDTO.setReceivers(getListUserMsgs(msgReceivers));
        summaryDTO.setTotalMeetings(totalMeetings);
        summaryDTO.setTotalBlogPost(totalBlogPost);
        summaryDTO.setTotalBlogComment(totalBlogComment);
        return ResponseEntity.status(HttpStatus.OK).body(summaryDTO);
    }

    private List<SummaryDTO.UserMsg> getListUserMsgs(List<Object[]> msgs) {
        List<SummaryDTO.UserMsg> userMsgs = new ArrayList<>();
        if (!CollectionUtils.isEmpty(msgs)) {
            msgs.forEach(obj -> {
                String fullname = (String) obj[0];
                String username = (String) obj[1];
                Date t = (Date) obj[2];
                Long c = (Long) obj[3];
                SummaryDTO.UserMsg userMsg = new SummaryDTO.UserMsg();
                userMsg.setCounter(c);
                userMsg.setFullname(fullname);
                userMsg.setUsername(username);
                userMsg.setTime(t);

                userMsgs.add(userMsg);
            });
        }
        return userMsgs;
    }

}
