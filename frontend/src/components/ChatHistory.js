import React from "react";
import { Box, Button, Divider } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";

const ChatHistory = ({
  chats,
  selectedChatId,
  setSelectedChatId,
  createNewChat,
  handleDialogOpen,
}) => {
  return (
    <Box
      marginBottom="8px"
      height="calc(99vh - 6px)"
      sx={{
        backgroundColor: "#202123", // 设置 ChatHistory 的背景为黑色
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ width: "90%", margin: "8px" }} // 设置容器的宽度和边距
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
            flex: 1, // 设置flex，使得这个按钮占据可用空间
            marginRight: "8px", // 为了在两个按钮之间留出一点空间
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
            sx={{ padding: "6px", gap: "2px" }}
          >
            <AddIcon sx={{ fontSize: 24 }} />
            New Chat
          </Box>
        </Button>

        <Button
          variant="contained"
          sx={{
            borderRadius: "10px",
            borderColor: "white",
            borderStyle: "solid",
            borderWidth: "2px",
            backgroundColor: "#202123",
            color: "white",
            width: "fit-content", // 设置按钮宽度为内容的宽度
            "&:hover": {
              backgroundColor: "darkgrey",
            },
          }}
          onClick={handleDialogOpen} // 假设有一个名为openSettings的函数来处理设置按钮的点击事件
        >
          <Box display="flex" alignItems="center" justifyContent="center">
            <SettingsIcon sx={{ fontSize: 30 }} />
          </Box>
        </Button>
      </Box>
      <Box
        height="calc(94vh - 15px)"
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
