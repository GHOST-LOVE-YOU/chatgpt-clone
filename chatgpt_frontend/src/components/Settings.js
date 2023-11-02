import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";

const Settings = ({
  openDialog,
  handleDialogClose,
  dialogApi,
  dialogModel,
  handleApiChange,
  handleModelChange,
  handleSave,
}) => {
  const apiModelMap = {
    openai: ["由于没有openai密钥", "暂不可用", "gpt-3.5-turbo", "GPT-4"],
    aiproxy: [
      "gpt-3.5-turbo",
      "gpt-3.5-turbo-0301",
      "gpt-3.5-turbo-0613",
      "gpt-3.5-turbo-16k",
      "gpt-4",
      "gpt-4-0314",
      "gpt-4-0613",
      "text-davinci-003",
      "text-curie-001",
      "text-babbage-001",
      "text-ada-001",
      "text-embedding-ada-002",
      "text-search-ada-doc-001",
      "whisper-1",
      "text-davinci-edit-001",
      "code-davinci-edit-001",
    ],
  };

  const handleSaveInternal = () => {
    if (dialogModel) {
      // 确保dialogModel不为空
      handleSave();
    } else {
      alert("Please select a model before saving.");
    }
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleDialogClose}
      sx={{ "& .MuiDialog-paper": { width: 400, height: 300 } }}
    >
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="center" marginY={2}>
          <Typography variant="body1" style={{ flex: 1 }}>
            API:
          </Typography>
          <FormControl variant="outlined">
            <Select
              value={dialogApi}
              onChange={handleApiChange}
              sx={{ minWidth: 200 }}
            >
              {Object.keys(apiModelMap).map((api) => (
                <MenuItem key={api} value={api}>
                  {api}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box display="flex" alignItems="center" marginY={2}>
          <Typography variant="body1" style={{ flex: 1 }}>
            Model:
          </Typography>
          <FormControl variant="outlined">
            <Select
              value={dialogModel}
              onChange={handleModelChange}
              disabled={!dialogApi} // 修改这里
              sx={{ minWidth: 200 }}
            >
              {dialogApi &&
                apiModelMap[dialogApi].map((model) => (
                  <MenuItem key={model} value={model}>
                    {model}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSaveInternal} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Settings;
