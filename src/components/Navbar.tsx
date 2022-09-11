import * as React from "react";
import { Toolbar, Typography, AppBar, IconButton } from "@mui/material";
import LensSharpIcon from "@mui/icons-material/LensSharp";
export const Navbar = () => {
  return (
    <AppBar position="static" elevation={0}>
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 0 }}
        >
          <LensSharpIcon />
        </IconButton>
        <Typography variant="h6">OpenJira</Typography>
      </Toolbar>
    </AppBar>
  );
};
