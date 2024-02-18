import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useContexts } from '../../useContext/ContextsProvider';

const EditTask = ({ onClose, updateTask, status, taskID }) => {
  const [open, setOpen] = React.useState(true);
  const { currentTask, taskStatus } = useContexts()
  const [text, setText] = useState(currentTask.text);

  const handleClose = () => {
    setOpen(false);
  };

  const setTaskBody = () => {
    console.log(currentTask.status);
    console.log(taskStatus);
    updateTask({ 'text': text, 'status': status }, taskID, false);
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            setTaskBody();
            handleClose();
            onClose();
          },
        }}
      >
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="task"
            name="task"
            label="Enter new task"
            type="task"
            fullWidth
            variant="standard"
            defaultValue={currentTask.text}
            onChange={(e) => setText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { handleClose(); onClose(); }}>Cancel</Button>
          <Button type="submit">Edit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default EditTask