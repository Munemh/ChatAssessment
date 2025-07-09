import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MMKV } from 'react-native-mmkv';
import { AppDispatch } from './store';

const mmkv = new MMKV();

export const loadChatsFromStorage = () => (dispatch: AppDispatch) => {
  const stored = mmkv.getString('chats');
  if (stored) {
    dispatch(setChats(JSON.parse(stored)));
  }
};

export const saveChatsToStorage = (chats: Chat[]) => {
  mmkv.set('chats', JSON.stringify(chats));
};

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'me';
  timestamp: string;
}

interface Chat {
  id: string;
  name: string;
  messages: Message[];
  favorite: boolean;
}

interface ChatState {
  chats: Chat[];
}

const initialState: ChatState = {
  chats: [
    {
      id: '1',
      name: 'John Doe',
      messages: [
        { id: 'm1', text: 'Hey there!', sender: 'user', timestamp: new Date().toISOString() },
        { id: 'm2', text: 'Hello, how are you?', sender: 'me', timestamp: new Date().toISOString() }
      ],
      favorite: false
    },
    {
      id: '2',
      name: 'Jane Smith',
      messages: [
        { id: 'm1', text: 'Are we meeting today?', sender: 'user', timestamp: new Date().toISOString() },
        { id: 'm2', text: 'Yes, 6 PM.', sender: 'me', timestamp: new Date().toISOString() }
      ],
      favorite: false
    },
    {
      id: '3',
      name: 'Bob Johnson',
      messages: [
        { id: 'm1', text: 'Project updates?', sender: 'user', timestamp: new Date().toISOString() },
        { id: 'm2', text: 'Shared on email.', sender: 'me', timestamp: new Date().toISOString() }
      ],
      favorite: true
    },
    {
      id: '4',
      name: 'Alice Brown',
      messages: [
        { id: 'm1', text: 'Let’s catch up soon!', sender: 'user', timestamp: new Date().toISOString() },
        { id: 'm2', text: 'Sure, sounds great.', sender: 'me', timestamp: new Date().toISOString() }
      ],
      favorite: false
    },
    {
      id: '5',
      name: 'Charlie Green',
      messages: [
        { id: 'm1', text: 'Need help with the task.', sender: 'user', timestamp: new Date().toISOString() },
        { id: 'm2', text: 'I’ll assist you.', sender: 'me', timestamp: new Date().toISOString() }
      ],
      favorite: false
    }
  ],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage(state, action: PayloadAction<{ chatId: string; message: Message }>) {
      const chat = state.chats.find(c => c.id === action.payload.chatId);
      if (chat) {
        chat.messages.push(action.payload.message);
        saveChatsToStorage(state.chats); // ✅ persist message
      }
    },
    toggleFavorite(state, action: PayloadAction<string>) {
      const chat = state.chats.find(c => c.id === action.payload);
      if (chat) {
        chat.favorite = !chat.favorite;
        saveChatsToStorage(state.chats); // ✅ persist favorites
      }
    },
    setChats(state, action: PayloadAction<Chat[]>) {
      state.chats = action.payload;
    },
  },
});

export const { sendMessage, toggleFavorite, setChats } = chatSlice.actions;
export default chatSlice.reducer;
