import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const statusEmailCodeSlice = createSlice({
    name: "status",
    initialState: "pending",
    reducers: {
        setStatus: (state, action) => {
            return action.payload; // Actualizar el estado correctamente.
        },
    },
});

export const verifyEmailCodeThunk = (code) => (dispatch) => {
    axios
        .get(
            `https://back-end-vivirchevere.onrender.com/api/v1/customers/verify/${code}`
        )
        .then((resp) => {
            console.log(resp.data);
            dispatch(setStatus(resp.data.status));
        })
        .catch((error) => {
            console.error(error);
            // dispatch(setStatus("error"));
        });
};

export const { setStatus } = statusEmailCodeSlice.actions;

export default statusEmailCodeSlice.reducer;
