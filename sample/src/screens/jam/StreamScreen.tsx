import React, { useCallback } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';

import { createStyleSheet } from '@sendbird/uikit-react-native-foundation';

import { useSendbirdChat } from '../../../../packages/uikit-react-native/src';
import { getDefaultGroupChannelCreateParams } from '../../../../packages/uikit-utils/src';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import { Routes } from '../../libs/navigation';

const StreamScreen = () => {
  const { sdk, currentUser } = useSendbirdChat();
  const { navigation } = useAppNavigation<Routes.Stream>();

  const onPressMessage = useCallback(async (toUserId: string) => {
    const currentUserId = currentUser?.userId;
    if (!currentUserId) {
      console.log('No current user ID found');
      return;
    }

    const params = getDefaultGroupChannelCreateParams({
      invitedUserIds: [toUserId],
      currentUserId: currentUserId,
    });
    params.isDistinct = true;

    const channel = await sdk.groupChannel.createChannel(params);
    navigation.replace(Routes.GroupChannel, { channelUrl: channel.url });
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.name}>Stream demo</Text>
        <View style={styles.streamRow}>
          <Text style={styles.streamName}>Chris's Jam</Text>
          <Pressable style={styles.button} onPress={() => onPressMessage('Chris')}>
            <Text style={styles.buttonText}>Message host</Text>
          </Pressable>
        </View>
        <View style={styles.streamRow}>
          <Text style={styles.streamName}>Leira's Jam</Text>
          <Pressable style={styles.button} onPress={() => onPressMessage('Leira')}>
            <Text style={styles.buttonText}>Message host</Text>
          </Pressable>
        </View>
        <View style={styles.streamRow}>
          <Text style={styles.streamName}>Kyles's Jam</Text>
          <Pressable style={styles.button} onPress={() => onPressMessage('Kyle')}>
            <Text style={styles.buttonText}>Message host</Text>
          </Pressable>
        </View>
        <View style={styles.streamRow}>
          <Text style={styles.streamName}>Pete's Jam</Text>
          <Pressable style={styles.button} onPress={() => onPressMessage('Pete')}>
            <Text style={styles.buttonText}>Message host</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = createStyleSheet({
  container: {
    alignItems: 'center',
    width: '100%',
    marginVertical: 16,
    height: '100%',
  },
  button: {
    backgroundColor: '#6900bc',
    padding: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 50,
  },
  streamName: {
    fontWeight: '600',
    fontSize: 16,
  },
  streamRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 50,
    marginBottom: 12,
  },
});

export default StreamScreen;
