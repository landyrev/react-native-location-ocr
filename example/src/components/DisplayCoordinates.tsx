import React, { useMemo } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { Coordinate } from 'src/coordinate';
import { DisplayDMS } from './DisplayDMS';

export type DisplayCoordinatesProps = {
  coordinates: Coordinate;
  onPress: () => void;
};

export const DisplayCoordinates: React.FC<DisplayCoordinatesProps> = ({
  coordinates,
  onPress,
}) => {
  const dmsCoordinate = useMemo(() => coordinates.dms, [coordinates]);
  return (
    <View style={styles.root}>
      <DisplayDMS coordinate={dmsCoordinate[0]} />
      <DisplayDMS coordinate={dmsCoordinate[1]} />
      <Text>Latitude: {coordinates.latitude}</Text>
      <Text>Longitude: {coordinates.longitude}</Text>
      <Button onPress={() => onPress()} title="Try Again" />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
