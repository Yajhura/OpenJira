import { UI_INITAL_STATE } from "./UIProvide";
import { AlertStatus } from "../../interface/Entry";

type UiType =
  | {
      type: "UI - SetIsDragging" | "UI - setIsOpenMenu" | "UI - setIsOpenModal";
      payload: boolean;
    }
  | {
      type: "UI - SetSelectID";
      payload: any;
    }
  | {
      type: "UI - SetShowMessages";
      payload: { show: boolean; message: string; status: AlertStatus };
    };

export const UIReducer = (state = UI_INITAL_STATE, action: UiType) => {
  switch (action.type) {
    case "UI - SetIsDragging":
      return { ...state, isDraggingEntry: action.payload };

    case "UI - setIsOpenModal":
      return { ...state, isModalOpen: action.payload };

    case "UI - SetSelectID":
      return { ...state, selectID: action.payload };

    case "UI - SetShowMessages":
      return { ...state, showMessages: action.payload };

    default:
      return state;
  }
};
