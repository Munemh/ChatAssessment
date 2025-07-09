import React from 'react';
import { render } from '@testing-library/react-native';
import ChatBubble from '../src/components/ChatBubble';

describe('ChatBubble', () => {
  it('renders sender bubble correctly', () => {
    const { getByText } = render(<ChatBubble message="Hello" isSender={true} />);
    expect(getByText('Hello')).toBeTruthy();
  });

  it('renders receiver bubble correctly', () => {
    const { getByText } = render(<ChatBubble message="Hi" isSender={false} />);
    expect(getByText('Hi')).toBeTruthy();
  });
});
