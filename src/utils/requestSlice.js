import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: 'requests',
    initialState: null,
    reducers: {
        addRequest: (state, action) => action.payload,
        removeRequest: (state, action) => {
            const newArray = state.filter(r => r._id !== action.payload);
            return newArray;
        },
        emptyRequests: () => null,
    }
});

export const { addRequest, removeRequest, emptyRequests } = requestSlice.actions;

export default requestSlice.reducer;
