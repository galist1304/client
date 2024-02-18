import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import useTasks from '../../../hooks/useTasks';
import UsersList from './UsersList';
import Autocomplete from '@mui/material/Autocomplete';
import { useContexts } from '../../../useContext/ContextsProvider';

const AdminAddTask = ({ onClose, onAdd }) => {
    const [open, setOpen] = React.useState(true);
    const [text, setText] = useState('');
    const [switched, setSwitched] = useState(false)
    const [usernameValue, setUsernameValue] = useState(null)
    const { taskBody, users, setTaskBody, searchUsers, addTask } = useTasks()
    const {setErrorText} =  useContexts()

    const setBody = () => {
        setTaskBody((prevTaskBody) => ({
            ...prevTaskBody,
            text,
            status: 'Active',
            taskForUser: usernameValue ? usernameValue : undefined
        }))
    }
    useEffect(() => {
        console.log(taskBody);
        if(taskBody.text !== undefined){
            if (!(switched && !taskBody.taskForUser)) {
                console.log("in");
                addTask();
            } else {
                setErrorText('Username does not exist.')
            }
            setOpen(false);
                onClose();
        }
        
    }, [taskBody])

    return (
        <React.Fragment>
            <Dialog
                open={open}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        onAdd();
                        setBody();
                    },
                }}
            >
                <DialogTitle>Add Task</DialogTitle>
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
                        onChange={(e) => setText(e.target.value)}
                        sx={{mb: 2}}
                    />
                    <FormGroup>
                        <FormControlLabel control={<Switch onChange={() => { setSwitched(!switched) }} />} label="Add the task to a user?" />
                    </FormGroup>
                    {switched && <Autocomplete
                        onChange={(event, newValue) => setUsernameValue(newValue.username)}
                        disablePortal
                        id="combo-box-demo"
                        options={users.length > 0 ? users : []}
                        getOptionLabel={(option) => option.username}
                        sx={{ width: 300, mt: 2 }}
                        renderInput={(params) => <TextField {...params} label="Search for user" onChange={(e) => { searchUsers(e.target.value); setUsernameValue(e.target.value) }} />}
                    />}
                </DialogContent>
                <DialogActions >
                    <Button onClick={() => { setOpen(false); onClose(); }}>Cancel</Button>
                    <Button type="submit">Add</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default AdminAddTask