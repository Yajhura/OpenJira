import React, { FC, ReactNode, useReducer } from "react";
import { UiContext } from "./UIContext";
import { UIReducer } from "./UIReducer";
import { AlertStatus } from "../../interface/Entry";

export interface UiProviderProps {
  isDraggingEntry: boolean;
  isModalOpen: boolean;
  selectID: any;
  showMessages: { show: boolean; message: string; status: AlertStatus };
}
type Props = { children: ReactNode };

export const UI_INITAL_STATE: UiProviderProps = {
  isDraggingEntry: false,
  isModalOpen: false,
  selectID: "",
  showMessages: { show: false, message: "", status: "success" },
};

export const UIProvider: FC<Props> = ({ children }: Props) => {
  const [state, dispatch] = useReducer(UIReducer, UI_INITAL_STATE);

  const setIsDraggingEntry = (isDraggingEntry: boolean) => {
    return dispatch({ type: "UI - SetIsDragging", payload: isDraggingEntry });
  };

  const setIsModalOpen = (isModalOpen: boolean) => {
    return dispatch({ type: "UI - setIsOpenModal", payload: isModalOpen });
  };

  const setSelectID = (selectID: string) => {
    return dispatch({ type: "UI - SetSelectID", payload: selectID });
  };
  const setShowMessages = (
    show: boolean,
    message: string,
    status: AlertStatus
  ) => {
    return dispatch({
      type: "UI - SetShowMessages",
      payload: { show, message, status },
    });
  };

  return (
    <UiContext.Provider
      value={{
        ...state,
        setIsDraggingEntry,
        setIsModalOpen,
        setSelectID,
        setShowMessages,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
