import { Entry } from "../../interface";
import { EntryInitialState } from "./EntryProvider";

type EntryType =
  | {
      payload: any;
      type:
        | "Entry - AddEntry"
        | "Entry - EditEntry"
        | "Entry - DeleteEntry"
        | "Entry - IsAddingEntry";
    }
  | {
      type: "Entry - UpdateStatus";
      payload: Entry;
    }
  | {
      type: "Entry - RefreshData";
      payload: Entry[];
    };
export const EntryReducer = (state = EntryInitialState, action: EntryType) => {
  switch (action.type) {
    case "Entry - AddEntry":
      return { ...state, entries: [...state.entries, action.payload] };
    case "Entry - EditEntry":
      return {
        ...state,
        entries: state.entries.map((entry) => {
          entry._id === action.payload._id ? action.payload : entry;
        }),
      };
    case "Entry - DeleteEntry":
      return {
        ...state,
        entries: state.entries.filter(
          (entry) => entry._id !== action.payload._id
        ),
      };
    case "Entry - IsAddingEntry":
      return { ...state, isAddingEntry: action.payload };

    case "Entry - UpdateStatus":
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }
          return entry;
        }),
      };

    case "Entry - RefreshData":
      return {
        ...state,
        entries: [...action.payload],
      };

    default:
      return state;
  }
};
