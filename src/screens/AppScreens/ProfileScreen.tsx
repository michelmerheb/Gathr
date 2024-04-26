import React from 'react'
import { Text, View, StyleSheet, Image,TouchableOpacity, Dimensions,ScrollView, SafeAreaView } from 'react-native'

export default function ProfileScreen({navigation} : any) {



    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'> 
          <View style={styles.imageView}>
            <Image
              source={require('../../assets/UserPhoto.jpg')}
              style={styles.userImage}
            />
          </View>

          <Text style={styles.textBold}>Philip Rolodex</Text>

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

          <Text style={styles.textDesc}>Philip Rolodex is a software engineer and photographer. Currently doing Bachelor of science in software engineering from national university of modern languages, Pakistan.</Text>
          
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
          <Text style={styles.PoststitleText}>Posts</Text>
        </ScrollView>
      </SafeAreaView>
    )
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
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
    backgroundColor: 'purple',
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
    borderTopColor: 'skyblue'
  },
  numbersView: {
    flexDirection: 'row',
    minHeight: 70,
    marginTop: 20,
    justifyContent: 'space-around',
    backgroundColor: 'purple'
  },
  textNumber: {
    fontSize: 15,
    color: 'white'
  },

  PoststitleText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    margin: 10,
    borderBottomWidth: 1,
    borderColor: 'purple'
  },
  
})