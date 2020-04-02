package com.fpt.etutoring.converter;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;
import com.fasterxml.jackson.databind.util.Converter;
import com.fpt.etutoring.dto.impl.DashboardInfoDTO;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class StringToDashboardInfoDTOConverter implements Converter<String, DashboardInfoDTO> {
    @Autowired
    private ObjectMapper objectMapper;

    @SneakyThrows
    @Override
    public DashboardInfoDTO convert(String source) {
        return objectMapper.readValue(source, DashboardInfoDTO.class);
    }

    @Override
    public JavaType getInputType(TypeFactory typeFactory) {
        return null;
    }

    @Override
    public JavaType getOutputType(TypeFactory typeFactory) {
        return null;
    }
}
