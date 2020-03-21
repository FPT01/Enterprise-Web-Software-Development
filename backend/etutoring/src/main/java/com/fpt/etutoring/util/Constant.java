package com.fpt.etutoring.util;

public class Constant {
    // Export
    public static final String SHEETNAME = "Report";
    public static final String SUFFIX_XLSX = ".xlsx";
    public static final String EXPORT_2007 = "export2007_"
            + System.currentTimeMillis() + SUFFIX_XLSX;

    // URL
    public static final String PATH_VARIABLE_ID =  "{id}";
    public static final String PATH_LOGIN =  "/login";
    public static final String PATH_USER =  "/user";
    public static final String PATH_ROLE = "/role";
    public static final String PATH_TUTOR = "/tutor";
    public static final String PATH_STUDENT = "/student";
    public static final String PATH_MEETING = "/meeting";
    public static final String PATH_ALLOCATE = "/allocate";
    public static final String PATH = "/";
    public static final String PATH_SAVE = "/save";
    public static final String PATH_DELETE = "/delete" + PATH + PATH_VARIABLE_ID;
    public static final String PATH_FIND_BY_ID = "/findById" + PATH + PATH_VARIABLE_ID;
    public static final String PATH_MESSAGE = "/message";
    public static final String PATH_DOCUMENT = "/document";
    public static final String PATH_COMMENT = "/comment";
    public static final String PATH_DASHBOARD_INFO = "/dashboardinfo";
    public static final String PATH_NOTIFICATION = "/notification";
    public static final String PATH_ROOM = "/room";
    public static final String ERROR_INSERT = "Insert Error";
    public static final String ERROR_UPDATE = "Edit Error";
    public static final String ERROR_NOT_FOUND = "Data not found";
    public static final String MSG_SUCCESS = "Success";
    public static final String ERROR_LOGIN = "Username or password is invalid";
    public static final String ERROR_DELETE = "Delete Error";
    public static final String PATH_BLOG_POST = "/blogpost";
    public static final String PATH_BLOG_COMMENT = "/blogcomment";
    public static final String PATH_FILE_SERVER = "/fileserver";
    public static final String PATH_STATISTIC = "/statistic";
    public static final String PATH_LAST_SEVEN_DAYS = "/lastsevendays";
    public static final String PATH_AVG_MSG = "/avgmsg";
    public static final String PATH_SEND_MSG = "/sendMessage";
    public static final String PATH_TOPIC_PUBLIC = "/topic/pubic";
    public static final String PATH_ADD_USER = "/addUser";
    public static final String PATH_SEND_PRIVATE_MSG = "/sendPrivateMessage";
    public static final String PATH_REPLY = "/reply";
    public static final String PATH_ADD_PRIVATE_USER = "/addPrivateUser";
    public static final String PATH_QUEUE_REPLY = "/queue" + PATH_REPLY;
    public static final String PATH_EXPORT = "/export";
    public static final String PATH_STUDENT_WITHOUT_TUTOR = PATH_EXPORT + "/studentwithouttutor";
    public static final String PATH_STUDENT_WITH_NO_INTERACTION = PATH_EXPORT + "/studentwithnointeraction";
    public static final String EXCEL_STUDENT_WITHOUT_TUTOR = "StudentWithoutTutor.xlsx";
    public static final String EXCEL_STUDENT_WITH_NO_INTERACTION = "StudentWithNoInteraction.xlsx";
}
