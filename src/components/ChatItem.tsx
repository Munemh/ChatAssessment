import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { toggleFavorite } from '../redux/chatSlice';
import { useTheme } from 'react-native-paper';
import { heightPercentageToDP } from 'react-native-responsive-screen';

interface ChatItemProps {
  chat: {
    id: string;
    name: string;
    favorite: boolean;
  };
  onPress: () => void;
}

export default function ChatItem({ chat, onPress }: ChatItemProps) {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[styles.chatItem, { borderColor: theme.colors.outline }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.chatTitle, { color: theme.colors.onBackground }]}>{chat.name}</Text>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => dispatch(toggleFavorite(chat.id))}
      >
        <Text style={styles.icon}>{chat.favorite ? '💛' : '🤍'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chatItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex:1
  },
  chatTitle: {
    fontSize: 16,
  },
  iconContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  icon: {
    fontSize: 18,
    width: heightPercentageToDP(5),
    padding:2

  },
});
