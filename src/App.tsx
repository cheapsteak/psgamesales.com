import React from 'react';
import { css } from 'emotion';
import { UserOptionsContextProvider } from './UserOptionsContext';
import Store from './Store';

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
        <Store />
      </UserOptionsContextProvider>
    </div>
  );
}

export default App;
