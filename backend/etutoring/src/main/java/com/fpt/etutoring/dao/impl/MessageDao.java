package com.fpt.etutoring.dao.impl;

import com.fpt.etutoring.entity.impl.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface MessageDao extends JpaRepository<Message, Long> {

    @Query("SELECT count(m) FROM Message m WHERE m.time >= :time")
    Long getMessagesLastSevenDays(@Param("time") Date time);

//    @Query("SELECT m FROM Message m " +
//            "WHERE m.sender.role.roleName = :roleName " +
//            "OR m.receiver.role.roleName = :roleName")
//    List<Message> getMessageByRoleName(@Param("roleName") String roleName);

//    @Query("SELECT count(m) FROM Message m WHERE m.user.id = :userId")
//    Long getTotalMessageByUserId(@Param("userId") Long userId);

    @Query("SELECT m.receiver, m.time, count(m) FROM Message m " +
            "GROUP BY m.receiver, m.time HAVING m.sender.id = :userId")
    List<Object> listMsgSenders(@Param("userId") Long userId);

    @Query("SELECT m.sender, m.time, count(m) FROM Message m " +
            "GROUP BY m.sender, m.time HAVING m.receiver.id = :userId")
    List<Object> listMsgReceivers(@Param("userId") Long userId);

}
