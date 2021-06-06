import React from 'react';
import { ViewProps, View, StyleSheet, Text } from 'react-native';
import { IDMSCoordinate } from 'src/interfaces';

export type DisplayDMSProps = ViewProps & {
  coordinate: IDMSCoordinate;
};

export const DisplayDMS: React.FC<DisplayDMSProps> = ({
  coordinate,
  style,
  ...props
}) => {
  return (
    <View {...props} style={[styles.root, style]}>
      <Text style={styles.text}>
        {coordinate.degrees}°{coordinate.minutes}'{coordinate.seconds}"{' '}
        {coordinate.direction}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  text: {
    fontSize: 24,
  },
});
