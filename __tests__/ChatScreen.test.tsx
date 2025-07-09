import React from 'react';
import { render } from '@testing-library/react-native';
import ChatsScreen from '../src/screens/ChatScreen';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../src/redux/chatSlice';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';

const renderWithProviders = () => {
  const store = configureStore({
    reducer: { chat: chatReducer },
    preloadedState: {
      chat: {
        chats: [
          {
            id: '1',
            name: 'John Doe',
            messages: [],
            favorite: false,
          },
        ],
      },
    },
  });

  return render(
    <Provider store={store}>
      <PaperProvider theme={MD3LightTheme}>
        <NavigationContainer>
          <ChatsScreen />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

describe('ChatsScreen', () => {
  it('renders chat list correctly', () => {
    const { getByText } = renderWithProviders();
    expect(getByText('John Doe')).toBeTruthy();
  });
});
