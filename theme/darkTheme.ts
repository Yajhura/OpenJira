import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components : {
    MuiAppBar : {
       styleOverrides : {
         root : {
          backgroundColor : "#4a148c"
         }
       }
    }
  }
});
