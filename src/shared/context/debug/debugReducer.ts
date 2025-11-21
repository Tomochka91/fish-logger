import type { DebugMessage } from "../../types/debug";

export interface DebugState {
  messages: DebugMessage[];
  autoscroll: boolean;
}

export const initialState: DebugState = {
  messages: [],
  autoscroll: true,
};

export type DebugAction =
  | { type: "ADD_MESSAGE"; payload: DebugMessage }
  | { type: "CLEAR_MESSAGES" }
  | { type: "TOGGLE_AUTOSCROLL" };

export function debugReducer(
  state: DebugState,
  action: DebugAction
): DebugState {
  switch (action.type) {
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    case "CLEAR_MESSAGES":
      return { ...state, messages: [] };
    case "TOGGLE_AUTOSCROLL":
      return { ...state, autoscroll: !state.autoscroll };
    default:
      return state;
  }
}
