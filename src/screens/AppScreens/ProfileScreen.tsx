import React from 'react'
import { Text, View, StyleSheet, Image,TouchableOpacity, Dimensions,ScrollView, SafeAreaView } from 'react-native'
import { useTheme, Theme } from '../../context/ThemeContext';


export default function ProfileScreen({navigation} : any) {

  const { theme } = useTheme();

  const themeStyles = StyleSheet.create({
    container: {
      backgroundColor: theme === Theme.Dark ? '#3D1557' : 'white',
    },
    profileName: {
      color: theme === Theme.Dark ? 'white' : 'black',
      fontSize: 30,
      textAlign: 'center',
    },
    PoststitleText: {
      textAlign: 'center',
      color: theme === Theme.Dark ? 'white' : 'black',
      fontSize: 20,
      margin: 10,
      borderBottomWidth: 1,
      borderColor: 'purple'
    },
  })
  


  return (
    <SafeAreaView style={themeStyles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'> 
        <View style={styles.imageView}>
          <Image
            source={require('../../assets/UserPhoto.jpg')}
            style={styles.userImage}
          />
        </View>

        <Text style={themeStyles.profileName}>Philip Rolodex</Text>

        <View style={styles.buttonsView}>
          <View style={styles.button}>
            <TouchableOpacity style={{padding: 10,}}>
              <Text style={styles.buttonText}>Create a post</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity style={{padding: 10,}}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.textDesc}>
          🎉 Philip Rolodex | Event Architect 🌟
          🌙 Nightlife Visionary & Entrepreneur
          🚀 Founder @TheNightSkyLounge | @EventureVibes
          📍NYC | Spinning magic into every event
          📩 DM for collaborations & bookings
        </Text>
        
        <View style={styles.numbersView}>
          <View>
            <Text style={styles.textBold}>123</Text>
            <Text style={styles.textNumber}>Posts</Text>
          </View>
          <View>
            <Text style={styles.textBold}>298</Text>
            <Text style={styles.textNumber}>Followers</Text>
          </View>
          <View>
            <Text style={styles.textBold}>794</Text>
            <Text style={styles.textNumber}>Following</Text>
          </View>
        </View>
        <Text style={themeStyles.PoststitleText}>Posts</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({

  imageView: {
    alignItems: 'center',
  },
  userImage: {
    width: screenWidth,
    height: screenHeight / 2,
    borderRadius: 20
  },

  buttonsView: {
    flexDirection: 'row',
    minHeight: 70,
    justifyContent: 'center',
  },
  button: {
    margin: 10,
    flex: 0.5,
    backgroundColor: '#5B2C6F',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
  },
  textBold: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center'
  },
  textDesc: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#5B2C6F'
  },
  numbersView: {
    flexDirection: 'row',
    minHeight: 70,
    marginTop: 20,
    justifyContent: 'space-around',
    backgroundColor: '#5B2C6F'
  },
  textNumber: {
    fontSize: 15,
    color: 'white'
  },
  
})