import { Box } from "@mui/material";
import { ProjectFeature, TaskKanbanBoard } from "components";
import React from "react";

const ProjectTracking = () => {
  return (
    <Box
      sx={{ height: "100%", display: "flex", flexDirection: "column", gap: 2 }}
    >
      <ProjectFeature />
      <TaskKanbanBoard />
    </Box>
  );
};

export default ProjectTracking;
