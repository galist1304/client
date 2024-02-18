import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import React from 'react'

const ClearCompletedDialog = ({onClose, onYes}) => {
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
                <DialogTitle>Are you sure you want to delete all completed tasks?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => { handleClose(); onClose(); }}>No</Button>
                    <Button type="submit" color="error">Yes</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default ClearCompletedDialog