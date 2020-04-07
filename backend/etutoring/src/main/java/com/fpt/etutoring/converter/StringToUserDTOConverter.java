package com.fpt.etutoring.converter;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;
import com.fasterxml.jackson.databind.util.Converter;
import com.fpt.etutoring.dto.impl.UserDTO;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class StringToUserDTOConverter implements Converter<String, UserDTO> {
    @Autowired
    private ObjectMapper objectMapper;

    @SneakyThrows
    @Override
    public UserDTO convert(String source) {
        return objectMapper.readValue(source, UserDTO.class);
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
