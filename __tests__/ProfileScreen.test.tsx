import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProfileScreen from '../src/screens/ProfileScreen';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';

describe('ProfileScreen', () => {
  const setThemeMock = jest.fn();

  it('toggles dark mode and sets theme', () => {
    const { getByRole } = render(
      <PaperProvider theme={MD3LightTheme}>
        <ProfileScreen theme={MD3LightTheme} setTheme={setThemeMock} />
      </PaperProvider>
    );

    const toggle = getByRole('switch');
    fireEvent(toggle, 'valueChange');
    expect(setThemeMock).toHaveBeenCalled();
  });
});
