import {StyleSheet, Dimensions} from 'react-native';

const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  imageView: {
    alignItems: 'center',
  },
  userImage: {
    width: DeviceWidth,
    height: DeviceHeight / 2,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: DeviceWidth * 0.3,
    marginVertical: 10,
    backgroundColor: '#5B2C6F',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
  },
  textBold: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
  },
  numbersView: {
    flexDirection: 'row',
    minHeight: 70,
    marginTop: 20,
    justifyContent: 'space-around',
    backgroundColor: '#5B2C6F',
  },
  textNumber: {
    fontSize: 15,
    color: 'white',
  },
});

export default styles;
