import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TaskCard from "components/TaskCard";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import TaskData from "../../data/task-data.json";

const TaskKanbanBoard = () => {
  console.log(TaskData);
  const [columns, setColumns] = useState(TaskData);
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return (
    <Card sx={{ height: "100%", position: "relative" }}>
      <Box sx={{ display: "flex", alignItems: "center", padding: 2 }}>
        <Typography>Task</Typography>
        <Button sx={{ marginLeft: 2 }} variant="outlined">
          Add New Task
        </Button>
      </Box>
      <Divider />
      <div
        style={{
          height: "100%",
          overflowY: "hidden",
          overflow: "auto",
          display: "flex",
        }}
      >
        <Box
          sx={{ padding: 1, height: "100%", minWidth: "1064px", width: "100%" }}
        >
          <Grid
            sx={{ height: "100%" }}
            container
            spacing={{ xs: 1 }}
            columns={{ xs: 4 }}
          >
            <DragDropContext
              onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
            >
              {Object.entries(columns).map(([columnId, column], index) => {
                return (
                  <Grid item xs={1} key={columnId}>
                    <Box
                      variant="rounded"
                      sx={{
                        height: "calc(100% - 60px)",
                        background: "#f8f8f8",
                        padding: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ width: "100%", height: "100%" }}>
                        <Typography>{column.name}</Typography>
                        <div style={{ height: "100%" }}>
                          <Droppable
                            style={{ height: "100%" }}
                            droppableId={columnId}
                            key={columnId}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                  style={{
                                    height: "100%",
                                    background: snapshot.isDraggingOver
                                      ? "lightblue"
                                      : "unset",
                                  }}
                                >
                                  {column.items.map((item, index) => {
                                    return (
                                      <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}
                                      >
                                        {(provided, snapshot) => {
                                          return (
                                            <div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                            >
                                              <TaskCard data={item} />
                                            </div>
                                          );
                                        }}
                                      </Draggable>
                                    );
                                  })}
                                  {provided.placeholder}
                                </div>
                              );
                            }}
                          </Droppable>
                        </div>
                      </div>
                      <Button>
                        <AddIcon sx={{ marginInline: "auto" }} />
                        Add new task
                      </Button>
                    </Box>
                  </Grid>
                );
              })}
            </DragDropContext>
          </Grid>
        </Box>
      </div>
    </Card>
  );
};

export default TaskKanbanBoard;
