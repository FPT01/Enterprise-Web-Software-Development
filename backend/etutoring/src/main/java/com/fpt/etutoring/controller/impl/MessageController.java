package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.dto.ResponseDTO;
import com.fpt.etutoring.dto.impl.MessageDTO;
import com.fpt.etutoring.entity.impl.Message;
import com.fpt.etutoring.service.MessageService;
import com.fpt.etutoring.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(Constant.PATH_MESSAGE)
@CrossOrigin
public class MessageController implements BaseController<MessageDTO, Long> {

    @Autowired
    private MessageService messageService;

    @Override
    @GetMapping(Constant.PATH)
    public List<MessageDTO> list() {
        List<Message> messages = messageService.list();
        List<MessageDTO> messageDTOS = new ArrayList<>();
        if (!StringUtils.isEmpty(messages)) {
            messages.forEach(m -> {
                MessageDTO messageDTO = ResponseDTO.accepted().getObject(m, MessageDTO.class);
                messageDTOS.add(messageDTO);
            });
        }
        return messageDTOS;
    }

    @Override
    @PostMapping(value = Constant.PATH_SAVE, consumes = "application/json", produces = "application/json")
    public MessageDTO createOrUpdate(@RequestBody MessageDTO json) {
        Message from = ResponseDTO.accepted().getObject(json, Message.class);
        Message message =  messageService.createOrUpdate(from);
        return ResponseDTO.accepted().getObject(message, MessageDTO.class);
    }

    @Override
    @DeleteMapping(value = Constant.PATH_DELETE, consumes = "application/json", produces = "application/json")
    public void delete(@PathVariable  Long id) {
        messageService.delete(id);
    }

    @Override
    @GetMapping(value = Constant.PATH_FIND_BY_ID, consumes = "application/json", produces = "application/json")
    public MessageDTO findById(@PathVariable Long id) {
        Message message = messageService.findById(id);
        return  ResponseDTO.accepted().getObject(message, MessageDTO.class);
    }
}
