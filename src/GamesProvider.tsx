import React, { useState, useContext, useEffect } from 'react';

import fetchGamesFromStore from './fetchGamesFromStore';
import { UserOptionsContext } from './UserOptionsContext';
import { GameData } from './GameData';

const defaultStore = `STORE-MSF77008-HOLIDAYSALELP`;

const GamesProvider: React.FunctionComponent<{
  children: (props) => any;
}> = props => {
  const { language, country, platforms, gameTypes } = useContext(
    UserOptionsContext,
  );
  const [store, setStore] = useState(defaultStore);
  const [games, setGames] = useState<GameData[]>([]);
  useEffect(() => {
    fetchGamesFromStore({
      store,
      language,
      country,
      platforms,
      gameTypes,
    }).then(returnedGames => setGames(returnedGames));
  }, []);

  return props.children({ games });
};

export default GamesProvider;
