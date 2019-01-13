// these affect the data.attributes['total-results'] of the server response

// ?platform=ps4
export enum Platform {
  PS4 = 'ps4',
  PS3 = 'ps3',
  Vita = 'vita',
}

// ?game_type=ps4_full_games
export enum GameType {
  PS4_Full_Games = 'ps4_full_games',
  PS3_Full_Games = 'ps3_full_games',
  PSN_Games = 'psn_games',
  VR_Games = 'vr_games',
  Bundles = 'bundles',
}

// game_content_type=games
export enum ContentType {
  Games = 'games',
  Bundles = 'bundles',
  Addons = 'addons',
  Themes = 'themes',
  Avatars = 'avatars',
}
