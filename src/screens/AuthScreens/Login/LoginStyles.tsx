import {StyleSheet, Dimensions} from 'react-native';

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
    backgroundColor: 'white',
  },
  SigninText: {
    color: 'black',
    fontSize: 35,
    marginTop: 40,
    fontWeight: 'bold',
  },
  signupText: {
    color: 'black',
    fontSize: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 15,
    marginHorizontal: 50,
  },
});

export default styles;
