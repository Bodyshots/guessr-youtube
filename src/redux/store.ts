'use client';

import gameReducer from './slices/gameSlice';
import privacyReducer from './slices/privacySlice';
import { GameState, PrivacyState } from './slices/types';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, PersistedState } from 'redux-persist';
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

//// Helpers
// Helper for creating persistent configs
const createPersistConfig = (key: string, whitelist: string[]) => ({
  key,
  storage,
  whitelist,
});

// Helper to create persistent reducers
const createPersistedReducer = (sliceReducer: any, persistConfig: any) => 
  persistReducer(persistConfig, sliceReducer);

const gamePersistConfig = createPersistConfig('game', ['video', 'clips', 'mode', 'timer']);
const privacyPersistConfig = createPersistConfig('privacy', ['privacy_ack']);

const rootReducer = combineReducers({
  game_persist: createPersistedReducer(gameReducer, gamePersistConfig),
  privacy_persist: createPersistedReducer(privacyReducer, privacyPersistConfig)
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
})

export interface RootState {
  game_persist: PersistedState & GameState;
  privacy_persist: PersistedState & PrivacyState;
}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;