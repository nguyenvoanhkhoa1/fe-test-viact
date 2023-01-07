import React, { useEffect, useRef, useState } from "react";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import clsx from "clsx";
import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ScheduleIcon from "@mui/icons-material/Schedule";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardControlKeyIcon from "@mui/icons-material/KeyboardControlKey";
import RemoveIcon from "@mui/icons-material/Remove";
import { green, red, yellow } from "@mui/material/colors";
import dayjs from "dayjs";
import { TASK_PRIORITY } from "configs";
// import { TICKET_TYPE } from 'configs';
// import DocumentIcon from "assets/icons/procedure/document-icon.svg";

const TaskCard = (props) => {
  const { data, ...rest } = props;
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef();
  const startTimer = () => {
    const countDownDate = new Date(
      dayjs(data?.time).format("MMM D, YYYY h:mm A")
    ).getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setTimerDays(days < 10 ? `0${days}` : `${days}`);
        setTimerHours(hours < 10 ? `0${hours}` : `${hours}`);
        setTimerMinutes(minutes < 10 ? `0${minutes}` : `${minutes}`);
        setTimerSeconds(seconds < 10 ? `0${seconds}` : `${seconds}`);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  });

  return (
    <Paper sx={{ padding: 1, marginBottom: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItem: "center",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "1",
            WebkitBoxOrient: "vertical",
          }}
          alignContent="center"
        >
          {data?.title}
        </Typography>
        <IconButton
          sx={{ width: "20px", height: "20px" }}
          aria-label="settings"
        >
          <MoreHorizIcon sx={{ width: "16px", height: "16px" }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {data?.assignee?.length && (
          <AvatarGroup
            max={4}
            sx={{
              ".MuiAvatarGroup-avatar": {
                width: 24,
                height: 24,
                fontSize: "12px",
              },
            }}
          >
            {data?.assignee.map((item, index) => (
              <Tooltip title={item.name}>
                <Avatar
                  alt={item.name}
                  src={item.avatar}
                  sx={{ width: 24, height: 24 }}
                />
              </Tooltip>
            ))}
          </AvatarGroup>
        )}
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <ScheduleIcon sx={{ width: "20px", color: "gray" }} />
          <Typography>
            {timerDays}:{timerHours}:{timerMinutes}:{timerSeconds}
          </Typography>
          {data.priority === TASK_PRIORITY.high.value && (
            <Avatar sx={{ width: "20px", height: "20px", bgcolor: red[100] }}>
              <KeyboardDoubleArrowUpIcon
                sx={{ width: "16px", color: red[500] }}
              />
            </Avatar>
          )}
          {data.priority === TASK_PRIORITY.medium.value && (
            <Avatar
              sx={{ width: "20px", height: "20px", bgcolor: yellow[100] }}
            >
              <KeyboardControlKeyIcon
                sx={{ width: "16px", color: yellow[500] }}
              />
            </Avatar>
          )}
          {data.priority === TASK_PRIORITY.low.value && (
            <Avatar sx={{ width: "20px", height: "20px", bgcolor: green[100] }}>
              <RemoveIcon sx={{ width: "16px", color: green[500] }} />
            </Avatar>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default TaskCard;