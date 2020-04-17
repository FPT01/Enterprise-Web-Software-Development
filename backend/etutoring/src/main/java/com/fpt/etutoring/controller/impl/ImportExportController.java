package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.util.Constant;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(Constant.PATH_IMPORT_EXPORT)
@CrossOrigin(value = {"*"}, exposedHeaders = {"Content-Disposition"})
public class ImportExportController {
}