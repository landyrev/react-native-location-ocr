import React, { useCallback, useEffect, useState } from 'react';
import { LayoutRectangle, ViewProps } from 'react-native';
import {
  RNCamera,
  RNCameraProps,
  TrackedTextFeature,
} from 'react-native-camera';
import { Coordinate } from './coordinate';
import { useResultConfirm } from './hooks/use-result-confirm';
import { TargetView } from './target';
import { recognizeCoordinates } from './utils/coordinates-recognize';

export type OCRViewPropsType = RNCameraProps &
  ViewProps & {
    /**
     * Callback when coordinate detected
     */
    onDetect: (coordinate: Coordinate) => void;
    /**
     * Show target line on preview screen
     */
    showTarget?: boolean;
    /**
     * Target line color
     */
    targetColor?: string;
  };

export const LocationOCRView: React.FC<OCRViewPropsType> = ({
  rectOfInterest = {
    x: 0.1,
    y: 0.45,
    height: 0.1,
    width: 0.8,
  },
  style,
  showTarget = true,
  targetColor,
  onDetect,
  ...props
}) => {
  const [layout, setLayout] = useState<LayoutRectangle | undefined>();
  const [detectedCoordinate, setDetectedCoordinate] =
    useResultConfirm<Coordinate>();

  useEffect(() => {
    if (detectedCoordinate) {
      onDetect(detectedCoordinate);
    }
  }, [detectedCoordinate, onDetect]);

  const onRecognized = useCallback(
    (features: TrackedTextFeature[]) => {
      const coordinate = recognizeCoordinates(features, layout);
      if (coordinate) {
        setDetectedCoordinate(coordinate);
      }
    },
    [layout, setDetectedCoordinate]
  );
  return (
    <RNCamera
      {...props}
      style={[style]}
      onLayout={({ nativeEvent }) => setLayout(nativeEvent.layout)}
      onTextRecognized={(r) => onRecognized(r.textBlocks)}
      rectOfInterest={rectOfInterest}
      captureAudio={false}
    >
      {showTarget && (
        <TargetView color={targetColor} rectOfInterest={rectOfInterest} />
      )}
    </RNCamera>
  );
};
