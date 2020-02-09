import { ContentType, Platform } from './../types/facets';
const facets = {
  game_content_type: {
    name: 'Content Type',
    query_param_name: 'game_content_type',
    values: [
      {
        key: ContentType.Games,
        name: 'Games',
      },
      {
        key: ContentType.Bundles,
        name: 'Bundles',
      },
      {
        key: ContentType.Addons,
        name: 'Add-Ons',
      },
      {
        key: ContentType.Themes,
        name: 'Themes',
      },
      {
        key: ContentType.Avatars,
        name: 'Avatars',
      },
    ],
  },

  game_demo: {
    query_param_name: 'game_demo',
    values: [
      {
        key: 'true',
        name: 'true',
      },
    ],
  },

  release_date: {
    query_param_name: 'release_date',
    values: [
      {
        key: 'coming_soon',
        name: 'Coming Soon',
      },
      {
        key: 'last_7_days',
        name: 'Last 7 Days',
      },
      {
        key: 'last_30_days',
        name: 'Last 30 Days',
      },
    ],
  },

  price: {
    query_param_name: 'price',
    values: [
      {
        key: '0-199',
        name: 'Under $1.99',
      },
      {
        key: '200-499',
        name: '$2.00-$4.99',
      },
      {
        key: '500-999',
        name: '$5.00-$9.99',
      },
      {
        key: '1000-1999',
        name: '$10.00-$19.99',
      },
      {
        key: '2000-3999',
        name: '$20.00-$39.99',
      },
      {
        key: '4000-5999',
        name: '$40.00-$59.99',
      },
      {
        key: '6000-7999',
        name: '$60.00-$79.99',
      },
      {
        key: '8000-9999',
        name: '$80.00-$99.99',
      },
    ],
  },

  game_type: {
    query_param_name: 'game_type',
    values: [
      {
        key: 'ps4_full_games',
        name: 'PS4™ Full Games',
      },
      {
        key: 'psn_games',
        name: 'PSN Games',
      },
      {
        key: 'vr_games',
        name: 'PS VR Games',
      },
      {
        key: 'bundles',
        name: 'Bundles',
      },
      {
        key: 'psone_classics',
        name: 'PS one Classics',
      },
      {
        key: 'ps_vita_games',
        name: 'PS Vita Games',
      },
      {
        key: 'psp_games',
        name: 'PSP Games',
      },
    ],
  },

  platform: {
    name: 'Platform',
    query_param_name: 'platform',
    values: [
      {
        key: Platform.PS4,
        name: 'PS4™',
      },
      {
        key: Platform.PS3,
        name: 'PS3™',
      },
      {
        key: Platform.PSP,
        name: 'PSP',
      },
      {
        key: Platform.Vita,
        name: 'PS Vita',
      },
    ],
  },
};

export default facets;
