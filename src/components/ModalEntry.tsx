import { useContext, useState } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import { UiContext } from "../context/UIContextBase";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Status } from "../interface";
import { Entrys } from "../context/EntryContextBase";
import { formatDistance } from "../utils/dateFunctions";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#2a2b38",
  border: "linear-gradient(90deg, #1a1a1a 0%, #1a1a1a 100%)",
  borderWidth: 2,
  boxShadow: 5,
  p: 3,
};

const validStatus: Status[] = ["Pendiente", "En Progreso", "Completado"];

export const ModalEntry = () => {
  const { setIsModalOpen, isModalOpen, selectID } = useContext(UiContext);
  const { updateEntry } = useContext(Entrys);
  const [entry, setEntry] = useState(selectID || {});

  const onSubmit = () => {
    if (entry.description.trim().length === 0) {
      return;
    }
    updateEntry(entry);
    setIsModalOpen(false);
  };

  return (
    <Modal keepMounted open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          color="#434edf"
          variant="h4"
          component="h2"
        >
          Editar entrada
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: "3px" }}
          variant="subtitle1"
        >
          {formatDistance(entry.createdAt)}
        </Typography>

        <TextField
          sx={{ mt: 4, mb: 1, bgcolor: "#1f2029", borderColor: "transparent" }}
          fullWidth
          value={entry.description}
          multiline
          onChange={(e) => setEntry({ ...entry, description: e.target.value })}
          autoFocus
          placeholder="Editar entrada"
          variant="outlined"
          label="Editar entrada"
        />

        <FormControl sx={{ my: 2 }}>
          <FormLabel>Selecione el estado a cambiar</FormLabel>
          <RadioGroup
            onChange={(e) =>
              setEntry({
                ...entry,
                status: e.target.value as Status,
              })
            }
            value={entry.status}
            sx={{ mt: 1 }}
            row
          >
            {validStatus.map((status) => (
              <FormControlLabel
                key={status}
                value={status}
                control={<Radio />}
                label={status}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <Box sx={{ mt: 1 }} display={"flex"} justifyContent={"space-between"}>
          <Button
            onClick={() => setIsModalOpen(false)}
            variant="text"
            color="error"
          >
            Cancelar
          </Button>

          <Button
            variant="outlined"
            color="success"
            onClick={onSubmit}
            endIcon={<SaveOutlinedIcon />}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
