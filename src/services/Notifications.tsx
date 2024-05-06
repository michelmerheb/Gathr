import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function onDisplayNotification() {
  const hasShownNotification = await AsyncStorage.getItem(
    'hasShownNotification',
  );

  if (hasShownNotification !== 'true') {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.displayNotification({
      title: 'Welcome to Gathr',
      body: "Can't seem to find an event near you? Gathr will help you find the nearest events... Start looking now!",
      android: {
        channelId,
        smallIcon: 'screen',
        pressAction: {
          id: 'default',
        },
      },
    });
    await AsyncStorage.setItem('hasShownNotification', 'true');
  }
}
