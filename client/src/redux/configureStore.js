import {compose, combineReducers, createStore, applyMiddleware} from 'redux';
import {persistStore} from 'redux-persist';
import {persistReducer} from 'redux-persist';
import {authReducer} from './Reducers/auth';
import {cartReducer} from './Reducers/cart';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'cart'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

const persistRootReducer = persistReducer(persistConfig, rootReducer);

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const middlewares = [];

export const configureStore = createStore(
  persistRootReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);

export const persistedStore = persistStore(configureStore);
