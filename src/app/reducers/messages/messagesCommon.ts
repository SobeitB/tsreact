import {createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Console } from 'console';

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
   async (action, {getState}) => {
      console.log(action);
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
         state.messagesCommon.push(action.payload)
      }
   },
   extraReducers:{
      [messagesAsyncCommon.fulfilled.type]: (state, action: PayloadAction<MessagesArray[]>) => {
         for (let oldMessages in state.messagesCommon) {
            for(let newMesaages in action.payload) {
               if(action.payload[oldMessages].id === action.payload[newMesaages].id) {
                  state.scrollAvailable = false;
               }
            }
         }
         action.payload.sort((prevDate: MessagesArray, NextDate: MessagesArray): number => {
            return new Date(prevDate.createdAt).getTime() - new Date(NextDate.createdAt).getTime();
         })

         if(state.scrollAvailable) state.messagesCommon.unshift(...action.payload)
      }
   }
})

export default messagesCommon.reducer;