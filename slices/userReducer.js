import { createSlice } from "@reduxjs/toolkit";
import { destroyCookie, setCookie } from "nookies";

const initialState = {
    loading: true,
    existe: false,
    user: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            // console.log(action.payload)
            state.user = [...state.user, action.payload]
            setCookie(null, 'token', action.payload.uid, {
                maxAge: 30 * 24 * 60 * 60,
              }),
              window.sessionStorage.setItem('session', JSON.stringify(action.payload))
        },
        removeUser: (state, action) => {
            const itemIndex = state.user.findIndex(
                (userItem) => userItem.id === action.id
            );
            let newUser = [...state.user];
            if (itemIndex >= 0) {
                if (newUser[itemIndex].quantity > 1) {
                    newUser[itemIndex].quantity -= 1;
                } else {
                    newUser.splice(itemIndex, 1);
                }
            } else {
                console.warn("Item Not Found");
            }
            sessionStorage.removeItem("session");
            return {
                ...state,
                user: newUser,
            };
        },
        recuperarUser: (state, action) => {
            // console.log(action.payload)
            state.user = [...state.user, action.payload]
            setCookie(null, 'token', action.payload.uid, {
                maxAge: 30 * 24 * 60 * 60,
              }),
              window.sessionStorage.setItem('session', JSON.stringify(action.payload))
        },
    }
})

const userState = (state) => state.user.user

export const { addUser, removeUser, recuperarUser} = userSlice.actions;

export {userState}

export default userSlice.reducer;