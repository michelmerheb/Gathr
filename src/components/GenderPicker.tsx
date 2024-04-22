import React, {useState, useRef} from "react"
import { View, StyleSheet, Dimensions } from "react-native";
import {Picker} from '@react-native-picker/picker';

export default function GenderPicker() {
    const [selectedGender, setSelectedGender] = useState<string | undefined>(undefined);

    const pickerRef = useRef<Picker<string>>(null);

    return(
    <View style={styles.container}>
        <Picker
            style={styles.pickerContainer}
            ref={pickerRef}
            selectedValue={selectedGender}
            onValueChange={(itemValue, itemIndex) => itemValue !== 'default' && setSelectedGender(itemValue) }>
            <Picker.Item label="Gender" value="default" />
            <Picker.Item label="Male" value="M" />
            <Picker.Item label="Female" value="F" />
        </Picker>
    </View>
    )
}

const DeviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        backgroundColor: 'purple',
        marginTop: 20,
    },
    pickerContainer: {
        height: 50,
        color: 'white',
        width: DeviceWidth * 0.8,
    }
})
