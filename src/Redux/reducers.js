import { createSlice } from "@reduxjs/toolkit";


const initialValue = {
    isLogedIn: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: initialValue,
      },
    reducers:{
        setIsLogedIn: (state, action)=>{
            state.value.isLogedIn = action.payload.isLogedIn
        }
    }

})

export const {setIsLogedIn} =  userSlice.actions
export default userSlice.reducer

