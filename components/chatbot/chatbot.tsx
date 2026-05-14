"use client";

import React, { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { MessageSquare, X, Send, Bot } from "lucide-react";
import styles from "./chatbot.module.scss";

export default function Chatbot({ lang = "es" }: { lang?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { lang }
    }),
    messages: [
      {
        id: "welcome-message",
        role: "assistant",
        parts: [{ 
          type: "text", 
          text: lang === "es" 
            ? "¡Hola! Soy el asistente virtual de Camilo. ¿Tienes alguna pregunta sobre su experiencia, proyectos o habilidades?" 
            : "Hello! I am Camilo's virtual assistant. Do you have any questions about his experience, projects, or skills?"
        }]
      } as UIMessage
    ]
  });

  const isLoading = status === "streaming" || status === "submitted";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ role: 'user', parts: [{ type: 'text', text: input }] });
    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className={`${styles.floatingButton} ${isOpen ? styles.hidden : ""}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open chat assistant"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <div className={`${styles.chatWindow} ${isOpen ? styles.open : ""}`}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <Bot size={20} className={styles.botIcon} />
            <span>{lang === "es" ? "Asistente de Reclutamiento" : "Recruitment Assistant"}</span>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.messagesContainer}>
          {messages.map(m => (
            <div key={m.id} className={`${styles.messageWrapper} ${m.role === 'user' ? styles.userWrapper : styles.assistantWrapper}`}>
              {m.role !== 'user' && (
                <div className={styles.avatar}>
                  <Bot size={16} />
                </div>
              )}
              <div className={`${styles.message} ${m.role === 'user' ? styles.userMessage : styles.assistantMessage}`}>
                {m.parts.map((part, index) => {
                  if (part.type === 'text') {
                    return <span key={index}>{part.text}</span>;
                  }
                  return null;
                })}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className={`${styles.messageWrapper} ${styles.assistantWrapper}`}>
              <div className={styles.avatar}>
                <Bot size={16} />
              </div>
              <div className={`${styles.message} ${styles.assistantMessage}`}>
                <span className={styles.dotFlashing}></span>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <input
            className={styles.inputField}
            value={input}
            placeholder={lang === "es" ? "Escribe tu pregunta..." : "Type your question..."}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <button type="submit" className={styles.sendButton} disabled={isLoading || !input.trim()}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  );
}
