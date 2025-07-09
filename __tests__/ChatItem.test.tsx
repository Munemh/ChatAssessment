import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import ChatItem from '../src/components/ChatItem';

const mockStore = configureStore([]);

describe('ChatItem', () => {
  const chat = {
    id: '1',
    name: 'John Doe',
    favorite: false,
  };

  const onPressMock = jest.fn();

  const renderWithProviders = (store: any) =>
    render(
      <Provider store={store}>
        <PaperProvider theme={MD3LightTheme}>
          <ChatItem chat={chat} onPress={onPressMock} />
        </PaperProvider>
      </Provider>
    );

  it('renders chat name correctly', () => {
    const store = mockStore({});
    const { getByText } = renderWithProviders(store);

    expect(getByText('John Doe')).toBeTruthy();
  });

  it('calls onPress when chat is tapped', () => {
    const store = mockStore({});
    const { getByText } = renderWithProviders(store);

    fireEvent.press(getByText('John Doe'));
    expect(onPressMock).toHaveBeenCalled();
  });

  it('dispatches toggleFavorite when heart is tapped', () => {
    const store = mockStore({});
    store.dispatch = jest.fn();

    const { getByText } = renderWithProviders(store);

    fireEvent.press(getByText('🤍'));
    expect(store.dispatch).toHaveBeenCalledWith({
      payload: '1',
      type: 'chat/toggleFavorite',
    });
  });
});
