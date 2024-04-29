import { StyleSheet, Dimensions } from "react-native";

const DeviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    pickerContainer: {
      marginVertical: 10,
      width: DeviceWidth / 3,
      borderWidth: 1,
      borderColor: 'purple',
      backgroundColor: 'white',
      borderRadius: 10,
    },
    picker: {
      height: 50,
      width: '100%',
      color: 'purple',
    },
    pagination: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
      justifyContent: 'space-evenly'
    },
    button: {
      backgroundColor: "white",
      padding: 10,
      borderRadius: 10
    },
    buttonText: {
      color: 'purple'
    },
    pageNumber: {
      color: 'white'
    },
    error: {
      color: 'white',
      fontSize: 25,
      textAlign: 'center'
    },
  });

  export default styles;