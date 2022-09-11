import { createContext } from "react";
import { AlertStatus } from "../../interface/Entry";

interface UIContextProps {
  isDraggingEntry: boolean;
  setIsDraggingEntry: (isDraggingEntryB: boolean) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  selectID: any;
  setSelectID: (selectID: any) => void;
  showMessages: { show: boolean; message: string; status: AlertStatus };
  setShowMessages: (
    show: boolean,
    message: string,
    status: AlertStatus
  ) => void;
}

export const UiContext = createContext({} as UIContextProps);
