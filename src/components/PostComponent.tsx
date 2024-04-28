import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import { useTheme, Theme } from '../context/ThemeContext';

export interface PostProps {
    _id?: string;
    image_url?: string | null;
    title: string;
    description: string;
  }

export default function PostContainer({title, description, image_url} : PostProps) {
    const { theme } = useTheme();

    const themeStyles = StyleSheet.create({
        postContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            marginVertical: 10,
            backgroundColor: theme === Theme.Dark ? 'darkgrey' : 'white',
            borderRadius: 10,
        },
        description: {
            fontSize: 18,
            color: theme === Theme.Dark ? 'white' : 'grey',
        },
    })
    
    return (
    <View style={themeStyles.postContainer}>
      {image_url && (
        <Image source={{uri: image_url}} style={styles.postImage} />
      )}
      <View style={styles.postinfo}>
        <Text style={styles.title}>{title}</Text>
        <Text style={themeStyles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postImage: {
    width: 150,
    height: 150,
    marginRight: 10,
  },
  postinfo: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    paddingBottom: 5,
    fontSize: 25,
    color: '#5B2C6F',
    fontWeight: 'bold',
  },

});
