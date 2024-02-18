import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useNotification from '../../hooks/useNotification';
import { Typography } from '@mui/material';
import { useContexts } from '../../useContext/ContextsProvider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const SetReminder = ({ onClose }) => {
    const [open, setOpen] = React.useState(true);

    const { setTime, addNotification } = useNotification()
    const { taskStatus, currentTask } = useContexts()

    const handleClose = () => {
        setOpen(false);
        onClose();
    };

    const checkIfValid = () => {
        console.log(taskStatus[currentTask._id]);
        if (!taskStatus[currentTask._id]) {
            addNotification()
        } else {
            console.log("Can't add notification");
        }
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        checkIfValid();
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Set A Reminder</DialogTitle>
                <DialogContent>
                    <Typography>{currentTask.text}</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker onChange={(value) => setTime(new Date(value))}/>
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { handleClose(); onClose(); }}>Cancel</Button>
                    <Button type="submit">Set</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default SetReminder