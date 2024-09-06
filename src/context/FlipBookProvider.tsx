import { ReactNode, useReducer } from "react";
import { initState, TState, flipBook } from "./FlipBookContext";

const flipBookReducer = (
  state: TState,
  action: { type: string; payload?: ReactNode }
) => {
  switch (action.type) {
    case "setFlipBook":
      return {
        ...state,
        flipBookEl: action.payload,
      };
    case "deleteFlipBook":
      return initState;
    default:
      return state;
  }
};

export const FlipBookProvider = ({ children }: { children: ReactNode }) => {
  const [flipBookEl, dispatch] = useReducer(flipBookReducer, initState);
  return (
    <flipBook.Provider value={{ flipBook: flipBookEl, dispatch }}>
      {children}
    </flipBook.Provider>
  );
};
