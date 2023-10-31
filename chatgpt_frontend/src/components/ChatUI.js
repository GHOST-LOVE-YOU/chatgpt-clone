import React, { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Avatar,
  Button,
  Container,
  Link,
  Grid,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import GitHubIcon from "@mui/icons-material/GitHub";

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
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};
const assistantAvatar = "/path_to_your_assistant_avatar_image"; // update this path
const userAvatar = "/path_to_your_user_avatar_image"; // update this path

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
    <Box display="flex" flexDirection="column" height="96vh" p={0} ml={0}>
      <Box flexGrow={1} overflow="auto">
        {messages && messages.length > 0 ? (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        ) : (
          <Box textAlign="center" my={2}>
            No messages yet.
          </Box>
        )}
      </Box>
      <Box
        borderTop={1}
        borderColor="divider"
        pt={2}
        mt={2}
        display="flex"
        alignItems="center"
        margin={5}
      >
        <TextField
          fullWidth
          variant="outlined"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message"
          multiline
          style={{ maxHeight: "100px", overflow: "auto" }}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          inputProps={{ wrap: "hard" }}
        />
        <IconButton
          color="primary"
          onClick={sendMessage}
          disabled={!inputMessage}
        >
          <SendIcon />
        </IconButton>
      </Box>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className="footer"
        sx={{
          minHeight: "100px",
          margin: -8, // 取消上下间距
        }}
      >
        <Link
          href="https://github.com/fatihbaltaci/chatgpt-clone"
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          underline="none"
          display="flex"
          alignItems="center"
        >
          <GitHubIcon sx={{ marginRight: 1 }} />
          View on GitHub
        </Link>
      </Grid>
    </Box>
  );
};

export default ChatUI;
