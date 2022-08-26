import React, { useReducer, useEffect } from "react";
import {
  Actions,
  Constants,
  inputChangeAction,
  arrowUpAction,
  arrowDownAction,
  setMaxIndexAction,
  openItemListAction,
  closeItemListAction,
} from "./actions";

type State = {
  value: string;
  highlightIndex: number;
  maxIndex: number;
  isOpen: boolean;
};

type InjectedAutocompleteProps = Pick<State, "highlightIndex"> & {};

interface Props<Item> {
  items?: Item[];
  getItemValue?: (item: Item) => string;
  children?(props: InjectedAutocompleteProps): JSX.Element;
}

const initialState: State = {
  value: "",
  highlightIndex: 0,
  maxIndex: 0,
  isOpen: false,
};

const reducer = (state: State, action: Actions): State => {
  console.log(action);
  switch (action.type) {
    case Constants.CLEAR_INPUT:
      return initialState;
    case Constants.INPUT_CHANGE:
      return {
        ...state,
        value: action.payload,
        highlightIndex: 0,
        isOpen: action.payload !== "",
      };
    case Constants.ARROW_UP:
      return {
        ...state,
        highlightIndex: state.highlightIndex && state.highlightIndex - 1,
      };
    case Constants.ARROW_DOWN:
      return {
        ...state,
        highlightIndex:
          state.highlightIndex >= state.maxIndex
            ? state.maxIndex
            : state.highlightIndex + 1,
      };
    case Constants.SET_MAX_INDEX:
      return {
        ...state,
        maxIndex: action.payload,
        highlightIndex: 0,
      };
    case Constants.SET_IS_OPEN:
      return {
        ...state,
        isOpen: action.payload,
        highlightIndex: 0,
      };
    default:
      return state;
  }
};

const Autocomplete = <Item extends object>({
  children,
  items,
  getItemValue,
}: Props<Item>): JSX.Element => {
  const [{ value, highlightIndex, isOpen, maxIndex }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    if (items) {
      dispatch(setMaxIndexAction(items.length && items.length - 1));
    }
  }, [items]);
  if (children) {
    return children({ highlightIndex });
  }

  return (
    <div className="autocomplete-wrapper">
      <input
        value={value}
        onChange={(e) => dispatch(inputChangeAction(e.target.value))}
        onKeyDown={(e) => {
          switch (e.key) {
            case "ArrowUp":
              e.preventDefault();
              if (!isOpen) {
                dispatch(openItemListAction());
              } else if (highlightIndex === 0) {
                dispatch(closeItemListAction());
              } else {
                dispatch(arrowUpAction());
              }
              break;
            case "ArrowDown":
              e.preventDefault();
              if (!isOpen) {
                dispatch(openItemListAction());
              } else if (highlightIndex === maxIndex) {
                dispatch(closeItemListAction());
              } else {
                dispatch(arrowDownAction());
              }
              break;
            case "Esc": // IE/Edge specific value
            case "Escape":
              e.preventDefault();
              dispatch(closeItemListAction());
              break;
          }
        }}
      />
      {isOpen && (
        <ul className="items-list">
          {items?.map((item, index) => (
            <li className={index === highlightIndex ? "item-highlighted" : ""}>
              {getItemValue?.(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
