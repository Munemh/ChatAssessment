import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../types';
import { useTheme, Snackbar } from 'react-native-paper';
import ChatItem from '../components/ChatItem';
import { MMKV } from 'react-native-mmkv';

const mmkv = new MMKV();
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ChatDetail'>;

export default function ChatsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const chats = useSelector((state: RootState) => state.chat.chats);
  const theme = useTheme();

  const [showPush, setShowPush] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const pushEnabled = mmkv.getBoolean('push');
      if (pushEnabled) {
        setShowPush(true);
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatItem
            chat={item}
            onPress={() => navigation.navigate('ChatDetail', { chatId: item.id })}
          />
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: theme.colors.onBackground }]}>
            No conversations
          </Text>
        }
      />

      <Snackbar
        visible={showPush}
        onDismiss={() => setShowPush(false)}
        duration={3000}
        style={{ backgroundColor: theme.colors.primary }}
      >
        📩 New message from Jane!
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});
