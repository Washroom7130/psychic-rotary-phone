'use client';

import { useState } from "react";
import Image from 'next/image';

interface Message {
    text: string;
    sender: 'user' | 'bot';
    time: string;
}

export default function ChatBot() {
    const [showChat, setShowChat] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [chatMessages, setChatMessages] = useState<Message[]>([]);
    const [conversationId] = useState(Date.now().toString());
    const [loading, setLoading] = useState(false);
    const API_URL = 'https://quanhhth492005.app.n8n.cloud/webhook/ef8fac46-1be8-4bae-b59d-768bb490aa7b';

    const sendChatMessage = async () => {
        if (!chatInput.trim()) return;
      
        const newMessages: Message[] = [
          ...chatMessages,
          { text: chatInput, sender: 'user', time: new Date().toLocaleTimeString('vi-VN') },
        ];
        setChatMessages(newMessages);
        setChatInput('');
        setLoading(true);
      
        try {
          const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: chatInput,
              conversation_id: conversationId,
              userId: 'd84e7124-ae3c-4846-aa7f-d4f766622bca',
            }),
            signal: AbortSignal.timeout(15000),
          });
      
          const data = await response.json();
      
          const reply =
            (Array.isArray(data) && data[0]?.output) ||
            data.output ||
            data.message ||
            data.text ||
            'Không có phản hồi từ trợ lý.';
      
          setChatMessages([
            ...newMessages,
            { text: reply, sender: 'bot', time: new Date().toLocaleTimeString('vi-VN') },
          ]);
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Lỗi không xác định';
          setChatMessages([
            ...newMessages,
            {
              text: `Lỗi: ${errorMessage}. Vui lòng thử lại!`,
              sender: 'bot',
              time: new Date().toLocaleTimeString('vi-VN'),
            },
          ]);
        } finally {
          setLoading(false);
        }
      };

      const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !loading) {
          sendChatMessage();
        }
      };

    return (
        <>
                  <div className="chatbot-container">
        <button className="chatbot-toggle" onClick={() => setShowChat(!showChat)}>
          <Image src="/img/banners/chat-icon.png" alt="Chat" width={50} height={50} />
        </button>
        {showChat && (
          <div className="chatbot-window">
            <div className="chatbot-header">
              <h4>Trợ lý sự kiện</h4>
              <button className="chatbot-close" onClick={() => setShowChat(false)}>×</button>
            </div>
            <div className="chatbot-messages">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`chatbot-message ${msg.sender === 'user' ? 'user' : 'bot'}`}
                >
                  <p>{msg.text}</p>
                  <span className="chatbot-timestamp">{msg.time}</span>
                </div>
              ))}
              {loading && (
                <div className="chatbot-message bot">
                  <p>Đang xử lý...</p>
                </div>
              )}
            </div>
            <div className="chatbot-input">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Nhập nội dung..."
                disabled={loading}
              />
              <button onClick={sendChatMessage} disabled={loading}>Gửi</button>
            </div>
          </div>
        )}
      </div>

      {/* STYLE JSX CHATBOT */}
      <style jsx>{`
  .chatbot-container {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 1000;
    font-family: 'Segoe UI', sans-serif;
  }

  .chatbot-toggle {
    background: linear-gradient(135deg, #4a90e2, #357ABD);
    border: none;
    border-radius: 50%;
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 26px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    transition: all 0.3s ease;
  }

  .chatbot-toggle:hover {
    transform: scale(1.05);
    background: linear-gradient(135deg, #3f7fd1, #2f65aa);
  }

  .chatbot-window {
    width: 360px;
    height: 540px;
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    margin-top: 12px;
    overflow: hidden;
  }

  .chatbot-header {
    background: linear-gradient(to right, #4a90e2, #357ABD);
    color: white;
    padding: 14px 16px;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .chatbot-close {
    background: none;
    border: none;
    color: white;
    font-size: 22px;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .chatbot-close:hover {
    opacity: 0.7;
  }

  .chatbot-messages {
    flex: 1;
    padding: 16px;
    overflow-y: auto;
    background: #f3f6f9;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .chatbot-message {
    padding: 10px 14px;
    border-radius: 14px;
    max-width: 80%;
    word-break: break-word;
    position: relative;
    font-size: 14.5px;
    line-height: 1.4;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  }

.chatbot-message.user {
  background: #e1f5fe;
  color: #0d47a1;
  margin-left: auto;
  border-top-right-radius: 0;
  word-break: break-word; /* ✅ Giúp xuống dòng đúng */
  white-space: pre-wrap;  /* ✅ Giúp giữ xuống dòng đúng */
  text-align: left;       /* ✅ Đảm bảo canh lề trái cho dòng đầu và các dòng tiếp theo */
}

  .chatbot-message.bot {
    background: #fff3e0;
    color: #6d4c41;
    margin-right: auto;
    border-top-left-radius: 0;
  }

  .chatbot-timestamp {
    font-size: 11px;
    color: #999;
    margin-top: 4px;
    text-align: right;
  }

  .chatbot-input {
    display: flex;
    padding: 14px;
    border-top: 1px solid #e0e0e0;
    background: #fafafa;
  }

  .chatbot-input input {
    flex: 1;
    padding: 10px 14px;
    border: 1px solid #ccc;
    border-radius: 14px;
    font-size: 14px;
    outline: none;
    transition: border 0.2s;
  }

  .chatbot-input input:focus {
    border-color: #4a90e2;
  }

  .chatbot-input input:disabled {
    background: #f0f0f0;
    cursor: not-allowed;
  }

  .chatbot-input button {
    margin-left: 10px;
    padding: 10px 18px;
    background: #4a90e2;
    color: white;
    border: none;
    border-radius: 14px;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
  }

  .chatbot-input button:disabled {
    background: #9e9e9e;
    cursor: not-allowed;
  }

  .chatbot-input button:hover:not(:disabled) {
    background: #357ABD;
  }
`}</style>
        </>
    );
}