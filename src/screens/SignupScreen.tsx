import React, { useState } from 'react';
import { StyleSheet, Image, Text, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import FloatingLabelInput from '../components/FloatingLableIInput';
import GenderPicker from '../components/GenderPicker';
import CountryPickerr from '../components/CountryPicker/CountryPicker';

export default function LoginScreen({navigation} : any) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedGender, setSelectedGender] = useState<string | undefined>(undefined);

  const handleCreateAccount = () => {
    navigation.navigate('Login');
  }

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={require('../assets/LoginHeaderImage.png')}
        style={styles.backgroundImage}
      />

      <View style={styles.BoxContainer}>

        <Text style={styles.SigninText}>Sign Up Now</Text>

        <FloatingLabelInput 
          label="Username"
          value={username}
          onChangeText={setUsername}
          secureTextEntry={false} 
        />
        <FloatingLabelInput 
          label="Email"
          value={email}
          onChangeText={setEmail}
          secureTextEntry={false} 
        />
        <FloatingLabelInput 
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <GenderPicker/>
        <CountryPickerr/>

        <TouchableOpacity style={styles.buttonContainer} onPress={handleCreateAccount}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>


      </View>
    </ScrollView>
  );
};

const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6420AA',
  },
  backgroundImage: {
    width: DeviceWidth,
    height: DeviceHeight / 3,
  },
  BoxContainer: {
    flex: 1,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  SigninText: {
    color:'black',
    fontSize: 35,
    marginTop: 40,
    fontWeight: 'bold',
  },

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
  }

});

