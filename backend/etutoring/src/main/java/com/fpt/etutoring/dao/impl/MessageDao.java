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

    @Query("SELECT m.sender.fullname, m.sender.username, m.time, count(m) FROM Message m " +
            "WHERE m.sender.id = :userId " +
            "GROUP BY m.sender.fullname, m.sender.username, m.time")
    List<Object[]> listMsgSenders(@Param("userId") Long userId);

    @Query("SELECT m.receiver.fullname, m.receiver.username, m.time, count(m) FROM Message m " +
            "WHERE m.receiver.id = :userId " +
            "GROUP BY m.receiver.fullname, m.receiver.username, m.time")
    List<Object[]> listMsgReceivers(@Param("userId") Long userId);

    @Query("SELECT m FROM Message m WHERE m.sender.id = :senderId AND m.receiver.id = :receiverId")
    List<Message> findBySenderReceiver(@Param("senderId") Long senderId, @Param("receiverId") Long receiverId);

}
