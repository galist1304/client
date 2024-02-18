import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import React from 'react'

const AddReminderDialog = ({ onClose, onYes }) => {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        onYes();
                        handleClose();
                        onClose();
                    },
                }}
            >
                <DialogTitle>Do you want to set a reminder for this task?</DialogTitle>
                <DialogActions>
                    <Button color='error' onClick={() => { handleClose(); onClose(); }}>No</Button>
                    <Button type="submit" color="success">Yes</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default AddReminderDialog