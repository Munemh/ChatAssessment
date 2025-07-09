import chatReducer, { sendMessage, toggleFavorite } from '../src/redux/chatSlice';

describe('chatSlice', () => {
  const initialState = {
    chats: [
      {
        id: '1',
        name: 'John',
        messages: [],
        favorite: false,
      },
    ],
  };

  it('adds a message to a chat', () => {
    const action = sendMessage({
      chatId: '1',
      message: { id: 'm1', text: 'Hi', sender: 'me', timestamp: new Date().toISOString() },
    });

    const result = chatReducer(initialState, action);
    expect(result.chats[0].messages.length).toBe(1);
    expect(result.chats[0].messages[0].text).toBe('Hi');
  });

  it('toggles favorite status', () => {
    const action = toggleFavorite('1');
    const result = chatReducer(initialState, action);
    expect(result.chats[0].favorite).toBe(true);
  });
});
