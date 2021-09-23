import { createContext, useContext, useReducer } from "react";
// ----------------------Setup Data layer-----------------------------------
// -------------------------------------------------------------------------
// We need this to track the Accounts
// This is the data layer
export const StateContext = createContext();

// Build the Provdeir
export const StateProvider = ({ reducer, initialState, children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};
// This is how we used inside a component
export const useStateValue = () => useContext(StateContext);
