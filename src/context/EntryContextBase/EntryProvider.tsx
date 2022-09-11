import React, { FC, ReactNode, useReducer, useEffect, useContext } from "react";
import { entriesAPi } from "../../../api";
import { Entry } from "../../interface";
import { Entrys } from "./EntryContext";
import { EntryReducer } from "./EntryReducer";
import { UiContext } from "../UIContextBase";

type Props = { children: ReactNode };

export interface EntryProviderProps {
  entries: Entry[];
  isAddingEntry: boolean;
}

export const EntryInitialState: EntryProviderProps = {
  entries: [],
  isAddingEntry: false,
};

export const Entryrovider: FC<Props> = ({ children }: Props) => {
  const [state, dispatch] = useReducer(EntryReducer, EntryInitialState);
  const { setShowMessages } = useContext(UiContext);

  const refreshEntries = async () => {
    const { data } = await entriesAPi.get<Entry[]>("/entries");

    dispatch({ type: "Entry - RefreshData", payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  const addEntry = async (description: string) => {
    try {
      const resp = await entriesAPi.post<Entry>("/entries", { description });
      const { data: newEntry } = resp;

      dispatch({ type: "Entry - AddEntry", payload: newEntry });
      setShowMessages(true, "Se ha agregado una nueva entrada", "success");
    } catch (error) {
      setShowMessages(
        true,
        "Ha ocurrido un error al agregar una nueva entrada",
        "error"
      );
    }
  };
  const setAddingEntry = (isAddingEntryB: boolean) => {
    return dispatch({ type: "Entry - IsAddingEntry", payload: isAddingEntryB });
  };

  const updateEntry = async (entry: Entry) => {
    try {
      const { data: newEntry } = await entriesAPi.put<Entry>(
        `/entries/${entry._id}`,
        { ...entry }
      );

      dispatch({ type: "Entry - UpdateStatus", payload: newEntry });
      setShowMessages(true, "Se ha actualizado la entrada", "info");
    } catch (error) {
      setShowMessages(
        true,
        "Ha ocurrido un error al actualizar la entrada",
        "error"
      );
    }
  };

  const deleteEntry = async (entry: Entry) => {
    try {
      const response = entriesAPi.delete(`/entries/${entry._id}`);

      dispatch({ type: "Entry - DeleteEntry", payload: entry });
      setShowMessages(true, "Se ha eliminado la entrada", "error");
    } catch (error: any) {
      setShowMessages(
        true,
        "Ha ocurrido un error al eliminar la entrada",
        "error"
      );
    }
  };

  return (
    <Entrys.Provider
      value={{
        ...state,
        addEntry,
        setAddingEntry,
        updateEntry,
        deleteEntry,
      }}
    >
      {children}
    </Entrys.Provider>
  );
};
