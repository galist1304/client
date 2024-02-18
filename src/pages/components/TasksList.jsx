import React, { useEffect, useState } from 'react'
import useDialog from '../../hooks/useDialog';
import { Box, Button, Checkbox, Grid, Typography } from '@mui/material';
import EditTask from './EditTask';
import DeleteIcon from "@mui/icons-material/Delete";
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import SetReminder from './SetReminder';
import { useContexts } from '../../useContext/ContextsProvider';


const TasksList = ({ onCheckBoxClick, onDeleteClick, getTasks, updateTask }) => {

  const { isEditing, editedTaskStatus, isSettingReminder, setIsSettingReminder, setIsEditing, setEditedTaskStatus } = useDialog()
  const { editedTaskID, setEditedTaskID, taskStatus, setCurrentTask, loggedUser, searchedTasks } = useContexts()

  const [showDeleteIcon, setShowDeleteIcon] = useState(null)

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const truncateText = (text, maxLengthXS, maxLengthSM) => {
    const maxLength = window.innerWidth < 500 ? maxLengthXS : maxLengthSM;
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  useEffect(() => {
    console.log(searchedTasks);
  }, [searchedTasks])

  return (
    <div>
      <Box sx={{ mt: 3, ml: 2, width: "100%" }}>  
        {searchedTasks &&
          searchedTasks.map((task, index) => (
            <div key={task._id}>
              <Grid onMouseEnter={() => setShowDeleteIcon(index)}
                onMouseLeave={() => setShowDeleteIcon(null)} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid
                  xs={12}
                  container
                  spacing={2}
                  sx={{
                    border: "2px solid black",
                    borderRadius: "5px",
                    height: "60px",
                    my: 1,
                    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)",
                    alignItems: "center",
                    width: "100%"
                  }}
                >
                  <Grid xs={1} sx={{ display: "flex", justifyContent: "center" }}>
                    <Checkbox
                      checked={taskStatus[task._id]}
                      {...label}
                      onChange={(event) =>
                        onCheckBoxClick(task.text, event.target.checked, task._id)
                      }
                    />
                  </Grid>
                  <Grid xs={loggedUser && loggedUser.role == 'user' ? 7 : 3} sm={loggedUser && loggedUser.role == 'user' ? 9 : 5.5} sx={{ overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}
                    onDoubleClick={() => { setIsEditing(true); setEditedTaskStatus(task.status); setEditedTaskID(task._id); setCurrentTask(task) }}>
                    <Typography noWrap sx={{ fontSize: { xs: '10px', sm: '15px' }, fontWeight: 'bold', textDecoration: taskStatus[task._id] ? 'line-through' : 'none' }}>{truncateText(task.text, 20, 40)}</Typography>
                  </Grid>
                  {loggedUser.role == 'admin' && <Grid xs={3} sm={1.5}>
                    <Typography noWrap sx={{ fontSize: { xs: '8px', sm: '15px' }, fontWeight: 'bold' }}>{new Date(task.created_at).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}</Typography>
                  </Grid>}
                  <Grid xs={loggedUser && loggedUser.role == 'user' ? 4 : 5} sm={loggedUser && loggedUser.role == 'user' ? 2 : 4}
                    sx={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                    {loggedUser && loggedUser.role == 'admin' ? (<Typography sx={{ fontSize: { xs: '8px', sm: '15px' }, fontWeight: 'bold', overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>{searchedTasks[index].username}</Typography>) : (<div></div>)}
                  </Grid>
                </Grid>
                <Grid>
                  {!taskStatus[task._id] ? (<Button
                    sx={{ color: "black" }}
                    onClick={() => { setIsSettingReminder(true); setCurrentTask(task) }}
                  >
                    <NotificationAddIcon />
                  </Button>) : (<Button disabled={true}></Button>)}
                </Grid>
                <Grid>
                  {showDeleteIcon === index ? (
                    <Button
                      onClick={() => onDeleteClick(task._id)}
                      sx={{ color: "black" }}
                    >
                      <DeleteIcon className="delete-icon" />
                    </Button>
                  ) : (<Button disabled={true}></Button>)}
                </Grid>
              </Grid>
            </div>
          ))}
      </Box>
      {isEditing && (<EditTask onClose={() => { setIsEditing(false); getTasks(); }} updateTask={updateTask} status={editedTaskStatus} taskID={editedTaskID} />)}
      {isSettingReminder && (<SetReminder onClose={() => { setIsSettingReminder(false) }} />)}
    </div>
  )
}

export default TasksList