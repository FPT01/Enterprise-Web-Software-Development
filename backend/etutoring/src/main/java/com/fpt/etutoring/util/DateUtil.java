package com.fpt.etutoring.util;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

public class DateUtil {
    public static Date getLastSevenDays() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime then = now.minusDays(7);
        return Date.from(then.atZone(ZoneId.systemDefault()).toInstant());
    }

    public static boolean isSameDay(Date date1, Date date2) {
        LocalDate localDate1 = date1.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
        LocalDate localDate2 = date2.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
        return localDate1.isEqual(localDate2);
    }
}
