package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.controller.ResponseController;
import com.fpt.etutoring.dto.ResponseDTO;
import com.fpt.etutoring.dto.impl.DocumentCommentDTO;
import com.fpt.etutoring.dto.impl.DocumentDTO;
import com.fpt.etutoring.dto.impl.UserDTO;
import com.fpt.etutoring.entity.impl.Document;
import com.fpt.etutoring.entity.impl.DocumentComment;
import com.fpt.etutoring.entity.impl.Role;
import com.fpt.etutoring.entity.impl.User;
import com.fpt.etutoring.error.ApiMessage;
import com.fpt.etutoring.service.DocumentService;
import com.fpt.etutoring.service.UserService;
import com.fpt.etutoring.storage.StorageService;
import com.fpt.etutoring.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(Constant.PATH_DOCUMENT)
@CrossOrigin(value = {"*"}, exposedHeaders = {"Content-Disposition"})
public class DocumentController extends ResponseController implements BaseController<DocumentDTO, Long> {

    @Autowired
    private DocumentService documentService;
    @Autowired
    private StorageService storageService;
    @Autowired
    private UserService userService;

    @PostMapping(value = Constant.PATH_SAVE_FILE)
    public ResponseEntity<?> upload(@NotNull @RequestParam("file") MultipartFile file) throws IOException {
        storageService.store(file);
        return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
    }

    @GetMapping(value = Constant.PATH_LOAD_FILE)
    public ResponseEntity<?> donwload(@NotNull @RequestParam("filename") String filename) throws IOException {
        Resource file = storageService.loadAsResource(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

    @Override
    @GetMapping(Constant.PATH)
    public List<DocumentDTO> list() {
        List<Document> documents = documentService.list();
        List<DocumentDTO> documentDTOS = new ArrayList<>();
        if (!CollectionUtils.isEmpty(documents)) {
            documents.forEach(d -> {
                DocumentDTO documentDTO = ResponseDTO.accepted().getObject(d, DocumentDTO.class);
                UserDTO user = documentDTO.getUser();
                if (user != null) {
                    user.setRole(null);
                    documentDTO.setUser(user);
                }
                if (!CollectionUtils.isEmpty(d.getDocumentComments())) {
                    Set<DocumentCommentDTO> documentCommentDTOS = new HashSet<>();
                    d.getDocumentComments().forEach(c -> {
                        if (c.getUser() != null) {
                            Role r = c.getUser().getRole();
                            r.setUsers(null);
                            c.getUser().setRole(r);
                        }
                        c.setDocument(null);
                        documentCommentDTOS.add(ResponseDTO.accepted().getObject(c, DocumentCommentDTO.class));
                    });
                    documentDTO.setDocumentCommentDTOS(documentCommentDTOS);
                }
                documentDTOS.add(documentDTO);
            });
        }
        return documentDTOS;
    }

    @Override
    @PostMapping(value = Constant.PATH_SAVE, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> createOrUpdate(@RequestBody DocumentDTO json) {
        try {
            Document from = ResponseDTO.accepted().getObject(json, Document.class);
            if (json.getUser() != null) {
                User user = userService.findById(json.getUser().getId());
                from.setUser(user);
            }
            documentService.createOrUpdate(from);
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
            Document document = documentService.findById(id);
            if (document != null && document.getUrl() != null) {
                storageService.deleteByFilename(document.getUrl());
            }
            documentService.delete(id);
        } catch (Exception ex) {
            return buildResponseEntity(new ApiMessage(HttpStatus.OK, ex));
        }
        return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
    }

    @Override
    @GetMapping(value = Constant.PATH_FIND_BY_ID, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Document document = documentService.findById(id);
        if (document == null)
            return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.ERROR_NOT_FOUND));

        User user = document.getUser();
        user.setRole(null);
        document.setUser(user);

        DocumentDTO dto = ResponseDTO.accepted().getObject(document, DocumentDTO.class);
        Set<DocumentCommentDTO> documentCommentDTOS = new HashSet<>();
        Set<DocumentComment> documentComments = document.getDocumentComments();
        if (!CollectionUtils.isEmpty(documentComments)) {
            documentComments.forEach(b -> {
                DocumentCommentDTO documentCommentDTO = new DocumentCommentDTO();
                if (b.getUser() != null) {
                    User u = b.getUser();
                    Role role = u.getRole();
                    role.setUsers(null);
                    u.setRole(role);
                    UserDTO userDTO = ResponseDTO.accepted().getObject(u, UserDTO.class);
                    documentCommentDTO.setUser(userDTO);
                }
                b.setDocument(null);
                documentCommentDTO = ResponseDTO.accepted().getObject(b, DocumentCommentDTO.class);
                documentCommentDTOS.add(documentCommentDTO);
            });
            dto.setDocumentCommentDTOS(documentCommentDTOS);
        }
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }
}
