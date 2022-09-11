import React, { useContext, useState } from "react";
import { Alert, Box, Button, Snackbar, TextField } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Entrys } from "../context/EntryContextBase";
export const AddEntry = () => {
  const { addEntry, isAddingEntry, setAddingEntry } = useContext(Entrys);

  const [inputValue, setInputValue] = useState("");
  const [isTouch, setIsTouch] = useState(false);

  const saveEntry = () => {
    if (inputValue.length == 0) return;
    setIsTouch(false);
    setAddingEntry(false);
    setInputValue("");
    addEntry(inputValue);
  };

  return (
    <>
      {!isAddingEntry ? (
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={() => setAddingEntry(true)}
          endIcon={<AddCircleOutlineOutlinedIcon />}
        >
          Agregar nueva tarea
        </Button>
      ) : (
        <>
          <TextField
            fullWidth
            placeholder="describe la nota"
            sx={{
              mt: 2,
              mb: 1,
            }}
            multiline
            autoFocus
            error={inputValue.length <= 0 && isTouch}
            value={inputValue}
            onBlur={() => setIsTouch(true)}
            onChange={(e) => setInputValue(e.target.value)}
            label="Agrega Nueva Nota"
            inputProps={{
              //border transparent
              style: { borderColor: "transparent" },
            }}
            helperText={
              inputValue.length <= 0 && isTouch ? "Describe tu nota" : ""
            }
          />

          <Box sx={{ mt: 1 }} display={"flex"} justifyContent={"space-between"}>
            <Button
              onClick={() => setAddingEntry(false)}
              variant="text"
              color="error"
            >
              Cancelar
            </Button>

            <Button
              variant="outlined"
              color="success"
              onClick={saveEntry}
              endIcon={<SaveOutlinedIcon />}
            >
              Guardar
            </Button>
          </Box>
        </>
      )}
    </>
  );
};
