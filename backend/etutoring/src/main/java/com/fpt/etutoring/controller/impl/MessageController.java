package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.controller.ResponseController;
import com.fpt.etutoring.dto.ResponseDTO;
import com.fpt.etutoring.dto.impl.MessageDTO;
import com.fpt.etutoring.entity.impl.Message;
import com.fpt.etutoring.error.ApiMessage;
import com.fpt.etutoring.service.MessageService;
import com.fpt.etutoring.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(Constant.PATH_MESSAGE)
@CrossOrigin
public class MessageController extends ResponseController implements BaseController<MessageDTO, Long> {

    @Autowired
    private MessageService messageService;

    @Override
    @GetMapping(Constant.PATH)
    public List<MessageDTO> list() {
        List<Message> messages = messageService.list();
        List<MessageDTO> messageDTOS = new ArrayList<>();
        if (!StringUtils.isEmpty(messages)) {
            messages.forEach(m -> {
                if (m.getUser() != null) {
                    MessageDTO messageDTO = new MessageDTO();
                    messageDTO.setContent(m.getContent());
                    messageDTO.setUsername(m.getUser().getUsername());
                    messageDTO.setTime(m.getTime());
                    messageDTOS.add(messageDTO);
                }
            });
        }
        return messageDTOS;
    }

    @Override
    @PostMapping(value = Constant.PATH_SAVE, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> createOrUpdate(@RequestBody MessageDTO json) {
//        try {
//            Message from = ResponseDTO.accepted().getObject(json, Message.class);
//            messageService.createOrUpdate(from);
//            return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
//        } catch (Exception ex) {
//            if (json.getId() == null)
//                return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, Constant.ERROR_INSERT));
//            else
//                return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, Constant.ERROR_UPDATE));
//        }
        return null;
    }

    @Override
    @DeleteMapping(value = Constant.PATH_DELETE, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> delete(@PathVariable  Long id) {
        try {
            messageService.delete(id);
        } catch (Exception ex) {
            return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, ex));
        }
        return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
    }

    @Override
    @GetMapping(value = Constant.PATH_FIND_BY_ID, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Message message = messageService.findById(id);
        if (message == null)
            return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, Constant.ERROR_NOT_FOUND));
        return ResponseEntity.status(HttpStatus.OK).body(ResponseDTO.accepted().getObject(message, MessageDTO.class));
    }

    @Override
    public ResponseEntity<?> buildResponseEntity(ApiMessage apiMessage) {
        return new ResponseEntity<>(apiMessage, apiMessage.getStatus());
    }
}
