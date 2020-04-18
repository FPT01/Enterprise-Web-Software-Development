package com.fpt.etutoring.util;

public class Constant {
    // Export
    public static final String SHEETNAME = "Report";
    public static final String SUFFIX_XLSX = ".xlsx";
    public static final String EXPORT_2007 = "export2007_"
            + System.currentTimeMillis() + SUFFIX_XLSX;

    // URL
    public static final String PATH_API = "/api";
    public static final String PATH_VARIABLE_ID =  "{id}";
    public static final String PATH_VARIABLE_USERNAME =  "{username}";
    public static final String PATH_LOGIN = "/login";
    public static final String PATH_USER = PATH_API + "/user";
    public static final String PATH_ROLE = PATH_API + "/role";
    public static final String PATH_TUTOR = PATH_API +  "/tutor";
    public static final String PATH_STUDENT =  PATH_API + "/student";
    public static final String PATH_MEETING =  PATH_API + "/meeting";
    public static final String PATH_ALLOCATE = PATH_API + "/allocate";
    public static final String PATH = "/";
    public static final String PATH_SAVE = "/save";
    public static final String PATH_DELETE = "/delete" + PATH + PATH_VARIABLE_ID;
    public static final String PATH_DELETE_BY_ROOM_ID = "/deleteByRoomId" + PATH + PATH_VARIABLE_ID;
    public static final String PATH_FIND_BY_ID = "/findById" + PATH + PATH_VARIABLE_ID;
    public static final String PATH_FIND_BY_USERNAME = "/findByUsername" + PATH + PATH_VARIABLE_USERNAME;
    public static final String PATH_FIND_BY_ROOM_ID = "/findByRoomId" + PATH + PATH_VARIABLE_ID;
    public static final String PATH_CHECK_STUDENT_EXIST = "/checkStudentExist" + PATH + PATH_VARIABLE_ID;
    public static final String PATH_MESSAGE = PATH_API + "/message";
    public static final String PATH_DOCUMENT = PATH_API + "/document";
    public static final String PATH_COMMENT = PATH_API + "/comment";
    public static final String PATH_DASHBOARD_INFO = PATH_API + "/dashboardinfo";
    public static final String PATH_NOTIFICATION = PATH_API + "/notification";
    public static final String PATH_ROOM = PATH_API + "/room";
    public static final String ERROR_INSERT = "Insert Error";
    public static final String ERROR_UPDATE = "Edit Error";
    public static final String ERROR_NOT_FOUND = "Data not found";
    public static final String MSG_SUCCESS = "Success";
    public static final String ERROR_LOGIN = "Username or password is invalid";
    public static final String ERROR_DELETE = "Delete Error";
    public static final String PATH_BLOG_POST = PATH_API + "/blogpost";
    public static final String PATH_BLOG_COMMENT = PATH_API + "/blogcomment";
    public static final String PATH_STATISTIC = PATH_API + "/statistic";
    public static final String PATH_LAST_SEVEN_DAYS = "/lastsevendays";
    public static final String PATH_AVG_MSG = "/avgmsg";
    public static final String PATH_SEND_MSG = "/sendMessage";
    public static final String PATH_TOPIC_PUBLIC = "/topic/pubic";
    public static final String PATH_ADD_USER = "/addUser";
    public static final String PATH_EXPORT = "/export";
    public static final String PATH_STUDENT_WITHOUT_TUTOR = PATH_EXPORT + "/studentwithouttutor";
    public static final String PATH_STUDENT_WITH_NO_INTERACTION = PATH_EXPORT + "/studentwithnointeraction";
    public static final String EXCEL_STUDENT_WITHOUT_TUTOR = "StudentWithoutTutor.xlsx";
    public static final String EXCEL_STUDENT_WITH_NO_INTERACTION = "StudentWithNoInteraction.xlsx";
    public static final String EXCEL_STUDENT_AND_TUTOR = "StudentAndTutor.xlsx";
    public static final String PATH_LOAD_FILE = "/loadfile";
    public static final String PATH_SAVE_FILE = "/savefile";
    public static final String PATH_RESET_PASSWORD = PATH_API + "/resetpassword";
    public static final String EMAIL_TITLE = "New password";
    public static final String CHAT_GREETINGS = "/greetings";
    public static final String CHAT_TOPIC_GREETINGS = "/topic/greetings";
    public static final String CHAT_GET_ALL = "/getall";
    public static final String CHAT_TOPIC_GETALL = "/topic/getall";
    public static final String PATH_IMPORT_EXPORT = PATH_API + "/importexport";
}
