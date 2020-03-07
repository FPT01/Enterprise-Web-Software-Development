package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.dto.ResponseDTO;
import com.fpt.etutoring.dto.impl.CommentDTO;
import com.fpt.etutoring.entity.impl.Comment;
import com.fpt.etutoring.service.CommentService;
import com.fpt.etutoring.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(Constant.PATH_COMMENT)
@CrossOrigin
public class CommentController implements BaseController<CommentDTO, Long> {
    @Autowired
    private CommentService commentService;

    @Override
    @GetMapping(Constant.PATH)
    public List<CommentDTO> list() {
        List<Comment> comments = commentService.list();
        List<CommentDTO> commentDTOS = new ArrayList<>();
        if (!CollectionUtils.isEmpty(comments)) {
            comments.forEach(c -> {
                CommentDTO commentDTO = ResponseDTO.accepted().getObject(c, CommentDTO.class);
                commentDTOS.add(commentDTO);
            });
        }
        return commentDTOS;
    }

    @Override
    @PostMapping(value = Constant.PATH_SAVE, consumes = "application/json", produces = "application/json")
    public CommentDTO createOrUpdate(CommentDTO json) {
       // Comment from =
        return null;
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public CommentDTO findById(Long id) {
        return null;
    }
}
