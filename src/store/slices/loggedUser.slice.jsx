import { createSlice } from "@reduxjs/toolkit";

export const loggedUserSlice = createSlice({
    name: "loggedUser",
    initialState: null,
    reducers: {
        setloggedUser: (state, action) => {
            return action.payload;
        },
    },
});

export const { setloggedUser } = loggedUserSlice.actions;

export default loggedUserSlice.reducer;
