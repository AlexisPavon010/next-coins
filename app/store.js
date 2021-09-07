import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slices/userReducer'


export const store = configureStore({
    reducer: {
        user: userReducer,
    }
});

