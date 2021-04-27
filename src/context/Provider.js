import React, { createContext, useReducer } from 'react'
import { catsReducer } from './reducers/catsReducer'
import { catsInitialState } from './initialStates/catsInitialState'

export const GlobalContext = createContext({})

export const GlobalProvider = ({ children }) => {
  const [cats, dispatch] = useReducer(catsReducer, catsInitialState)
  return (
    <GlobalContext.Provider value={{ cats, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}
