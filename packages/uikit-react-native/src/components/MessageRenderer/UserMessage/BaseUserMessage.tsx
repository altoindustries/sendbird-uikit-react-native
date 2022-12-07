import React from 'react';
import { View } from 'react-native';

import { Text, URLParsedText, createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';

import { useLocalization } from '../../../hooks/useContext';
import type { UserMessageProps } from './index';

const BaseUserMessage = ({ message, variant, pressed, children }: UserMessageProps) => {
  const { colors } = useUIKitTheme();
  const color = colors.ui.message[variant][pressed ? 'pressed' : 'enabled'];
  const { STRINGS } = useLocalization();
  return (
    <View style={[styles.container, { backgroundColor: color.background }]}>
      <View style={styles.wrapper}>
        <URLParsedText body3 strict color={color.textMsg}>
          {message.message}
          {Boolean(message.updatedAt) && (
            <Text body3 color={color.textEdited}>
              {STRINGS.GROUP_CHANNEL.MESSAGE_BUBBLE_EDITED_POSTFIX}
            </Text>
          )}
        </URLParsedText>
      </View>
      {children}
    </View>
  );
};
const styles = createStyleSheet({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  wrapper: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});

export default BaseUserMessage;
