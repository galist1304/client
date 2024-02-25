import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import React from 'react'
import useLogin from '../../hooks/useLogin';

const LogoutDialog = ({onClose}) => {
    const [open, setOpen] = React.useState(true);
    const {handleLogout} = useLogin();

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
                        handleLogout();
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