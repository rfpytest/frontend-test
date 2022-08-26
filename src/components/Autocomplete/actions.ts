export const Constants = {
  INPUT_CHANGE: "INPUT_CHANGE",
  CLEAR_INPUT: "CLEAR_INPUT",
  ARROW_DOWN: "ARROW_DOWN",
  ARROW_UP: "ARROW_UP",
  SET_MAX_INDEX: "SET_MAX_INDEX",
  SET_IS_OPEN: "SET_IS_OPEN",
} as const;

export const inputChangeAction = (value: string) => ({
  type: Constants.INPUT_CHANGE,
  payload: value,
});

export const clearInputAction = () => ({ type: Constants.CLEAR_INPUT });

export const arrowUpAction = () => ({
  type: Constants.ARROW_UP,
});

export const arrowDownAction = () => ({
  type: Constants.ARROW_DOWN,
});

export const setMaxIndexAction = (maxIndex: number) => ({
  type: Constants.SET_MAX_INDEX,
  payload: maxIndex,
});

export const openItemListAction = () => ({
  type: Constants.SET_IS_OPEN,
  payload: true,
});

export const closeItemListAction = () => ({
  type: Constants.SET_IS_OPEN,
  payload: false,
});

export type Actions = ReturnType<
  | typeof inputChangeAction
  | typeof clearInputAction
  | typeof arrowUpAction
  | typeof arrowDownAction
  | typeof setMaxIndexAction
  | typeof openItemListAction
  | typeof closeItemListAction
>;
