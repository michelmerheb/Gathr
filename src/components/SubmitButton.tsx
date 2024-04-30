import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface buttonprops {
  title: string;
  destination?: () => void;
}
export default function SubmitButton({title, destination}: buttonprops) {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={destination}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 30,
    backgroundColor: 'purple',
    paddingVertical: 20,
    paddingHorizontal: 35,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
