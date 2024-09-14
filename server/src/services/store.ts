import * as store from '@leapfrogtechnology/async-store';

// TODO: Need way to handle types for store

export function initializeStore() {
  return store.initializeMiddleware();
}

export function addToStore(value: unknown) {
  store.set(value);
}

export function getFromStore(key: string) {
  return store.get(key);
}

export function getShortId(): string {
  return store.getShortId();
}
