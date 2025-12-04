import { combineReducers } from "@reduxjs/toolkit";
import authSlice  from "./authSlice";
import storage from "redux-persist/es/storage";
import { persistReducer } from "redux-persist";
import registerSlice from "./registerSlice";


export const combinedReducer = combineReducers({
    auth: authSlice,
    register: registerSlice
})

export const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth","register"],
}

export const persistedReducer = persistReducer(persistConfig, combinedReducer)