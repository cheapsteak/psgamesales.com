import localforage from 'localforage';

let localforageInstance: LocalForage;

try {
  localforageInstance = localforage.createInstance({
    driver: localforage.INDEXEDDB,
    name: 'ps-store',
    version: 1.0,
  });
} catch (e) {
  // eslint-disable-next-line no-console
  console.error(
    'Failed to create localforage instance. Indexeddb likely not available.',
    e,
  );
}

export { localforageInstance };
