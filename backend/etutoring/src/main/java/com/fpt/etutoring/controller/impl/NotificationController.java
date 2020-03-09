package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.dto.ResponseDTO;
import com.fpt.etutoring.dto.impl.NotificationDTO;
import com.fpt.etutoring.entity.impl.Notification;
import com.fpt.etutoring.service.NotificationService;
import com.fpt.etutoring.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(Constant.PATH_NOTIFICATION)
@CrossOrigin
public class NotificationController implements BaseController<NotificationDTO, Long> {
    @Autowired
    private NotificationService notificationService;

    @Override
    @GetMapping(Constant.PATH)
    public List<NotificationDTO> list() {
        List<Notification> notifications = notificationService.list();
        List<NotificationDTO> notificationDTOS = new ArrayList<>();
        if (!CollectionUtils.isEmpty(notifications)) {
            notifications.forEach(n -> {
                NotificationDTO notificationDTO = ResponseDTO.accepted().getObject(n, NotificationDTO.class);
                notificationDTOS.add(notificationDTO);
            });
        }
        return notificationDTOS;
    }

    @Override
    @PostMapping(value = Constant.PATH_SAVE, consumes = "application/json", produces = "application/json")
    public NotificationDTO createOrUpdate(@RequestBody NotificationDTO json) {
        Notification from = ResponseDTO.accepted().getObject(json, Notification.class);
        Notification notification = notificationService.createOrUpdate(from);
        return ResponseDTO.accepted().getObject(notification, NotificationDTO.class);
    }

    @Override
    @DeleteMapping(value = Constant.PATH_DELETE, consumes = "application/json", produces = "application/json")
    public void delete(@PathVariable Long id) {
        notificationService.delete(id);
    }

    @Override
    @GetMapping(value = Constant.PATH_FIND_BY_ID, consumes = "application/json", produces = "application/json")
    public NotificationDTO findById(@PathVariable Long id) {
        Notification notification = notificationService.findById(id);
        return ResponseDTO.accepted().getObject(notification, NotificationDTO.class);
    }
}
