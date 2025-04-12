import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: { // This object includes the actions for the user reducer
        addUser: (state, action) => {
            return action.payload;
        },
        removeUser: () => {
            return null;
        }
    }
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;