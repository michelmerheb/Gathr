import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text,Dimensions } from 'react-native';
import DatePicker from 'react-native-date-picker';

export default function DatePickerr() {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.pickerContainer} onPress={() => setOpen(true)}>
        <Text style={styles.buttonText}>Date of Birth</Text>
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={date}
        mode='date'
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
}

const DeviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        backgroundColor: 'purple',
        marginTop: 20,
        overflow: 'hidden',
    },
    pickerContainer: {
        height: 50,
        color: 'white',
        width: DeviceWidth * 0.8,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        margin: 10,
    }
});
