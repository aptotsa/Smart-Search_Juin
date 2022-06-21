import React, { useReducer, useContext, createContext, useEffect, ReactElement } from "react"
import { SearchType } from "./SearchContext"

type FavoriteType = {
  id: number
  label: string
  search: Array<SearchType>
}

type FavoritesContextState = Array<FavoriteType>

export enum FavoritesActionTypes {
  ADD_TO_FAVORITES = "ADD_TO_FAVORITES",
  REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES",
  EMPTY_FAVORITES = "EMPTY_FAVORITES"
}

type FavoritesAction = {
  type: FavoritesActionTypes
  payload: FavoriteType
}

export const FavoritesStateContext = createContext<FavoritesContextState | undefined>(undefined)
const FavoritesDispatchContext = createContext<React.Dispatch<FavoritesAction> | undefined>(undefined)

const initialValue: FavoritesContextState =
  localStorage.getItem("smartsearch:favorites") !== null
    ? JSON.parse(localStorage.getItem("smartsearch:favorites") || "null")
    : []

const reducer = (state: FavoritesContextState, action: FavoritesAction) => {
  switch (action.type) {
    case FavoritesActionTypes.ADD_TO_FAVORITES:
      return [...state, action.payload]
    case FavoritesActionTypes.REMOVE_FROM_FAVORITES:
      return state.filter((fav) => fav.id !== action.payload.id)
    case FavoritesActionTypes.EMPTY_FAVORITES:
      localStorage.removeItem("smartsearch:favorites")
      return initialValue
    default:
      throw new Error(`unknown action ${action.type}`)
  }
}

export const FavoritesProvider = ({ children }: { children: React.ReactNode }): ReactElement<any, any> => {
  const [state, dispatch] = useReducer(reducer, initialValue)

  useEffect(() => {
    localStorage.setItem("smartsearch:favorites", JSON.stringify(state))
  }, [state])

  return (
    <FavoritesDispatchContext.Provider value={dispatch}>
      <FavoritesStateContext.Provider value={state}>{children}</FavoritesStateContext.Provider>
    </FavoritesDispatchContext.Provider>
  )
}

export const useFavorites = (): FavoritesContextState => {
  const context = useContext(FavoritesStateContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesStateContext")
  }
  return context
}

export const useDispatchFavorites = (): React.Dispatch<FavoritesAction> => {
  const context = useContext(FavoritesDispatchContext)
  if (context === undefined) {
    throw new Error("useDispatchFavorites must be used within a FavoritesStateContext")
  }
  return context
}
