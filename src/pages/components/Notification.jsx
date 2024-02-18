import React from 'react'
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'
import { useContexts } from '../../useContext/ContextsProvider';
import useTasks from '../../hooks/useTasks';

const Notification = ({ notificationData, onClose }) => {
  const [open, setOpen] = React.useState(true);
  const { currentTask } = useContexts()
  const { updateTask } = useTasks()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose()
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={() => { updateTask({ "text": currentTask.text, "status": "Completed" }, currentTask._id, true); handleClose() }}>
        Mark as Done
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={notificationData.taskText}
        action={action}
      />
    </div>
  );
}

export default Notification