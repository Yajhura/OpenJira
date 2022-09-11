import { useContext } from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { UiContext } from "../context/UIContextBase";
import { Entrys } from "../context/EntryContextBase";

export const MenuEntry = (props: any) => {
  const { setIsModalOpen, selectID } = useContext(UiContext);
  const { deleteEntry } = useContext(Entrys);
  return (
    <Box>
      <Menu
        keepMounted
        disableScrollLock={true}
        open={props.open}
        onClose={props.onClosseAnchor}
        anchorEl={props.anchor}
      >
        <MenuItem
          id="edit"
          sx={{
            color: "#fff",
            "&:hover": { backgroundColor: "#007bb2", color: "#fff" },
            marginTop: "-7px",
            marginBottom: "-7px",
          }}
          onClick={() => {
            setIsModalOpen(true);
            props.onClosseAnchor();
          }}
        >
          <ListItemIcon id="edit2">
            <EditSharpIcon id="edit3" />
          </ListItemIcon>
          <ListItemText>Editar</ListItemText>
        </MenuItem>

        <Divider />
        <MenuItem
          id="delete"
          sx={{
            color: "#fff",
            "&:hover": { backgroundColor: "#b2102f", color: "#fff" },
            marginTop: "-7px",
            marginBottom: "-7px",
          }}
          onClick={() => deleteEntry(selectID)}
        >
          <ListItemIcon>
            <DeleteSharpIcon />
          </ListItemIcon>
          <ListItemText>Eliminar</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};
