import React from "react";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import clsx from "clsx";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ScheduleIcon from "@mui/icons-material/Schedule";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { red } from "@mui/material/colors";
// import { TICKET_TYPE } from 'configs';
// import DocumentIcon from "assets/icons/procedure/document-icon.svg";

const TaskCard = (props) => {
  const { data, ...rest } = props;
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
              <Avatar
                alt={item.name}
                src={item.avatar}
                sx={{ width: 24, height: 24 }}
              />
            ))}
          </AvatarGroup>
        )}
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <ScheduleIcon sx={{ width: "20px", color: "gray" }} />
          <Typography>{data.time}</Typography>
          <Avatar sx={{ width: "20px", height: "20px", bgcolor: red[100] }}>
            <KeyboardDoubleArrowUpIcon
              sx={{ width: "16px", color: red[500] }}
            />
          </Avatar>
        </Box>
      </Box>
    </Paper>
  );
};

export default TaskCard;
