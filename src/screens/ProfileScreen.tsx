import React, { useEffect, useState } from 'react';
import {
  FlatList,
  View,
  Text,
  Switch,
  StyleSheet,
  ToastAndroid,
  Platform,
} from 'react-native';
import {
  useTheme,
  MD3DarkTheme,
  MD3LightTheme,
  Snackbar,
} from 'react-native-paper';
import { MMKV } from 'react-native-mmkv';

const mmkv = new MMKV();

export default function ProfileScreen({ theme, setTheme }: any) {
  const currentTheme = useTheme();

  const [isDarkMode, setIsDarkMode] = useState(theme.dark);
  const [pushEnabled, setPushEnabled] = useState(mmkv.getBoolean('push') ?? true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    setIsDarkMode(theme.dark);
  }, [theme]);

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    mmkv.set('theme', newTheme);
    setTheme(newTheme === 'dark' ? MD3DarkTheme : MD3LightTheme);
  };

  const togglePush = () => {
    const newState = !pushEnabled;
    setPushEnabled(newState);
    mmkv.set('push', newState);

    if (newState) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('🔔 Push Notifications Enabled', ToastAndroid.SHORT);
      } else {
        setSnackbarVisible(true);
      }
    }
  };

  const settings = [
    {
      id: '1',
      label: 'Dark Mode',
      value: isDarkMode,
      onToggle: toggleDarkMode,
    },
    {
      id: '2',
      label: 'Push Notifications',
      value: pushEnabled,
      onToggle: togglePush,
    },
  ];

  const renderItem = ({ item }: any) => (
    <View style={[styles.row, { borderBottomColor: currentTheme.colors.outline }]}>
      <Text style={[styles.label, { color: currentTheme.colors.onBackground }]}>{item.label}</Text>
      <Switch value={item.value} onValueChange={item.onToggle} />
    </View>
  );

  return (
    <>
      <FlatList
        contentContainerStyle={{
          padding: 16,
          backgroundColor: currentTheme.colors.background,
        }}
        data={settings}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      {Platform.OS !== 'android' && (
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          style={{ backgroundColor: currentTheme.colors.primary }}
        >
          🔔 Push Notifications Enabled
        </Snackbar>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 0.7,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
  },
});
