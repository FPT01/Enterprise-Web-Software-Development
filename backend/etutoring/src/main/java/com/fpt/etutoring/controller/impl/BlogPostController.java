package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.controller.ResponseController;
import com.fpt.etutoring.dto.ResponseDTO;
import com.fpt.etutoring.dto.impl.BlogCommentDTO;
import com.fpt.etutoring.dto.impl.BlogPostDTO;
import com.fpt.etutoring.dto.impl.UserDTO;
import com.fpt.etutoring.entity.impl.BlogComment;
import com.fpt.etutoring.entity.impl.BlogPost;
import com.fpt.etutoring.entity.impl.Role;
import com.fpt.etutoring.entity.impl.User;
import com.fpt.etutoring.error.ApiMessage;
import com.fpt.etutoring.service.BlogPostService;
import com.fpt.etutoring.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(Constant.PATH_BLOG_POST)
@CrossOrigin
public class BlogPostController extends ResponseController implements BaseController<BlogPostDTO, Long> {
    @Autowired
    private BlogPostService blogPostService;

    @Override
    @GetMapping(Constant.PATH)
    public List<BlogPostDTO> list() {
        List<BlogPost> blogPosts = blogPostService.list();
        List<BlogPostDTO> blogPostDTOS = new ArrayList<>();
        if(!CollectionUtils.isEmpty(blogPosts)) {
            blogPosts.forEach(b -> {
                BlogPostDTO blogPostDTO = ResponseDTO.accepted().getObject(b, BlogPostDTO.class);
                if (b.getUser() != null) {
                    User u = b.getUser();
                    Role role = b.getUser().getRole();
                    role.setUsers(null);
                    u.setRole(role);
                    UserDTO userDTO = ResponseDTO.accepted().getObject(u, UserDTO.class);
                    blogPostDTO.setUser(userDTO);
                }
                if (!CollectionUtils.isEmpty(b.getBlogComments())) {
                    Set<BlogCommentDTO> blogCommentDTOS = new HashSet<>();
                    b.getBlogComments().forEach(c -> {
                        if (c.getUser() != null) {
                            Role r = c.getUser().getRole();
                            r.setUsers(null);
                            c.getUser().setRole(r);
                        }
                        c.setBlogPost(null);
                        blogCommentDTOS.add(ResponseDTO.accepted().getObject(c, BlogCommentDTO.class));
                    });
                    blogPostDTO.setBlogComments(blogCommentDTOS);
                }
                blogPostDTOS.add(blogPostDTO);
            });
        }
        return blogPostDTOS;
    }

    @Override
    @PostMapping(value = Constant.PATH_SAVE, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> createOrUpdate(@RequestBody BlogPostDTO json) {
        try {
            BlogPost from = ResponseDTO.accepted().getObject(json, BlogPost.class);
            blogPostService.createOrUpdate(from);
            return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
        } catch (Exception ex) {
            if (json.getId() == null)
                return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.ERROR_INSERT));
            else
                return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.ERROR_UPDATE));
        }
    }

    @Override
    @DeleteMapping(value = Constant.PATH_DELETE, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            blogPostService.delete(id);
        } catch (Exception ex) {
            return buildResponseEntity(new ApiMessage(HttpStatus.OK, ex));
        }
        return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
    }

    @Override
    @GetMapping(value = Constant.PATH_FIND_BY_ID, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        BlogPost blogPost = blogPostService.findById(id);
        if (blogPost == null)
            return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.ERROR_NOT_FOUND));
        BlogPostDTO dto = ResponseDTO.accepted().getObject(blogPost, BlogPostDTO.class);
        if (blogPost.getUser() != null) {
            User u = blogPost.getUser();
            Role role = blogPost.getUser().getRole();
            role.setUsers(null);
            u.setRole(role);
            UserDTO userDTO = ResponseDTO.accepted().getObject(u, UserDTO.class);
            dto.setUser(userDTO);
        }
        Set<BlogCommentDTO> blogCommentDTOS = new HashSet<>();
        Set<BlogComment> blogComments = blogPost.getBlogComments();
        if (!CollectionUtils.isEmpty(blogComments)) {
            blogComments.forEach(b -> {
                BlogCommentDTO blogCommentDTO = new BlogCommentDTO();
                if (b.getUser() != null) {
                    User u = b.getUser();
                    Role role = b.getUser().getRole();
                    role.setUsers(null);
                    u.setRole(role);
                    UserDTO userDTO = ResponseDTO.accepted().getObject(u, UserDTO.class);
                    blogCommentDTO.setUser(userDTO);
                }
                b.setBlogPost(null);
                blogCommentDTO = ResponseDTO.accepted().getObject(b, BlogCommentDTO.class);
                blogCommentDTOS.add(blogCommentDTO);
            });
            dto.setBlogComments(blogCommentDTOS);
        }
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    @Override
    public ResponseEntity<?> buildResponseEntity(ApiMessage apiMessage) {
        return new ResponseEntity<>(apiMessage, apiMessage.getStatus());
    }
}
