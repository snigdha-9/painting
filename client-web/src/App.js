import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from './theme';
import Main from 'pages/Main';
import { AppProvider } from 'store/app';
import localStorageService from 'services/localStorage';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux';

const store = ConfigureStore();

function App() {
  return (
    <Router>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <AppProvider
            value={{
              isAuthenticated: localStorageService.isAuthenticated(),
              user: localStorageService.getUser()
            }}
          >
            <Main />
          </AppProvider>
        </ChakraProvider>
      </Provider>
    </Router>
  );
}

export default App;
