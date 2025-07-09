import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  TextInput,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { sendMessage } from '../redux/chatSlice';
import ChatBubble from '../components/ChatBubble';
import { useTheme } from 'react-native-paper';

export default function ChatDetailScreen({ route }: any) {
  const { chatId } = route.params;
  const dispatch = useDispatch();
  const flatListRef = useRef<FlatList>(null);
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const chat = useSelector((state: RootState) =>
    state.chat.chats.find((c) => c.id === chatId)
  );
  const theme = useTheme();

  const handleSend = () => {
    if (!text.trim()) return;

    dispatch(
      sendMessage({
        chatId,
        message: {
          id: Date.now().toString(),
          text,
          sender: 'me',
          timestamp: new Date().toISOString(),
        },
      })
    );
    setText('');
    scrollToEnd();
  };

  const scrollToEnd = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  // Simulate typing and fake user reply
  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setIsTyping(true);
    }, 2000);

    const replyTimeout = setTimeout(() => {
      setIsTyping(false);
      dispatch(
        sendMessage({
          chatId,
          message: {
            id: (Date.now() + 1).toString(), // ensure different ID
            text: 'Just checking in 👋',
            sender: 'user',
            timestamp: new Date().toISOString(),
          },
        })
      );
      scrollToEnd();
    }, 5000);

    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(replyTimeout);
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        ref={flatListRef}
        data={chat?.messages || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatBubble message={item.text} isSender={item.sender === 'me'} />
        )}
        ListFooterComponent={
          isTyping ? (
            <Text style={[styles.typing, { color: theme.colors.primary }]}>Typing...</Text>
          ) : null
        }
        contentContainerStyle={styles.messages}
      />

      <View style={[styles.inputRow, { borderTopColor: theme.colors.outline }]}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.surface,
              color: theme.colors.onSurface,
              borderColor: theme.colors.outline,
            },
          ]}
          placeholder="Type a message"
          placeholderTextColor={theme.colors.onSurface + '88'}
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity
          onPress={handleSend}
          style={[styles.sendButton, { backgroundColor: theme.colors.primary }]}
        >
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messages: {
    padding: 16,
    paddingBottom: 32,
  },
  inputRow: {
    flexDirection: 'row',
    padding: 8,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 20,
  },
  sendText: {
    color: '#fff',
    fontWeight: '600',
  },
  typing: {
    fontStyle: 'italic',
    marginTop: 4,
    marginBottom: 12,
    marginLeft: 8,
  },
});
