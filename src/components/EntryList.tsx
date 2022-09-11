import React, { FC, useContext, useMemo } from "react";
import { List, Paper } from "@mui/material";
import { Entrys } from "../context/EntryContextBase";
import { Status } from "../interface";
import { EntryCard } from "./EntryCard";
import { UiContext } from "../context/UIContextBase";

interface EntryListProps {
  status: Status;
}

export const EntryList: FC<EntryListProps> = ({ status }) => {
  const { entries, updateEntry } = useContext(Entrys);
  const { isDraggingEntry,setIsDraggingEntry } = useContext(UiContext);

  const EntryByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status]
  );

  const onDropEntry = (e: React.DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData("text");
    const entry = entries.find((e) => e._id == id)!;
    entry.status = status;
    updateEntry(entry);
    setIsDraggingEntry(false);
  };

  return (
    <div onDrop={onDropEntry} onDragOver={(e) => e.preventDefault()}>
      <Paper
        sx={{
          height: "calc(100vh - 250px)",
          overflowY: "scroll",
          backgroundColor: "transparent",
          border: isDraggingEntry ? "3px dashed #5b21b6" : "none",
          padding: "5px",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            width: "0px",
            background: "transparent",
          },
        }}
      >
        <List
          sx={{
            opacity: isDraggingEntry ? 0.5 : 1,
            transition: "all 0.5s ease-in-out",
          }}
        >
          {EntryByStatus.map((entry) => (
            <EntryCard key={entry._id} {...entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
