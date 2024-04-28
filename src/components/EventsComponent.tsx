import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
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
            padding: 20,
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

const styles = StyleSheet.create({

    eventInfo:{
        margin: 10,
        alignItems: 'center'
    },
    eventImage: {
        width: 400,
        height: 250,

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
