import React, { useCallback, useMemo, useState } from 'react';
import { ViewProps, View, StyleSheet, LayoutRectangle } from 'react-native';
import { RectOfInterest } from 'react-native-camera';

export type TargetProps = ViewProps & {
  rectOfInterest: RectOfInterest;
  progressBarColor?: string;
  color?: string;
  progressBarPosition?: number;
};

export const TargetView: React.FC<TargetProps> = ({
  rectOfInterest,
  style,
  progressBarColor = 'blue',
  progressBarPosition,
  color = 'white',
  ...props
}) => {
  const [screenLayout, setScreenLayout] = useState<LayoutRectangle | null>(
    null
  );

  const onLayout = useCallback((layout: LayoutRectangle) => {
    setScreenLayout(layout);
  }, []);

  const targetSize = useMemo(() => {
    if (screenLayout) {
      return {
        width: screenLayout.width * rectOfInterest.width,
        height: screenLayout.height * rectOfInterest.height,
      };
    }
    return {
      width: 0,
      height: 0,
    };
  }, [screenLayout, rectOfInterest]);

  return (
    <View
      onLayout={({ nativeEvent: { layout } }) => onLayout(layout)}
      style={[styles.root, style]}
      {...props}
    >
      <View
        style={[
          styles.target,
          {
            width: targetSize.width,
            height: targetSize.height,
          },
        ]}
      >
        <View
          style={[
            styles.targetSubline,
            {
              backgroundColor: color,
            },
          ]}
        >
          <View
            style={[
              styles.progressBar,
              {
                width: progressBarPosition ? `${progressBarPosition}%` : `0%`,
                backgroundColor: progressBarColor,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  target: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  targetSubline: {
    width: '100%',
    height: 1,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 1,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  progressBar: {
    height: '100%',
  },
});
