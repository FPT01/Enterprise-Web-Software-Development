package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.dto.ResponseDTO;
import com.fpt.etutoring.dto.impl.BlogCommentDTO;
import com.fpt.etutoring.dto.impl.UserDTO;
import com.fpt.etutoring.entity.impl.BlogComment;
import com.fpt.etutoring.entity.impl.Role;
import com.fpt.etutoring.entity.impl.User;
import com.fpt.etutoring.error.ApiMessage;
import com.fpt.etutoring.service.BlogCommentService;
import com.fpt.etutoring.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(Constant.PATH_BLOG_COMMENT)
@CrossOrigin
public class BlogCommentController implements BaseController<BlogCommentDTO, Long> {
    @Autowired
    private BlogCommentService blogCommentService;

    @Override
    @GetMapping(Constant.PATH)
    public List<BlogCommentDTO> list() {
        List<BlogComment> blogComments = blogCommentService.list();
        List<BlogCommentDTO> blogCommentDTOS = new ArrayList<>();
        if (!CollectionUtils.isEmpty(blogComments)) {
            blogComments.forEach(b -> {
                BlogCommentDTO blogCommentDTO = ResponseDTO.accepted().getObject(b, BlogCommentDTO.class);
                if (b.getUser() != null) {
                    User u = b.getUser();
                    Role role = b.getUser().getRole();
                    role.setUsers(null);
                    u.setRole(role);
                    UserDTO userDTO = ResponseDTO.accepted().getObject(u, UserDTO.class);
                    blogCommentDTO.setUser(userDTO);
                }
                blogCommentDTOS.add(blogCommentDTO);
            });
        }
        return blogCommentDTOS;
    }

    @Override
    @PostMapping(value = Constant.PATH_SAVE, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> createOrUpdate(@RequestBody BlogCommentDTO json) {
        try {
            BlogComment from = ResponseDTO.accepted().getObject(json, BlogComment.class);
            blogCommentService.createOrUpdate(from);
            return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
        } catch (Exception ex) {
            if (json.getId() == null)
                return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, Constant.ERROR_INSERT));
            else
                return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, Constant.ERROR_UPDATE));
        }
    }

    @Override
    @DeleteMapping(value = Constant.PATH_DELETE, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            blogCommentService.delete(id);
        } catch (Exception ex) {
            return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, ex));
        }
        return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
    }

    @Override
    @GetMapping(value = Constant.PATH_FIND_BY_ID, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        BlogComment blogComment = blogCommentService.findById(id);
        if (blogComment == null)
            return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, Constant.ERROR_NOT_FOUND));
        BlogCommentDTO dto = ResponseDTO.accepted().getObject(blogComment, BlogCommentDTO.class);
        if (blogComment.getUser() != null) {
            User u = blogComment.getUser();
            Role role = blogComment.getUser().getRole();
            role.setUsers(null);
            u.setRole(role);
            UserDTO userDTO = ResponseDTO.accepted().getObject(u, UserDTO.class);
            dto.setUser(userDTO);
        }
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    @Override
    public ResponseEntity<?> buildResponseEntity(ApiMessage apiMessage) {
        return new ResponseEntity<>(apiMessage, apiMessage.getStatus());
    }
}
