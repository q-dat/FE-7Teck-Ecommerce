import React, { useEffect, useRef } from 'react';
import { useChat } from '../../context/chat/ChatContext';

type ChatBoxProps = {
  sender: 'user' | 'admin';
};

const ChatBox: React.FC<ChatBoxProps> = ({ sender }) => {
  const { messages, fetchMessages } = useChat();

  useEffect(() => {
    fetchMessages();
  }, []);

  const chatBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div
      ref={chatBoxRef}  
      className="h-[300px] w-[300px] space-y-2 overflow-y-auto scrollbar-hide xl:h-[300px]"
    >
      {messages.map(message => (
        <div
          key={message._id}
          className={`w-full rounded-md bg-white text-black ${message.sender}`}
        >
          <div className="rounded-md border border-dotted shadow border-gray-50 p-1">
            <p className="font-light text-xs text-black">
              {message.sender === sender ? 'Bạn' : 'Hỗ trợ'}:
              <span className="w-full text-sm font-semibold text-blue-500">
                {' '}
                {message.content}
              </span>
            </p>
            <p className="text-xs font-light">
              {new Date(message.timestamp).toLocaleTimeString('vi-VN')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
