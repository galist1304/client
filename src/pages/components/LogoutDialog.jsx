import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const LogoutDialog = ({onClose}) => {
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate('')

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
                        handleClose();
                        onClose();
                        navigate('/')
                    },
                }}
            >
                <DialogTitle>Are you sure you want to logout?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => { handleClose(); onClose(); }}>No</Button>
                    <Button type="submit" color="error">Yes</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default LogoutDialog