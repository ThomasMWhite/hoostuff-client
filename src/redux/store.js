import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import dataReducer from './dataReducer';

const initialState={};

const middleware = [thunk];

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, dataReducer)
  
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;
  
  const enhancer = composeEnhancers(applyMiddleware(...middleware));
  const store = createStore(persistedReducer, initialState, enhancer);
  let persistor = persistStore(store)

export default {store, persistor};