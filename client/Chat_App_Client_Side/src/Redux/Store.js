import {configureStore} from "@reduxjs/toolkit"
import UserReducer from "./UserSlice"

export const store = configureStore({
    reducer:{
        user:UserReducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:{
                // Socket.io instance is intentionally stored here
                ignoredActions:["user/SetSocketConnection"],
                ignoredPaths:["user.socketConnection"]
            }
        })
})