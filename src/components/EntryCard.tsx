import {
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import React, { useContext } from "react";
import { UiContext } from "../context/UIContextBase";
import { Entry } from "../interface";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import { MenuEntry } from "./Menu";
import { ModalEntry } from "./ModalEntry";
import { formatDistance } from "../utils/dateFunctions";

export const EntryCard = ({ createdAt, description, status, _id }: Entry) => {
  const { isDraggingEntry, setIsDraggingEntry, isModalOpen, setSelectID } =
    useContext(UiContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const onClosseAnchor = () => {
    setAnchorEl(null);
  };

  const onDragStartEvent = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text", _id);
    setIsDraggingEntry(true);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setSelectID({ createdAt, description, status, _id });
  };

  const onDragEndEvent = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDraggingEntry(false);
  };

  return (
    <>
      <Card
        sx={{
          mb: "12px",
          backgroundColor: isDraggingEntry ? "#333" : "transparent",
          opacity: 1,
          position: "relative",
        }}
        draggable
        onDragStart={onDragStartEvent}
        onDragEnd={onDragEndEvent}
      >
        <CardContent>
          <Typography
            sx={{
              whiteSpace: "pre-line",
            }}
          >
            {description}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography variant="body2">
            {formatDistance(Number(createdAt))}
          </Typography>
        </CardActions>
        <IconButton
          sx={{
            position: "absolute",
            top: "0",
            right: "5px",
            "&:hover": { backgroundColor: "transparent" },
          }}
          edge="end"
          onClick={handleClick}
        >
          <MoreVertSharpIcon />
        </IconButton>

        <MenuEntry
          anchor={anchorEl}
          open={open}
          onClosseAnchor={onClosseAnchor}
        />

        {isModalOpen && <ModalEntry />}
      </Card>
    </>
  );
};
