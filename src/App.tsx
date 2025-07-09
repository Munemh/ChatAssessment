import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import Navigation from './navigation/Navigation';
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { MMKV } from 'react-native-mmkv';

const mmkv = new MMKV();

export default function App() {
  const scheme = useColorScheme();
  const [theme, setTheme] = useState(scheme === 'dark' ? MD3DarkTheme : MD3LightTheme);

  useEffect(() => {
    const storedTheme = mmkv.getString('theme');
    if (storedTheme === 'dark') setTheme(MD3DarkTheme);
    else if (storedTheme === 'light') setTheme(MD3LightTheme);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <Navigation theme={theme} setTheme={setTheme} />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
