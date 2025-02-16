import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';
import Config from 'react-native-config';
import EventsContainer from '../../../components/EventsComponent';
import {useTheme, Theme} from '../../../context/ThemeContext';

const apiEventURL = Config.REACT_APP_API_EVENTS_URL;

export default function HomeScreen() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {theme} = useTheme();

  const fetchData = useCallback(
    async (isRefresh: boolean) => {
      if (!isRefresh) {
        setIsLoading(true);
      } else {
        setIsRefreshing(true);
      }

      try {
        const response = await fetch(`${apiEventURL}`);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }

      if (!isRefresh) {
        setIsLoading(false);
      } else {
        setIsRefreshing(false);
      }
    },
    [apiEventURL],
  );

  useEffect(() => {
    fetchData(false);
  }, [fetchData]);

  const onRefresh = useCallback(() => {
    fetchData(true);
  }, [fetchData]);

  const Themestyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === Theme.Dark ? '#3D1557' : '#5B2C6F',
    },
  });

  return (
    <View style={Themestyles.container}>
      {isLoading && !isRefreshing ? (
        <ActivityIndicator size="large" color="purple" />
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({item}) => (
            <EventsContainer
              id={item.id}
              title={item.title}
              description={item.description}
              image={item.image}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor="purple"
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
