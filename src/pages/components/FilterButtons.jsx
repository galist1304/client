import { Button, Grid } from '@mui/material'
import React from 'react'

const FilterButtons = ({ onFilterClick, onDeleteCompletedClick, activeTasks }) => {
  return (
    <div>
      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12} sm={3} sx={{ px: 2, mt: { xs: 1, sm: 0 } }}>
          <Button
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: "black",
              color: "white",
              borderRadius: "20px",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "black",
                color: "white",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
              },
              p: 1,
            }}
            onClick={(e) => onFilterClick("All")}
          >
            All
          </Button>
        </Grid>
        <Grid item xs={12} sm={3} sx={{ px: 2, mt: { xs: 1, sm: 0 } }}>
          <Button
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: "black",
              color: "white",
              borderRadius: "20px",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "black",
                color: "white",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
              },
              p: 1,
            }}
            onClick={(e) => onFilterClick("Active")}
          >
            {`Active (${activeTasks})`}
          </Button>
        </Grid>
        <Grid item xs={12} sm={3} sx={{ px: 2, mt: { xs: 1, sm: 0 } }}>
          <Button
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: "black",
              color: "white",
              borderRadius: "20px",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "black",
                color: "white",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
              },
              p: 1,
            }}
            onClick={(e) => onFilterClick("Completed")}
          >
            Completed
          </Button>
        </Grid>
        <Grid item xs={12} sm={3} sx={{ px: 2, mt: { xs: 1, sm: 0 } }}>
          <Button
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: "black",
              color: "white",
              borderRadius: "20px",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "black",
                color: "white",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
              },
              p: 1,
            }}
            onClick={onDeleteCompletedClick}
          >
            Clear Completed
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default FilterButtons