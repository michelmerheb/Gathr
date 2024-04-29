import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, FlatList, RefreshControl } from "react-native";
import EventsContainer from "../../components/EventsComponent";
import { useTheme, Theme } from "../../context/ThemeContext";

export default function HomeScreen() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    fetchData(false);
  }, []);

  const fetchData = async (isRefresh : boolean) => {
    if (!isRefresh) {
      setIsLoading(true);
    } else {
      setIsRefreshing(true);
    }
    try {
      const response = await fetch('https://662e5af9a7dda1fa378cbe15.mockapi.io/Gathr/events');
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
  };

  const onRefresh = () => {
    fetchData(true);
  };

  const Themestyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === Theme.Dark ? '#3D1557' : '#5B2C6F',
    }
  });

  return (
    <View style={Themestyles.container}>
      {(isLoading && !isRefreshing) ? (
        <ActivityIndicator size="large" color="purple" />
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item : any) => item.id.toString()}
          renderItem={({ item }) => (
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


const styles = StyleSheet.create({

})
