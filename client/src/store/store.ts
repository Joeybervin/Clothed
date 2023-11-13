

import { combineReducers } from 'redux';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore, getDefaultMiddleware  } from '@reduxjs/toolkit'

/* reducers */
import userSlice from './slices/userSlice'
import cartSlice from './slices/cartSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'cart'],
};


const rootReducer = combineReducers({
  user: userSlice,
  cart: cartSlice,
});

const persistedRootReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});

export const persistor = persistStore(store);