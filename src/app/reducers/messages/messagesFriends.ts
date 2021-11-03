import {createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface MessagesArray {
   createdAt:string;
   from:string;
   id:string;
   text:string;
}

interface InitialInterface {
   messages: MessagesArray[];
   messagesNext: number;
   scrollAvailable:boolean;
}

export const messagesAsyncFriends = createAsyncThunk(
   "users/messagesUsersFriends",
   async (_, {getState}) => {
      const state:any = getState()
      const stateMessagesNext:number = state.messagesFriends.messagesNext
      const response = await fetch(`https://test-chat-backend-hwads.ondigitalocean.app/api/messages?skip=${stateMessagesNext}&limit=15`);
      const data:MessagesArray[] = await response.json();
      return data;
   }
)

const initialState: InitialInterface = {
   messages:[], 
   messagesNext: 0,
   scrollAvailable:true
}

export const messagesFriends = createSlice({
   name:'messagesUsersFriends',
   initialState, 
   reducers:{
      messageNewFriends(state) {
         state.messagesNext += 15;
      },
      messageYourFriends(state,action: PayloadAction<MessagesArray>) {
         if(state.scrollAvailable) state.messages.push(action.payload)
      }
   },
   extraReducers:{
      [messagesAsyncFriends.fulfilled.type]: (state, action: PayloadAction<MessagesArray[]>) => {
         for (let oldMessages in state.messages) {
            for(let newMesaages in action.payload) {
               if(state.messages[oldMessages].id === action.payload[newMesaages].id) {
                  state.scrollAvailable = false;
               }
            }
         }

         if(state.scrollAvailable) state.messages.unshift(...action.payload)
      }
   }
})

export default messagesFriends.reducer;