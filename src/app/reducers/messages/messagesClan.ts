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

export const messagesAsyncClan = createAsyncThunk(
   "users/messagesUsersClan",
   async (_, {getState}) => {
      const state:any = getState()
      const stateMessagesNext:number = state.messagesClan.messagesNext
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

export const messagesClan = createSlice({
   name:'messagesUsersClan',
   initialState, 
   reducers:{
      messageNewClan(state) {
         state.messagesNext += 15;
      },
      messageYourClan(state,action: PayloadAction<MessagesArray>) {
         if(state.scrollAvailable) state.messages.push(action.payload)
      }
   },
   extraReducers:{
      [messagesAsyncClan.fulfilled.type]: (state, action: PayloadAction<MessagesArray[]>) => {
         for (let oldMessages in state.messages) {
            for(let newMesaages in action.payload) {
               if(state.messages[oldMessages].id === action.payload[newMesaages].id) {
                  state.scrollAvailable = false;
               }
            }
         }
         console.log('new')
         if(state.scrollAvailable) state.messages.unshift(...action.payload)
      }
   }
})

export default messagesClan.reducer;