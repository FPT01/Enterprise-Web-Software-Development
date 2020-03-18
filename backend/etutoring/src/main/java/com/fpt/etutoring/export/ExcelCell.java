package com.fpt.etutoring.export;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD})
public @interface ExcelCell {
    String value() default "";

    int width() default 11;

    String timeFormat() default "yyyy-MM-dd HH:mm:ss";
}
