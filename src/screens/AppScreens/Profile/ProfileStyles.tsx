import { StyleSheet, Dimensions } from "react-native";

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

export default styles;