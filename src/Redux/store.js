import { configureStore} from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/dist/query";
// import { apiSlice } from "../features/api/apiSlice";
import { persistReducer } from "redux-persist";
import userReducer from './reducers'
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux";


const persistConfig = {
    key: 'root',
    storage,
}

// const reducers  = combineReducers({
//    user: userReducer
//     // [apiSlice.reducerPath]: apiSlice.reducer,
// })

const persistedReducer = persistReducer(persistConfig, userReducer )

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

// setupListeners(store.dispatch)