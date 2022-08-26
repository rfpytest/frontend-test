export const Constants = {
  INPUT_CHANGE: "INPUT_CHANGE",
  ARROW_DOWN: "ARROW_DOWN",
  ARROW_UP: "ARROW_UP",
  SET_IS_OPEN: "SET_IS_OPEN",
  SET_FILTERED_ITEMS: "SET_FILTERED_ITEMS",
} as const;

export const inputChangeAction = (value: string) => ({
  type: Constants.INPUT_CHANGE,
  payload: value,
});

export const arrowUpAction = () => ({
  type: Constants.ARROW_UP,
});

export const arrowDownAction = () => ({
  type: Constants.ARROW_DOWN,
});

export const openItemListAction = () => ({
  type: Constants.SET_IS_OPEN,
  payload: true,
});

export const closeItemListAction = () => ({
  type: Constants.SET_IS_OPEN,
  payload: false,
});

export const setFilteredItemsAction = <Item>(items: Item[]) => ({
  type: Constants.SET_FILTERED_ITEMS,
  payload: items,
});

export type Actions<Item> = ReturnType<
  | typeof inputChangeAction
  | typeof arrowUpAction
  | typeof arrowDownAction
  | typeof openItemListAction
  | typeof closeItemListAction
  | typeof setFilteredItemsAction<Item>
>;
