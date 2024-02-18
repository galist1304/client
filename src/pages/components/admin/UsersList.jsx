import React from 'react'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const UsersList = ({ users, onUsernameClicked }) => {
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
        <Select
          multiple
          native
          label="Users"
          inputProps={{
            id: 'select-multiple-native',
          }}
          onClick={(e) => onUsernameClicked(e.target.value)}
        >
          {users.map((user) => (
            <option key={user.username} value={user.username}>
              {user.username}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default UsersList