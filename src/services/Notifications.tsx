import notifee from '@notifee/react-native'

export default async function onDisplayNotification() {

    await notifee.requestPermission()

    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    })

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

}