package com.fpt.etutoring.dto.impl;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class SummaryDTO {
    private List<UserMsg> senders = new ArrayList<>();
    private List<UserMsg> receivers = new ArrayList<>();
    private Long totalMeetings;
    private Long totalBlogPost;
    private Long totalBlogComment;

    @Getter
    @Setter
    public static class UserMsg {
        private String username;
        private String fullname;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-M-yyyy hh:mm:ss")
        private Date time;
        private Long counter;
    }
}
