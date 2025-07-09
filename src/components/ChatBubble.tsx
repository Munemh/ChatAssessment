import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  message: string;
  isSender: boolean;
}

export default function ChatBubble({ message, isSender }: Props) {
  return (
    <View style={[styles.bubble, isSender ? styles.right : styles.left]}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth: '70%',
    padding: 10,
    marginVertical: 4,
    borderRadius: 10,
  },
  left: {
    backgroundColor: '#eee',
    alignSelf: 'flex-start',
  },
  right: {
    backgroundColor: '#007aff',
    alignSelf: 'flex-end',
  },
  text: {
    color: '#fff',
  },
});