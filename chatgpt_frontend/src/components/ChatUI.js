import React, { useState } from "react";
import {
  Box,
  IconButton,
  Avatar,
  Container,
  Link,
  Card,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import GitHubIcon from "@mui/icons-material/GitHub";
import TextareaAutosize from "react-textarea-autosize";

// 一键复制代码块
const CodeBlock = ({ language, value }) => {
  const [isCopied, setIsCopied] = useState(false);
  const codeBlockStyles = {
    backgroundColor: "black",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
    color: "white",
    padding: "4px",
    overflow: "auto",
    position: "relative",
    scrollbarWidth: "thin", // for Firefox
    scrollbarColor: "#888 #f1f1f1", // for Firefox
    "&::-webkit-scrollbar": {
      width: "12px", // for WebKit browsers
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1", // for WebKit browsers
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#888", // for WebKit browsers
      "&:hover": {
        background: "#555", // for WebKit browsers
      },
    },
  };

  const languageStyles = {
    margin: "0",
    lineHeight: "1",
    fontSize: "16px",
  };

  const copyButtonStyles = {
    padding: "4px",
    backgroundColor: "transparent",
  };

  const copyIconStyles = {
    color: "white",
    fontSize: "16px",
    marginRight: "4px",
  };

  return (
    <Box position="relative">
      <div style={{ ...codeBlockStyles, overflow: "auto", maxWidth: "777px" }}>
        <Box sx={codeBlockStyles}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span sx={languageStyles}>{language}</span>
            <CopyToClipboard text={value} onCopy={() => setIsCopied(true)}>
              <IconButton size="small" color="inherit" sx={copyButtonStyles}>
                {!isCopied && <FileCopyIcon sx={copyIconStyles} />}
                {isCopied ? "Copied" : "Copy"}
              </IconButton>
            </CopyToClipboard>
          </Box>
        </Box>
        <Box sx={{ backgroundColor: "black", padding: "8px" }}>
          <SyntaxHighlighter
            style={{ ...solarizedlight, hljs: { background: "transparent" } }}
            language={language}
            children={value}
          />
        </Box>
      </div>
    </Box>
  );
};

// 代码块高亮
const components = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <CodeBlock
        language={match[1]}
        value={String(children).replace(/\n$/, "")}
        {...props}
      />
    ) : (
      <code
        className={className}
        {...props}
        style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
      >
        {children}
      </code>
    );
  },
};

const assistantAvatar =
  "https://cdn.oaistatic.com/_next/static/media/apple-touch-icon.59f2e898.png"; // update this path
const userAvatar = "/path_to_your_user_avatar_image"; // update this path

// 消息气泡
const MessageBubble = ({ message }) => (
  <Box
    display="flex"
    flexDirection="row"
    justifyContent="flex-start"
    width="100%" // Ensure the container takes the full width
  >
    <Box
      pl={0}
      pr={0}
      pb={"1px"}
      pt={"1px"}
      borderRadius={0}
      bgcolor={message.role === "user" ? "#343541" : "#444654"}
      color="white"
      style={{
        maxWidth: "100%",
        display: "flex",
        alignItems: "flex-start",
        width: "100%",
        overflow: "auto",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{ display: "flex", alignItems: "flex-start", marginRight: "8px" }}
        >
          {" "}
          <Avatar
            src={message.role === "user" ? userAvatar : assistantAvatar}
            sx={{
              width: 40,
              height: 40,
              borderRadius: 0,
              marginRight: "8px",
              marginTop: "8px",
            }}
          />
          <Box sx={{ wordWrap: "break-word" }}>
            <ReactMarkdown components={components}>
              {message.content}
            </ReactMarkdown>
          </Box>
        </Box>
      </Container>
    </Box>
  </Box>
);

const ChatUI = ({ messages, inputMessage, setInputMessage, sendMessage }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      p={0}
      ml={0}
      height="calc(99vh + 8px)"
    >
      <Box flexGrow={1} overflow="auto">
        {messages && messages.length > 0 ? (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        ) : (
          <Box
            display="flex" // 设置为flex布局
            alignItems="center" // 垂直居中对齐内容
            justifyContent="center" // 水平居中对齐内容
            my={30}
            fontSize={50}
            color="whitesmoke"
          >
            chatGPT
            {/* 将Card与文本稍微分开，可以通过增加marginLeft实现 */}
            <Card
              sx={{
                maxWidth: 70,
                background: "#FAE69E",
                marginLeft: 1,
                marginBottom: 1,
              }}
            >
              <Typography variant="h6" component="div" color="#927201">
                PLUS
              </Typography>
            </Card>
          </Box>
        )}
        <Box
          pl={0}
          pr={0}
          pb={"1px"}
          pt={"1px"}
          borderRadius={0}
          bgcolor="#343541" // 使用自定义背景色
          color="white"
          style={{
            maxWidth: "100%", // 控制空白气泡的宽度
            height: "80px", // 控制空白气泡的高度
            alignSelf: "flex-start",
            overflow: "hidden",
          }}
        />
      </Box>
      <Box
        position="absolute"
        bottom={30}
        left="35%"
        right="20%"
        transform="translateX(-50%)"
        display="flex"
        alignItems="center"
      >
        <div style={{ position: "relative", flex: 1 }}>
          {" "}
          {/* 新增的父容器 */}
          <TextareaAutosize
            maxRows={3}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message"
            style={{
              width: "100%",
              padding: "15px",
              paddingRight: "70px", // 增加右边距来容纳按钮
              boxSizing: "border-box",
              overflow: "auto",
              backgroundColor: "#40414F",
              border: "1px solid #ccc",
              borderRadius: "4px",
              resize: "none",
              boxShadow: "0px 0px 30px rgba(0.8, 0.8, 0.8, 0.8)",
              color: "white",
              fontSize: "16px",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              outline: "none", // 移除轮廓线
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "&:focus": {
                boxShadow: "none", // 如果需要，还可以移除可能存在的阴影
                border: "1px solid #ccc", // 保持边框颜色一致
              },
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          {/* 调整后的发送按钮 */}
          <button
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              transition: "opacity 0.3s",
              outline: "none", // 去除按钮点击后的轮廓线
            }}
            onMouseOver={(e) => (e.target.style.opacity = "0.7")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
            onClick={sendMessage}
          >
            <SendIcon style={{ color: "white" }} />
          </button>
        </div>
      </Box>
      <Typography
        variant="body2"
        color="whitesmoke"
        style={{ marginTop: "3px", marginBottom: "3px", textAlign: "center" }}
      >
        <Link
          href="https://github.com/GHOST-LOVE-YOU/chatgpt-clone/tree/GHOST"
          target="_blank"
          rel="noopener noreferrer"
          color="GrayText"
          underline="none"
          alignItems="center"
        >
          <GitHubIcon sx={{ marginRight: "3px", marginTop: 1, fontSize: 18 }} />
          <span style={{ position: "relative", top: "-2px" }}>
            View on GitHub
          </span>
        </Link>
      </Typography>
    </Box>
  );
};

export default ChatUI;
