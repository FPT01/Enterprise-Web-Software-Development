package com.fpt.etutoring.dto.impl;

import lombok.Data;

@Data
public class StatisticDTO {
    private Long lastSevenDays;
    private Long userId;
    private String fullname;
    private Float averageMsg;
}
