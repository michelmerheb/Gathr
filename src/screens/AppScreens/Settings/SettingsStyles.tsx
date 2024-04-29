import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    setting: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
    },
    settingsNames: {
      flex: 0.8
    },
    settingTitle: {
      color: '#fff',
      fontSize: 20,
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 1,
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
    },
    settingSubTitle: {
      color: 'gray',
      fontSize: 12
    },
    deleteButton: {
      backgroundColor: '#9B111E',
      padding: 20,
      margin: 20,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    deleteButtonText: {
      color: '#fff',
      fontSize: 16,
    },
  });
  
export default styles;  