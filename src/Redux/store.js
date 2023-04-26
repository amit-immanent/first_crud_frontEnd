import { configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "redux";
// import { setupListeners } from "@reduxjs/toolkit/dist/query";
// import { apiSlice } from "../features/api/apiSlice";
import { persistReducer } from "redux-persist";
import userReducer from './reducers'
import storage from 'redux-persist/lib/storage'



const persistConfig = {
    key: 'root',
    storage,
}

const rootReducers  = combineReducers({
    user: userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducers )

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

// setupListeners(store.dispatch)