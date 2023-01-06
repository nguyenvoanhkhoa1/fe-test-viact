import { Box } from "@mui/material";
import { TaskKanbanBoard } from "components";
import React from "react";

const ProjectTracking = () => {
  return (
    <Box sx={{ height: "100%" }}>
      <TaskKanbanBoard></TaskKanbanBoard>
    </Box>
  );
};

export default ProjectTracking;
