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
import AddTaskDialog from "components/AddTaskDialog";

const TaskKanbanBoard = () => {
  const [columns, setColumns] = useState(TaskData);
  const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);
  const [selectedCol, setSelectedCol] = useState(null);

  const handleOpenAddTaskDialog = (columnId) => {
    setSelectedCol(columnId ? columnId : Object.keys(columns)[0]);
    setOpenAddTaskDialog(true);
  };
  const handleCloseAddTaskDialog = () => {
    setOpenAddTaskDialog(false);
  };
  const handleSubmitAddTaskDialog = (body) => {
    setColumns({
      ...columns,
      [selectedCol]: {
        ...columns[selectedCol],
        items: [...columns[selectedCol].items, body],
      },
    });
    setOpenAddTaskDialog(false);
  };
  const handleDeleteTask = (columnId, index) => {
    const desColItems = columns[columnId].items;
    desColItems.splice(index, 1);
    setColumns({
      ...columns,
      [columnId]: {
        ...columns[columnId],
        items: desColItems,
      },
    });
  };
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
    <>
      <Card sx={{ height: "100%", position: "relative" }}>
        <Box sx={{ display: "flex", alignItems: "center", padding: 2 }}>
          <Typography>Task</Typography>
          <Button
            sx={{ marginLeft: 2 }}
            variant="outlined"
            onClick={() => handleOpenAddTaskDialog(null)}
          >
            Add New Task
          </Button>
        </Box>
        <Divider />
        <Box sx={{ padding: 1, height: "100%", minWidth: "1064px" }}>
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
                      sx={{
                        height: "calc(100% - 60px)",
                        background: "#dcdcdc",
                        padding: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderRadius: 1,
                      }}
                    >
                      <Typography sx={{ width: "100%" }} textAlign="start">
                        {column.name}
                      </Typography>
                      <div style={{ width: "100%", height: "100%" }}>
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
                                  borderRadius: 4,
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
                                            <TaskCard
                                              data={item}
                                              columnId={columnId}
                                              index={index}
                                              onDelete={handleDeleteTask}
                                            />
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
                      <Button onClick={() => handleOpenAddTaskDialog(columnId)}>
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
      </Card>
      <AddTaskDialog
        open={openAddTaskDialog}
        onClose={handleCloseAddTaskDialog}
        onSubmit={handleSubmitAddTaskDialog}
      />
    </>
  );
};

export default TaskKanbanBoard;
