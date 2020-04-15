///*
//package com.fpt.etutoring.controller.impl;
//
//import com.fpt.etutoring.controller.BaseController;
//import com.fpt.etutoring.controller.ResponseController;
//import com.fpt.etutoring.dto.ResponseDTO;
//import com.fpt.etutoring.dto.impl.NotificationDTO;
//import com.fpt.etutoring.entity.impl.Notification;
//import com.fpt.etutoring.error.ApiMessage;
//import com.fpt.etutoring.service.NotificationService;
//import com.fpt.etutoring.util.Constant;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.util.CollectionUtils;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@RestController
//@RequestMapping(Constant.PATH_NOTIFICATION)
//@CrossOrigin
//public class NotificationController extends ResponseController implements BaseController<NotificationDTO, Long> {
//    @Autowired
//    private NotificationService notificationService;
//
//    @Override
//    @GetMapping(Constant.PATH)
//    public List<NotificationDTO> list() {
//        List<Notification> notifications = notificationService.list();
//        List<NotificationDTO> notificationDTOS = new ArrayList<>();
//        if (!CollectionUtils.isEmpty(notifications)) {
//            notifications.forEach(n -> {
//                NotificationDTO notificationDTO = ResponseDTO.accepted().getObject(n, NotificationDTO.class);
//                notificationDTOS.add(notificationDTO);
//            });
//        }
//        return notificationDTOS;
//    }
//
//    @Override
//    @PostMapping(value = Constant.PATH_SAVE, consumes = "application/json", produces = "application/json")
//    public ResponseEntity<?> createOrUpdate(@RequestBody NotificationDTO json) {
//        try {
//            Notification from = ResponseDTO.accepted().getObject(json, Notification.class);
//            notificationService.createOrUpdate(from);
//            return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
//        } catch (Exception ex) {
//            if (json.getId() == null)
//                return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, Constant.ERROR_INSERT));
//            else
//                return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, Constant.ERROR_UPDATE));
//        }
//    }
//
//    @Override
//    @DeleteMapping(value = Constant.PATH_DELETE, consumes = "application/json", produces = "application/json")
//    public ResponseEntity<?> delete(@PathVariable Long id) {
//        try {
//            notificationService.delete(id);
//        } catch (Exception ex) {
//            return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, ex));
//        }
//        return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
//    }
//
//    @Override
//    @GetMapping(value = Constant.PATH_FIND_BY_ID, consumes = "application/json", produces = "application/json")
//    public ResponseEntity<?> findById(@PathVariable Long id) {
//        Notification notification = notificationService.findById(id);
//        if (notification == null)
//            return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, Constant.ERROR_NOT_FOUND));
//        return ResponseEntity.status(HttpStatus.OK).body(ResponseDTO.accepted().getObject(notification, NotificationDTO.class));
//    }
//
//    @Override
//    public ResponseEntity<?> buildResponseEntity(ApiMessage apiMessage) {
//        return new ResponseEntity<>(apiMessage, apiMessage.getStatus());
//    }
//}
//*/
