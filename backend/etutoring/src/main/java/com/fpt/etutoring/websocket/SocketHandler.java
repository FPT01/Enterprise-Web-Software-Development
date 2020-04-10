/*
package com.fpt.etutoring.websocket;

import com.fpt.etutoring.entity.impl.Message;
import com.fpt.etutoring.entity.impl.User;
import com.google.gson.Gson;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class SocketHandler extends TextWebSocketHandler {
    @PersistenceContext
    private EntityManager entityManager;

    List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();

    private User findById(long id) {
        return entityManager.find(User.class, id);
    }

    @Override
    public synchronized void handleTextMessage(WebSocketSession session, TextMessage message)
            throws InterruptedException, IOException {
        Map<String, String> value = new Gson().fromJson(message.getPayload(), Map.class);
//		for(WebSocketSession webSocketSession : sessions) {
//			webSocketSession.sendMessage(new TextMessage("Hello " + value.get("name") + " !"));
//		}
        Message msg = new Message();
        Long userId = Long.valueOf(value.get("userId"));
        if(userId != null) {
            User user = findById(userId);
            msg.setUser(user);
        }
        msg.setContent(value.get("msg"));
        //messageService.createOrUpdate(msg);
        session.sendMessage(new TextMessage(value.get("msg")));
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        //the messages will be broadcasted to all users.
        sessions.add(session);
    }
}
*/
