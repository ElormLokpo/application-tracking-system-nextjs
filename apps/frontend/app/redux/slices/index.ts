import { combineReducers } from "@reduxjs/toolkit";
import authSlice  from "./authSlice";
import storage from "redux-persist/es/storage";
import { persistReducer } from "redux-persist";


export const combinedReducer = combineReducers({
    auth: authSlice
})

export const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"],
}

export const persistedReducer = persistReducer(persistConfig, combinedReducer)