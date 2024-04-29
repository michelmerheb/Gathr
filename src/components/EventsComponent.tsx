import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, Dimensions} from 'react-native';
import { useTheme, Theme } from '../context/ThemeContext';

export interface EventsProps {
    id: string;
    title: string;
    description: string;
    image: string;
}


export default function EventsContainer({id, title, description, image} : EventsProps) {
    const {theme} =useTheme();

    const themeStyles = StyleSheet.create({
        container: {
            flex: 1,
            width: DeviceWidth / 1.1,
            margin: 15,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
    })
    
    return(
        <TouchableOpacity style={themeStyles.container}>
            <View style={styles.eventInfo}>
                {image ? (
                    <Image style={styles.eventImage} source={{uri: image}} />
                ) : (
                    <Text>No Image To Show</Text>
                )}
                <View style={styles.eventDetails}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>

                </View>
            </View>

        </TouchableOpacity>

    )
}

const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    eventInfo:{
        margin: 10,
        alignItems: 'center'
    },
    eventImage: {
        width: DeviceWidth / 1.2,
        height: DeviceHeight / 3,
        resizeMode: 'contain'
    },
    eventDetails: {
        marginTop: 10
    },
    title: {
        color: 'white',
        fontSize: 25,
    },
    description: {
        color: 'grey',
        fontSize: 15,
    }
})
