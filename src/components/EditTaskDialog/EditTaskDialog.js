import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TASK_PRIORITY } from "configs";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import EMPLOYEES from "../../data/employee.json";

const EditTaskDialog = (props) => {
  const { data, open, onClose, onSubmit } = props;
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState([]);
  const [time, setTime] = useState(null);
  const [priority, setPriority] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "backdropClick") {
      return false;
    }

    if (reason === "escapeKeyDown") {
      return false;
    }

    if (typeof onClose === "function") {
      onClose();
    }
  };
  const createBody = () => ({
    id: uuidv4(),
    title: title,
    assignee: assignee,
    time: dayjs(time).format("MMM D, YYYY h:mm A"),
    priority: priority,
  });
  const handleSubmit = () => {
    let body = createBody();
    onSubmit(body);
  };

  useEffect(() => {
    if (title && assignee.length && time && priority) setIsValid(true);
    else setIsValid(false);
  }, [title, assignee, time, priority]);

  useEffect(() => {
    if (!open) {
      setTitle("");
      setAssignee([]);
      setTime(null);
      setPriority("");
    } else {
      setTitle(data?.title);
      setAssignee(data?.assignee);
      setTime(data?.time);
      setPriority(data?.priority);
    }
  }, [open]);

  return (
    <Dialog
      disableEscapeKeyDown
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={"md"}
    >
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          value={title}
          type="text"
          fullWidth
          variant="outlined"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <Autocomplete
          multiple
          limitTags={3}
          id="assignee"
          options={EMPLOYEES}
          getOptionLabel={(option) => option.name}
          value={assignee}
          onChange={(event, newValue) => {
            setAssignee(newValue);
          }}
          // filterSelectedOptions
          renderOption={(props, option, { selected }) => {
            return (
              <li {...props}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar alt={option.name} src={option.avatar} />
                  <Typography>{option.name}</Typography>
                </Box>
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Assignee"
              placeholder=""
              fullWidth
              margin="dense"
            />
          )}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Time"
            value={time}
            // onChangeRaw={(e) => {
            //   e.preventDefault();
            // }}
            onChange={(newValue) => {
              setTime(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="dense" />
            )}
            inputFormat="MMM D, YYYY h:mm A"
          />
        </LocalizationProvider>
        <FormControl fullWidth margin="dense">
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select
            labelId="priority-label"
            id="priority"
            value={priority}
            label="Priority"
            onChange={(event) => {
              setPriority(event.target.value);
            }}
          >
            {Object.keys(TASK_PRIORITY).map((item, index) => (
              <MenuItem
                key={TASK_PRIORITY[item].value}
                value={TASK_PRIORITY[item].value}
              >
                {TASK_PRIORITY[item].label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!isValid}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskDialog;
