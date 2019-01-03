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
  const [isLoading, setIsLoading] = useState(false);
  const [hasPartialContent, setHasPartialContent] = useState(false);

  useEffect(
    () => {
      setIsLoading(true);
      fetchGamesFromStore({
        store,
        language,
        country,
        platforms,
        gameTypes,
        onPartialResponse: partialGames => {
          setGames(partialGames);
          setHasPartialContent(true);
        },
      }).then(returnedGames => {
        setGames(returnedGames);
        setIsLoading(false);
      });
    },
    [language, country, platforms.join(','), gameTypes.join(',')],
  );

  return props.children({ games, isLoading, hasPartialContent });
};

export default GamesProvider;
