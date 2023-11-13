import { createSlice } from '@reduxjs/toolkit';

/* if I found data in my local storage */
const persistedState = localStorage.getItem('persist:root');

/* new user */
const newUser = {}

const initialState = persistedState ? JSON.parse(persistedState) : newUser;

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        save() {},
        logOut() {},
    }
})

export const {save, logOut} = userSlice.actions;

export default userSlice.reducer