# react-native-location-ocr

React Native Scanner for Geo Coordinates

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

## Installation

### Install Package

```sh
npm install react-native-location-ocr
```

### iOS installation steps

#### Adding permissions

Add permissions with usage descriptions to your app `Info.plist`:

```xml
<!-- Required with iOS 10 and higher -->
<key>NSCameraUsageDescription</key>
<string>Your message to user when the camera is accessed for the first time</string>
```

#### Modifying Podfile

Add dependency towards `react-native-camera` in your `Podfile` with `subspecs` using one of the following:

```ruby
pod 'react-native-camera', path: '../node_modules/react-native-camera', subspecs: [
  'TextDetector'
]
```

#### Setting up Firebase

Text/Face recognition for iOS uses Firebase MLKit which requires setting up Firebase project for your app.
If you have not already added Firebase to your app, please follow the steps described in [getting started guide](https://firebase.google.com/docs/ios/setup).
In short, you would need to

1. Register your app in Firebase console.
2. Download `GoogleService-Info.plist` and add it to your project
3. Add `pod 'Firebase/Core'` to your podfile
4. In your `AppDelegate.m` file add the following lines:

```objective-c
#import <Firebase.h> // <--- add this
...

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure]; // <--- add this
  ...
}
```

### Android installation steps

#### Adding permissions to your app android/app/src/main/AndroidManifest.xml file:

```xml
<!-- Camera permission access -->
<uses-permission android:name="android.permission.CAMERA" />
```

#### Modifying build.gradle

```gradle
android {
  ...
  defaultConfig {
    ...
    missingDimensionStrategy 'react-native-camera', 'mlkit' // <--- replace general with mlkit
  }
}
```

#### Setting up Firebase

Using Firebase MLKit requires seting up Firebase project for your app. If you have not already added Firebase to your app, please follow the steps described in [getting started guide](https://firebase.google.com/docs/android/setup).
In short, you would need to

1. Register your app in Firebase console.
2. Download google-services.json and place it in `android/app/`
3. Add the folowing to project level `build.gradle`:

```gradle
buildscript {
  dependencies {
  // Add this line
  classpath 'com.google.gms:google-services:4.0.1' // <--- you might want to use different version
  }
}
```

4. Add to the bottom of `android/app/build.gradle` file

```gradle
apply plugin: 'com.google.gms.google-services'
```

5. Configure your app to automatically download the ML model to the device after your app is installed from the Play Store. If you do not enable install-time model downloads, the model will be downloaded the first time you run the on-device detector. Requests you make before the download has completed will produce no results.

```xml
<application ...>
...
  <meta-data
      android:name="com.google.firebase.ml.vision.DEPENDENCIES"
      android:value="ocr, face" /> <!-- choose models that you will use -->
</application>
```

## License

MIT
