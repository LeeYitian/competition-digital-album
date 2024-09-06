import { createContext, ReactNode, Dispatch, useContext } from "react";

export type TState = {
  flipBookEl: ReactNode;
};

export const initState = {
  flipBookEl: null,
};

export const flipBook = createContext<{
  flipBook: TState;
  dispatch: Dispatch<{ type: string; payload?: ReactNode }>;
}>({
  flipBook: initState,
  dispatch: () => {},
});

export const useFlipBook = () => useContext(flipBook);
