import React, { useEffect, useState, useCallback } from 'react';
import { ChatSection } from '@components/Section';
import { getRoomChat, getChat } from '@apis/chat';
import { useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
const { REACT_APP_END_POINT } = process.env;
const Stomp = require('stompjs');

const ChatSectionContainer = () => {
  const { senderId, chatRoomId } = useParams();
  const [message, setMessage] = useState('');
  const [values, setValues] = useState({});
  function onError(e){
    console.log("STOMP ERROR",e);
  }
  const sockJS = new SockJS(`${REACT_APP_END_POINT}/chat`);
  let stomp = Stomp.over(sockJS);
  stomp.debug = null;

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    stomp.send(
      '/pub/chat.message',
      {},
      JSON.stringify({
        userId: values.senderId,
        roomId: values.chatRoomId,
        content: message,
      })
    );
    setValues({
      ...values,
      messages: [
        ...values.messages,
        {
          nickname: values.senderNickname,
          userId: values.senderId,
          roomId: values.chatRoomId,
          content: message,
          messageTime: `T${new Date().toTimeString()}`.split(' ')[0],
        },
      ],
    });
    setMessage('');
  };

  const init = useCallback(async () => {
    const { data } = chatRoomId.includes('id-')
      ? await getChat({ senderId, receiverId: chatRoomId.split('id-')[1] })
      : await getRoomChat({ senderId, chatRoomId });
    setValues({
      chatRoomId: data.chatRoomId,
      messages: data.messages,
      senderId: data.senderId,
      senderNickname: data.senderNickname,
    });
  }, [setValues, senderId, chatRoomId]);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (message || !values.chatRoomId) return;
    stomp.connect('admin','0116', function(frame)  {
      stomp.subscribe(`/exchange/chat.exchange/room.${chatRoomId}`, (msg) => {
        const newMessage = JSON.parse(msg.body);
        setValues({
          ...values,
          messages: [...values.messages, newMessage],
        });
      },{'auto-delete':true, 'durable':false, 'exclusive':false});
    },onError,'/');
    return () => {
      stomp.disconnect();
    };
  });

  return (
    <ChatSection
      values={values}
      message={message}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default ChatSectionContainer;
