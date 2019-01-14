import React from 'react';
import { css } from 'emotion';
import { UserOptionsContextProvider } from './UserOptionsContext';
import { StoreContextProvider } from './Store/StoreContext';
import Store from './Store';

const defaultStore = `STORE-MSF77008-HOLIDAYSALELP`;

function App() {
  return (
    <div
      className={
        'App ' +
        css`
          height: 100%;
        `
      }
    >
      <UserOptionsContextProvider>
        <StoreContextProvider storeName={defaultStore}>
          <Store />
        </StoreContextProvider>
      </UserOptionsContextProvider>
    </div>
  );
}

export default App;
