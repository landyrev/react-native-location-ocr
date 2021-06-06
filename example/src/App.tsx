import * as React from 'react';
import { StyleSheet } from 'react-native';
import { DisplayCoordinates } from './components/DisplayCoordinates';

import { OCRView } from 'react-native-ocr';
import { Coordinate } from 'src/coordinate';

export default function App() {
  const [coordinate, setCoordinate] = React.useState<Coordinate | null>(null);
  return (
    <>
      {coordinate ? (
        <DisplayCoordinates
          onPress={() => setCoordinate(null)}
          coordinates={coordinate}
        />
      ) : (
        <OCRView
          style={styles.root}
          onDetect={(c) => {
            if (c) {
              setCoordinate(c);
            }
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
  },
});
