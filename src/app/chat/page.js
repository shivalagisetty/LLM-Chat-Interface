'use client'

import React from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { MainContainer, ChatContainer, MessageList, Message, MessageInput } from "@chatscope/chat-ui-kit-react";
import chat from "../utils/model";

export default function Home() {
    const [messages, setMessages] = React.useState([]);

    const convertMsgToChat = (messages) => {
        const chatMessages = [];
        messages.forEach((msg) => {
            chatMessages.push({
                role: msg.sender,
                parts: msg.message,
                sentTime: msg.sentTime,
            })
        });
        return chatMessages;
    }


    const handleSend = async (text) => {
        setMessages([...messages, { message: text, sentTime: new Date(), sender: 'user' }]);
        const cHistory = convertMsgToChat(messages);
        const aiRes = await chat(cHistory, text);
        setMessages([...messages,
        { message: text, sentTime: new Date(), sender: 'user' },
        { message: aiRes, sentTime: new Date(), sender: 'model' }
        ])
    };

    return (
        <div style={{ position: 'relative', height: '100vh'}}>
            <MainContainer>
                <ChatContainer>
                    <MessageList className="text-black">
                        {messages.map((message, index) => (
                            <Message key={index} model={message}>
                                <Message.Header sender={message.sender} />
                            </Message>
                        ))}
                    </MessageList>
                    <MessageInput attachButton={false} placeholder="Type message here" onSend={handleSend} />
                </ChatContainer>
            </MainContainer>
        </div>
    );
}