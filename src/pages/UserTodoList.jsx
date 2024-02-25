import React, { useEffect, useState } from "react";
import { Container, TextField } from "@mui/material";
import NavBar from "./components/NavBar";
import useTasks from "../hooks/useTasks";
import FilterButtons from "./components/FilterButtons";
import TasksList from "./components/TasksList";
import { useContexts } from "../useContext/ContextsProvider";
import Notification from "./components/Notification";
import useDialog from "../hooks/useDialog";
import ClearCompletedDialog from './components/ClearCompletedDialog';

const UserTodoList = () => {
  const { taskBody, activeTasks, setTaskText, getTasks, updateTask, handleFilterClicked, deleteCompletedTasks, handleKeyPress, addTask, handleCheckBoxClick, handleDeleteClick } = useTasks();
  const { isDeleteCompleted, setIsDeleteCompleted } = useDialog()
  const { notificationData } = useContexts()
  const [hasNotification, setHasNotification] = useState(false);

  useEffect(() => {
    if (taskBody.text !== undefined && taskBody.status !== undefined) {
      addTask();
    }
  }, [taskBody]);

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    if (notificationData.taskText !== undefined) {
      setHasNotification(true);
    }
  }, [notificationData]);

  return (
    <div>
      <NavBar />
      <Container maxWidth="md" sx={{ pt: 3 }}>
        <TextField
          label="Add a new task..."
          sx={{ width: "100%", boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)" }}
          onKeyDown={handleKeyPress}
          onChange={(e) => setTaskText(e.target.value)}
        ></TextField>
        <FilterButtons onFilterClick={handleFilterClicked} onDeleteCompletedClick={() => setIsDeleteCompleted(true)} activeTasks={activeTasks} />
        <TasksList onCheckBoxClick={handleCheckBoxClick} onDeleteClick={handleDeleteClick} getTasks={getTasks} updateTask={updateTask} />
        {hasNotification && <Notification notificationData={notificationData} onClose={() => setHasNotification(false)} />}
        {isDeleteCompleted && <ClearCompletedDialog onClose={() => setIsDeleteCompleted(false)} onYes={deleteCompletedTasks}/>}
      </Container>
    </div>
  );
};

export default UserTodoList;