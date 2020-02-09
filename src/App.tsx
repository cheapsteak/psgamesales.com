import React from 'react';
import { css } from 'emotion';
import { Router, RouteComponentProps } from '@reach/router';
import * as routes from "src/routes";
import { UserOptionsContextProvider } from './UserOptionsContext';
import { StoreContextProvider } from './Store/StoreContext';
import Store from './Store';
import RedirectToDefaultStore from './RedirectToDefaultStore';
import StorefrontContainer from './StorefrontContainer';

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
        <StorefrontContainer.Provider>
          <Router
            className={css`
              height: 100%;
            `}
          >
            <Route
              path={routes.storefront()}
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
        </StorefrontContainer.Provider>
      </UserOptionsContextProvider>
    </div>
  );
}

export default App;
