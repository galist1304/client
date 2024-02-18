import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import LogoutDialog from './LogoutDialog';

const NavBar = () => {
  const [isClicked, setIsClicked] = useState(false) 

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "black" }}>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, ml: 6, fontWeight: "bold" }}
            >
              Todo List
            </Typography>
            <Button color="inherit" sx={{ fontWeight: "bold" }} onClick={() => setIsClicked(true)}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        {isClicked && <LogoutDialog onClose={() => { setIsClicked(false);}}/>}
      </Box>
    </div>
  )
}

export default NavBar