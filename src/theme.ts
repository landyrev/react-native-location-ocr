import { StyleSheet, Platform } from 'react-native';

export const theme: StyleSheet.NamedStyles<any> = {
  shadowMedium:
    Platform.OS === 'ios'
      ? {
          shadowColor: 'black',
          shadowOpacity: 0.25,
          shadowRadius: 1,
          shadowOffset: {
            height: 0,
            width: 0,
          },
        }
      : {
          elevation: 1,
        },
};
