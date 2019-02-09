import React from 'react';
import { css } from 'emotion';
import { Router, RouteComponentProps } from '@reach/router';
import { UserOptionsContextProvider } from './UserOptionsContext';
import { StoreContextProvider } from './Store/StoreContext';
import Store from './Store';
import RedirectToDefaultStore from './RedirectToDefaultStore';

const Route = ({
  Component,
  ...routerProps
}: {
  Component: (routerProps: RouteComponentProps) => JSX.Element;
} & RouteComponentProps) => {
  return Component(routerProps);
};

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
        <Router
          className={css`
            height: 100%;
          `}
        >
          <Route
            path="stores/:storeId"
            Component={(props: RouteComponentProps<{ storeId: string }>) => (
              <StoreContextProvider
                key={props.storeId}
                storeName={props.storeId as string}
              >
                <Store />
              </StoreContextProvider>
            )}
          />
          <Route path="/" Component={() => <RedirectToDefaultStore />} />
        </Router>
      </UserOptionsContextProvider>
    </div>
  );
}

export default App;
