package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.controller.ResponseController;
import com.fpt.etutoring.dto.ResponseDTO;
import com.fpt.etutoring.dto.impl.*;
import com.fpt.etutoring.entity.impl.*;
import com.fpt.etutoring.error.ApiMessage;
import com.fpt.etutoring.service.DocumentCommentService;
import com.fpt.etutoring.service.DocumentService;
import com.fpt.etutoring.service.UserService;
import com.fpt.etutoring.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(Constant.PATH_DOCUMENT_COMMENT)
@CrossOrigin(value = {"*"}, exposedHeaders = {"Content-Disposition"})
public class DocumentCommentController extends ResponseController
        implements BaseController<DocumentCommentDTO, Long> {

    @Autowired
    private DocumentCommentService commentService;
    @Autowired
    private UserService userService;
    @Autowired
    private DocumentService documentService;

    @Override
    @GetMapping(Constant.PATH)
    public List<DocumentCommentDTO> list() {
        List<DocumentComment> documentComments = commentService.list();
        List<DocumentCommentDTO> documentCommentDTOS = new ArrayList<>();
        if (!CollectionUtils.isEmpty(documentComments)) {
            documentComments.forEach(b -> {
                DocumentCommentDTO documentCommentDTO = ResponseDTO.accepted()
                        .getObject(b, DocumentCommentDTO.class);
                if (b.getUser() != null) {
                    User u = b.getUser();
                    Role role = b.getUser().getRole();
                    role.setUsers(null);
                    u.setRole(role);
                    UserDTO userDTO = ResponseDTO.accepted().getObject(u, UserDTO.class);
                    documentCommentDTO.setUser(userDTO);
                }
                DocumentDTO documentDTO = new DocumentDTO();
                documentDTO.setId(b.getDocument().getId());
                documentCommentDTO.setDocumentDTO(documentDTO);
                documentCommentDTOS.add(documentCommentDTO);
            });
        }
        return documentCommentDTOS;
    }

    @Override
    @PostMapping(value = Constant.PATH_SAVE, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> createOrUpdate(@RequestBody DocumentCommentDTO json) {
        try {
            DocumentComment from = ResponseDTO.accepted().getObject(json, DocumentComment.class);
            if (json.getDocumentDTO() != null) {
                Document document = documentService.findById(json.getDocumentDTO().getId());
                from.setDocument(document);
            }
            if (json.getUser() != null) {
                User user = userService.findById(json.getUser().getId());
                from.setUser(user);
            }
            commentService.createOrUpdate(from);
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
            commentService.delete(id);
        } catch (Exception ex) {
            return buildResponseEntity(new ApiMessage(HttpStatus.OK, ex));
        }
        return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
    }

    @Override
    @GetMapping(value = Constant.PATH_FIND_BY_ID, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        DocumentComment documentComment = commentService.findById(id);
        if (documentComment == null)
            return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.ERROR_NOT_FOUND));
        DocumentCommentDTO dto = ResponseDTO.accepted().getObject(documentComment, DocumentCommentDTO.class);
        if (documentComment.getUser() != null) {
            User u = documentComment.getUser();
            Role role = documentComment.getUser().getRole();
            role.setUsers(null);
            u.setRole(role);
            UserDTO userDTO = ResponseDTO.accepted().getObject(u, UserDTO.class);
            dto.setUser(userDTO);
        }
        DocumentDTO documentDTO = new DocumentDTO();
        documentDTO.setId(documentComment.getDocument().getId());
        dto.setDocumentDTO(documentDTO);
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }
}
