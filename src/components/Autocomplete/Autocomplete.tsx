import React, { useReducer, useEffect, useRef } from "react";
import {
  Actions,
  Constants,
  inputChangeAction,
  arrowUpAction,
  arrowDownAction,
  openItemListAction,
  closeItemListAction,
  setFilteredItemsAction,
} from "./actions";

type State<Item> = {
  value: string;
  highlightIndex: number;
  isOpen: boolean;
  filteredItems: Item[];
};

type InjectedAutocompleteProps<Item> = Pick<State<Item>, "highlightIndex"> & {};

interface Props<Item> {
  items?: Item[];
  getItemValue?: (item: Item) => string;
  filterFn?: (value: string) => (item: Item) => boolean;
  onItemSelectionFn?: Function;
  noMatchesLabel?: string;
}

const initialState = {
  value: "",
  highlightIndex: 0,
  isOpen: false,
  filteredItems: [],
};

const Autocomplete = <Item extends object>({
  items,
  getItemValue,
  filterFn,
  onItemSelectionFn,
  noMatchesLabel,
}: Props<Item>): JSX.Element => {
  const reducer = (state: State<Item>, action: Actions<Item>): State<Item> => {
    switch (action.type) {
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
            state.highlightIndex >= state.filteredItems.length - 1
              ? state.filteredItems.length - 1
              : state.highlightIndex + 1,
        };
      case Constants.SET_IS_OPEN:
        return {
          ...state,
          isOpen: action.payload,
          highlightIndex: 0,
        };
      case Constants.SET_FILTERED_ITEMS:
        return {
          ...state,
          filteredItems: action.payload,
          highlightIndex: 0,
        };
      default:
        return state;
    }
  };

  const [{ value, highlightIndex, isOpen, filteredItems }, dispatch] =
    useReducer(reducer, initialState);
  const itemsRef = useRef<Partial<Array<HTMLLIElement | null>>>([]);

  useEffect(() => {
    if (items) {
      itemsRef.current = Array.from({ length: items.length });
      dispatch(setFilteredItemsAction(items));
    }
  }, [items]);

  useEffect(() => {
    dispatch(
      setFilteredItemsAction(
        items?.filter(filterFn?.(value) || defaultFilter) || []
      )
    );
  }, [value]);

  const defaultFilter = (item: Item): boolean => {
    const itemValue = (getItemValue?.(item) || "").toLowerCase();

    if (!itemValue) return false;

    return itemValue.includes(value.toLowerCase());
  };

  const highlightMatches = (text: string): JSX.Element => {
    const matchIndex = text.toLowerCase().indexOf(value.toLowerCase());
    return (
      <>
        {text.slice(0, matchIndex)}
        <span className="text-highlighted">
          {text.slice(matchIndex, matchIndex + value.length)}
        </span>
        {text.slice(matchIndex + value.length)}
      </>
    );
  };

  const onItemSelection = (item: Item) => {
    dispatch(inputChangeAction(getItemValue?.(item) || value));
    dispatch(closeItemListAction());
    onItemSelectionFn?.(item);
  };

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
                itemsRef.current[highlightIndex - 1]?.scrollIntoView();
              }
              break;
            case "ArrowDown":
              e.preventDefault();
              if (!isOpen) {
                dispatch(openItemListAction());
              } else if (highlightIndex === filteredItems.length - 1) {
                dispatch(closeItemListAction());
              } else {
                dispatch(arrowDownAction());
                itemsRef.current[highlightIndex + 1]?.scrollIntoView();
              }
              break;
            case "Escape":
              e.preventDefault();
              dispatch(closeItemListAction());
              break;
            case "Enter":
              e.preventDefault();
              isOpen &&
                items?.length &&
                onItemSelection(filteredItems[highlightIndex]);
              break;
          }
        }}
      />
      {isOpen && (
        <ul className="items-list">
          {filteredItems.map((item, index) => {
            const itemValue = getItemValue?.(item) || "";
            return (
              <li
                className={`${
                  index === highlightIndex ? "item-highlighted" : ""
                } list-item`}
                ref={(el) => (itemsRef.current[index] = el)}
                onClick={(e) => {
                  e.stopPropagation();
                  onItemSelection(item);
                }}
              >
                {value === "" ? itemValue : highlightMatches(itemValue)}
              </li>
            );
          })}
          {filteredItems.length === 0 && (
            <li className="no-matches-item">
              {noMatchesLabel || "No matches found"}
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
