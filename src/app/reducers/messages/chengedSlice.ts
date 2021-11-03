import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface chengedType{
   language: string;
   chatType: string;
};

const initialState: chengedType = {
   language:'RU',
   chatType:'common',
};

export const chengedSlice = createSlice({
   name:'chenged',
   initialState, 
   reducers: {
      languageChanged(state, action: PayloadAction<string>) {
         state.language = action.payload;
      },
      ChatChanged(state, action: PayloadAction<string>) {
         state.chatType = action.payload;
      },
   }
});

export default chengedSlice.reducer;