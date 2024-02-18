import { TextField } from '@mui/material'
import React from 'react'

const SearchBar = ({ searchTasks }) => {
  return (
    <div>
      <TextField label="Search for a task"
        sx={{ width: "100%", boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)" }}
        onChange={(e) => { searchTasks(e.target.value) }}>
      </TextField>
    </div>
  )
}

export default SearchBar