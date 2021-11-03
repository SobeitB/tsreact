import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import chengedSlice from './reducers/messages/chengedSlice'
import messagesCommon from './reducers/messages/messagesCommon'
import messagesClan from './reducers/messages/messagesClan'
import messagesFriends from './reducers/messages/messagesFriends'
import messagesNews from './reducers/messages/messagesNews'

export const store = configureStore({
  reducer: {
    chengedSlice,
    messagesCommon,
    messagesClan,
    messagesFriends,
    messagesNews
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
