import createContainer from 'constate';

import useStorefronts from './useStorefronts';

const StorefrontContainer = createContainer(useStorefronts);

export default StorefrontContainer;
