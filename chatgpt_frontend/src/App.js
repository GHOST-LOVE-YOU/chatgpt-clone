import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import ChatHistory from "./components/ChatHistory";
import ChatUI from "./components/ChatUI";

const baseURL =
  // process.env.REACT_APP_BACKEND_URL ||
  "http://127.0.0.1:8000/api";

function App() {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [isAssistantTyping, setIsAssistantTyping] = useState(false);

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (selectedChatId) {
      fetchMessages(selectedChatId);
    } else {
      setMessages([]);
    }
  }, [selectedChatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  const fetchChats = async () => {
    try {
      const response = await axios.get(`${baseURL}/chats/`);
      setChats(response.data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const fetchMessages = async (chatId) => {
    try {
      const response = await axios.get(`${baseURL}/chats/${chatId}/`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    // Update the local state before sending the message to the backend
    setMessages([
      ...messages,
      {
        content: inputMessage,
        role: "user",
      },
    ]);
    setInputMessage("");
    setIsAssistantTyping(true);

    try {
      // Simulate a delay for the typewriting effect
      const delay = 1000 + Math.random() * 1000; // Random delay between 1-2 seconds
      setTimeout(async () => {
        try {
          const response = await axios.post(`${baseURL}/chats/`, {
            chat_id: selectedChatId || undefined,
            message: inputMessage,
          });

          // If there was no selected chat, set the selected chat to the newly created one
          if (!selectedChatId) {
            setSelectedChatId(response.data.chat_id);
            setChats([{ id: response.data.chat_id }, ...chats]);
          } else {
            fetchMessages(selectedChatId);
          }
        } catch (error) {
          console.error("Error sending message:", error);
          setMessages([
            ...messages,
            {
              content:
                "⚠️ An error occurred while sending the message. Please make sure the backend is running and OPENAI_API_KEY is set in the .env file.",
              role: "assistant",
            },
          ]);
        } finally {
          setIsAssistantTyping(false);
        }
      }, delay);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const createNewChat = async () => {
    try {
      const response = await axios.post(`${baseURL}/chats/`);
      const newChat = response.data;

      setChats([newChat, ...chats]);
      setSelectedChatId(newChat.id);
    } catch (error) {
      console.error("Error creating a new chat:", error);
    }
  };

  const AssistantTypingIndicator = () => (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Box m={1}>{/* You can use an avatar here */}</Box>
      <Box m={1}>
        <CircularProgress size={20} />
      </Box>
    </Box>
  );

  return (
    <Box display="flex" height="calc(99vh + 10px)" overflowY="hidden" backgroundColor="#343541">
      <Box minWidth={255} maxWidth={255} overflowY="auto" >
        <ChatHistory
          {...{ chats, selectedChatId, setSelectedChatId, createNewChat }}
        />
      </Box>
      <Box flexGrow={1}>
        <ChatUI
          {...{
            messages,
            inputMessage,
            setInputMessage,
            sendMessage,
            isAssistantTyping,
            messagesEndRef,
          }}
        />
        {isAssistantTyping && <AssistantTypingIndicator />}{" "}
        {/* Display the typing indicator when the assistant is typing */}
      </Box>
    </Box>
  );
}

export default App;
