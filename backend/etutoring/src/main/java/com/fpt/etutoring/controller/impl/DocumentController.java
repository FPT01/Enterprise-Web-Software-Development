package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.dto.ResponseDTO;
import com.fpt.etutoring.dto.impl.DocumentDTO;
import com.fpt.etutoring.entity.impl.Document;
import com.fpt.etutoring.service.DocumentService;
import com.fpt.etutoring.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(Constant.PATH_DOCUMENT)
@CrossOrigin
public class DocumentController implements BaseController<DocumentDTO, Long> {

    @Autowired
    private DocumentService documentService;

    @Override
    @GetMapping(Constant.PATH)
    public List<DocumentDTO> list() {
        List<Document> documents = documentService.list();
        List<DocumentDTO> documentDTOS = new ArrayList<>();
        if (!CollectionUtils.isEmpty(documents)) {
            documents.forEach(d -> {
                DocumentDTO documentDTO = ResponseDTO.accepted().getObject(d, DocumentDTO.class);
                documentDTOS.add(documentDTO);
            });
        }
        return documentDTOS;
    }

    @Override
    @PostMapping(value = Constant.PATH_SAVE, consumes = "application/json", produces = "application/json")
    public DocumentDTO createOrUpdate(@RequestBody DocumentDTO json) {
        Document from = ResponseDTO.accepted().getObject(json, Document.class);
        Document document = documentService.createOrUpdate(from);
        return ResponseDTO.accepted().getObject(document, DocumentDTO.class);
    }

    @Override
    @DeleteMapping(value = Constant.PATH_DELETE, consumes = "application/json", produces = "application/json")
    public void delete(@PathVariable Long id) {
        documentService.delete(id);
    }

    @Override
    @GetMapping(value = Constant.PATH_FIND_BY_ID, consumes = "application/json", produces = "application/json")
    public DocumentDTO findById(@PathVariable Long id) {
        Document document = documentService.findById(id);
        return ResponseDTO.accepted().getObject(document, DocumentDTO.class);
    }
}
