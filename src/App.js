import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { ThemeProvider } from "styled-components";

import minesweeperReducer from "./containers/Layout/reducer";

import Layout from "./containers/Layout";
import theme from "./style/theme";

const initAction = {
  type: 'RESET_GAME',
};

const App = () => {
  const store = createStore(
    minesweeperReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  store.dispatch(initAction);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
