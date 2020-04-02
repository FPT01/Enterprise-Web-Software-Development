'use strict';

function connect() {
    var socket = new SockJS('/ws');
    var stompClient = Stomp.over(socket);

    stompClient.connect({}, onConnected, onError);
    console.log(">>>>>>>>> connected");
}
