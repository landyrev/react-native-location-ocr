# react-native-location-ocr

React Native Scanner for Geo Coordinates

## Installation

### Install Package

```sh
npm install react-native-location-ocr
```

### Initialize Firebase App

[See instructions]()

### iOS steps

### Android steps

## Usage

```typescript
import { LocationOCRView } from 'react-native-location-ocr';

const App = () => {
  return (
    <LocationOCRView
      style={styles.root}
      onDetect={(coordinates) => {
        console.log('Coordinates');
      }}
    />
  );
};
```

[See example folder](/example).

## License

MIT
