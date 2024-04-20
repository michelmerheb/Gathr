import React, { useState } from 'react'
import { View, Text, StyleSheet, PixelRatio, Switch, Dimensions, TouchableOpacity } from 'react-native'
import CountryPicker from 'react-native-country-picker-modal'
import { CountryCode, Country } from './types'


export default function CountryPickerr() {
  const [countryCode, setCountryCode] = useState<CountryCode>('LB')
  const [country, setCountry] = useState<Country | null>(null)
  const [open, setOpen] = useState(false);


  const onSelect = (country: Country) => {
    setCountryCode(country.cca2)
    setCountry(country)
  }

  return (
    <View style={styles.container}>
    
      <CountryPicker
        {...{
          countryCode,
          withFilter: true,
          withFlag: false,
          withCountryNameButton: true,
          withCallingCode: false,
          withEmoji: false,
          onSelect,
        }}
        visible={open}
        onClose={() => setOpen(false)}
      />

    </View>
  )
}

const DeviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    height: 50,
    marginTop: 20,
    padding: 10,
    backgroundColor: 'purple',
    width: DeviceWidth * 0.8,
    borderRadius: 10,
  }

})