import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import useTasks from '../hooks/useTasks';
import FilterButtons from './components/FilterButtons';
import {  Button, Container, Grid } from '@mui/material';
import TasksList from './components/TasksList';
import useLogin from '../hooks/useLogin';
import SearchBar from './components/admin/SearchBar';
import AddIcon from '@mui/icons-material/Add';
import useDialog from '../hooks/useDialog';
import AdminAddTask from './components/admin/AdminAddTask';
import Notification from './components/Notification';
import { useContexts } from '../useContext/ContextsProvider';
import ShowAlert from './components/admin/ShowAlert';
import AddReminderDialog from './components/admin/AddReminderDialog';
import SetReminder from './components/SetReminder';
import ClearCompletedDialog from './components/ClearCompletedDialog';

const AdminTodoList = () => {
  const { activeTasks, getTasks, updateTask, handleFilterClicked, deleteCompletedTasks, handleCheckBoxClick, handleDeleteClick, searchTasks } = useTasks();
  const { fetchUserData } = useLogin();
  const { isEditing, setIsEditing, isAddNotification, setIsAddNotification, isSettingReminder, setIsSettingReminder, isDeleteCompleted, setIsDeleteCompleted } = useDialog();
  const { notificationData, searchedTasks, setCurrentTask, errorText } = useContexts()
  const [hasNotification, setHasNotification] = useState(false);

  useEffect(() => {
    getTasks();
    fetchUserData();
  }, []);

  useEffect(() => {
    console.log(notificationData);
    if (notificationData.taskText !== undefined) {
      setHasNotification(true);
    }
  }, [notificationData]);

  return (
    <div>
      <NavBar />
      <ShowAlert />
      <Container maxWidth="md" sx={{ pt: 3 }}>
        <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
          <Grid xs={10.5}>
            <SearchBar searchTasks={searchTasks} />
          </Grid>
          <Grid xs={1.5}>
            <Button onClick={() => { fetchUserData(); errorText !== '' && setIsEditing(true) }}>
              <AddIcon sx={{ color: 'black' }} />
            </Button>
          </Grid>
        </Grid>
        <FilterButtons onFilterClick={handleFilterClicked} onDeleteCompletedClick={() => {setIsDeleteCompleted(true)}} activeTasks={activeTasks} />
        <TasksList
          onCheckBoxClick={handleCheckBoxClick}
          onDeleteClick={handleDeleteClick}
          getTasks={getTasks}
          updateTask={updateTask}
        />
        {isEditing && (<AdminAddTask onClose={() => { setIsEditing(false); getTasks(); }} onAdd={() => setIsAddNotification(true)} />)}
        {hasNotification && <Notification notificationData={notificationData} onClose={() => setHasNotification(false)} />}
        {isAddNotification && <AddReminderDialog onClose={() => setIsAddNotification(false)} onYes={() => {setIsSettingReminder(true); setCurrentTask(searchedTasks[searchedTasks.length - 1])}}/>}
        {isSettingReminder && (<SetReminder onClose={() => { setIsSettingReminder(false) }} />)}
        {isDeleteCompleted && <ClearCompletedDialog onClose={() => setIsDeleteCompleted(false)} onYes={deleteCompletedTasks}/>}
      </Container>
    </div>
  )
}

export default AdminTodoList