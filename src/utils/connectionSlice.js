import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: 'connection',
    initialState: null,
    reducers: { // This object includes the actions for the user reducer
        addConnections: (state, action) => action.payload,
        removeConnections: () => null
    }
});

export const { addConnections, removeConnections } = connectionSlice.actions;

export default connectionSlice.reducer;