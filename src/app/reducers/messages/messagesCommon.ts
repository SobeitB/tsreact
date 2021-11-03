import {createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface MessagesArray {
   createdAt:string;
   from:string;
   id:string;
   text:string;
}

interface InitialInterface {
   messagesCommon: MessagesArray[];
   messagesNext: number;
   scrollAvailable:boolean;
}

export const messagesAsyncCommon = createAsyncThunk(
   "users/messagesUsersCommon",
   async (_, {getState}) => {
      const state:any = getState()
      const stateMessagesNext:number = state.messagesCommon.messagesNext
      const response = await fetch(`https://test-chat-backend-hwads.ondigitalocean.app/api/messages?skip=${stateMessagesNext}&limit=15`);
      const data:MessagesArray[] = await response.json();
      return data;
   }
)

const initialState: InitialInterface = {
   messagesCommon:[], 
   messagesNext: 0,
   scrollAvailable:true
}

export const messagesCommon = createSlice({
   name:'messagesUsersCommon',
   initialState, 
   reducers:{
      messageNewCommon(state) {
         state.messagesNext += 15;
      },
      messageYourCommon(state,action: PayloadAction<MessagesArray>) {
         if(state.scrollAvailable) state.messagesCommon.push(action.payload)
      }
   },
   extraReducers:{
      [messagesAsyncCommon.fulfilled.type]: (state, action: PayloadAction<MessagesArray[]>) => {
         for (let oldMessages in state.messagesCommon) {
            for(let newMesaages in action.payload) {
               if(state.messagesCommon[oldMessages].id === action.payload[newMesaages].id) {
                  state.scrollAvailable = false;
               }
            }
         }
         
         if(state.scrollAvailable) state.messagesCommon.unshift(...action.payload)
      }
   }
})

export default messagesCommon.reducer;