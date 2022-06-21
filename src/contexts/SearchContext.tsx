import React, { useReducer, useContext, createContext, ReactElement } from "react"

export type SearchType = { groupName: string; keyword: string }

type SearchTypeItem = {
  id: number
  search: SearchType[]
}

type SearchContextState = {
  current: SearchTypeItem | null
  last: SearchTypeItem[]
}

export enum SearchActionTypes {
  NEW_SEARCH = "NEW_SEARCH",
  REMOVE_LAST_SEARCH = "REMOVE_LAST_SEARCH",
  CLEAR_SEARCH = "CLEAR_SEARCH"
}

type SearchAction = {
  type: SearchActionTypes
  payload: SearchTypeItem
}

export const SearchStateContext = createContext<SearchContextState | undefined>(undefined)
const SearchDispatchContext = createContext<React.Dispatch<SearchAction> | undefined>(undefined)

const initialValue: SearchContextState = { current: null, last: [] }

const reducer = (state: SearchContextState, action: SearchAction) => {
  switch (action.type) {
    case SearchActionTypes.NEW_SEARCH:
      if (!state.current) return { ...state, current: action.payload }

      return { last: [...state.last, state.current], current: action.payload }
    case SearchActionTypes.REMOVE_LAST_SEARCH:
      return {
        ...state,
        last: state.last.filter((oldSearch) => oldSearch.id === action.payload.id)
      }
    case SearchActionTypes.CLEAR_SEARCH:
      return initialValue
    default:
      throw new Error(`unknown action ${action.type}`)
  }
}

export const SearchProvider = ({ children }: { children: React.ReactNode }): ReactElement<any, any> => {
  const [state, dispatch] = useReducer(reducer, initialValue)

  return (
    <SearchDispatchContext.Provider value={dispatch}>
      <SearchStateContext.Provider value={state}>{children}</SearchStateContext.Provider>
    </SearchDispatchContext.Provider>
  )
}

export const useSearch = (): SearchContextState => {
  const context = useContext(SearchStateContext)
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchStateContext")
  }
  return context
}

export const useDispatchSearch = (): React.Dispatch<SearchAction> => {
  const context = useContext(SearchDispatchContext)
  if (context === undefined) {
    throw new Error("useDispatchSearch must be used within a SearchStateContext")
  }
  return context
}
