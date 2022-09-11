import { createContext } from "react";
import { Entry } from "../../interface";

interface EntrysProps {
  entries: Entry[];
  isAddingEntry: boolean;
  addEntry: (description: string) => void;
  setAddingEntry: (isAddingEntryB: boolean) => void;
  updateEntry: (entry: Entry) => void;
  deleteEntry: (id: Entry) => void;
}
export const Entrys = createContext({} as EntrysProps);
