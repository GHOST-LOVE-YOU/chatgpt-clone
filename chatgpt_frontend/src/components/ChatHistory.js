import React from "react";
import { Box, Button, Divider } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

const ChatHistory = ({
  chats,
  selectedChatId,
  setSelectedChatId,
  createNewChat,
}) => {
  return (
    <Box
      marginBottom="8px"
      height="100vh"
      sx={{
        backgroundColor: "#202123", // 设置 ChatHistory 的背景为黑色
      }}
    >
      <Button
        variant="contained"
        sx={{
          borderRadius: "10px",
          borderColor: "white",
          borderStyle: "solid",
          borderWidth: "2px",
          backgroundColor: "#202123",
          color: "white",
          width: "90%",
          margin: "8px",
          "&:hover": {
            backgroundColor: "darkgrey",
          },
        }}
        onClick={createNewChat}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ padding: "8px", gap: "8px" }}
        >
          <ChatIcon sx={{ fontSize: 24 }} />
          New Chat
        </Box>
      </Button>
      <Box
        height="calc(94vh - 30px)"
        overflow="auto"
        sx={{
          "&:not(:hover)": {
            "&::-webkit-scrollbar": {
              width: "0", // 隐藏滚动条
            },
          },
          "&:hover": {
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "darkgrey",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "grey",
            },
            scrollbarWidth: "thin",
          },
        }}
      >
        {chats.map((chat, index) => (
          <Box
            key={chat.id}
            onClick={() => setSelectedChatId(chat.id)}
            my={2}
            mx={1}
            bgcolor={selectedChatId === chat.id ? "#343541" : "#202123"}
            color={selectedChatId === chat.id ? "white" : "white"}
            borderRadius={selectedChatId === chat.id ? "10px" : "0"}
          >
            <Box
              display="flex"
              alignItems="center"
              sx={{ padding: "8px", gap: "8px" }}
            >
              <ChatIcon sx={{ fontSize: 24 }} />
              <Box p={1}>Chat {chats.length - index}</Box>
            </Box>
            {index !== chats.length - 1 && <Divider />}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ChatHistory;
