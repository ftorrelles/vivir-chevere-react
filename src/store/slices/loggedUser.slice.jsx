import { createSlice } from "@reduxjs/toolkit";

export const loggedUserSlice = createSlice({
    name: "loggedUser",
    initialState: {},
    reducers: {
        setloggedUser: (state, action) => {
            return action.payload;
        },
    },
});

export const { setloggedUser } = loggedUserSlice.actions;

export default loggedUserSlice.reducer;
