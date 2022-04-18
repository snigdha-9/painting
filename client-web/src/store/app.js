import React, { useReducer } from 'react';

const INITIAL_STATE = {
  isAuthenticated: false
};

const reducer = (state, action) => ({ ...state, ...action });

const AppContext = React.createContext([]);

export const AppProvider = ({ children, value }) => {
  const [displayMenu, setDisplayMenu] = React.useState(true);
  const [sourceId, setSourceId] = React.useState(0);
  const data = useReducer(reducer, { ...INITIAL_STATE, ...value });

  return (
    <AppContext.Provider value={[...data, { displayMenu, setDisplayMenu }, { sourceId, setSourceId }]}>
      {children}
    </AppContext.Provider>
  );
};

export const AppConsumer = AppContext.Consumer;

export default AppContext;
