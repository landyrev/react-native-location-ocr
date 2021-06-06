import { LayoutRectangle } from 'react-native';
import { Point, Size, TrackedTextFeature } from 'react-native-camera';
import { Coordinate } from 'src/coordinate';
import { parseDmsCoordinates } from './parse-dms-coordinates';

const distanceFromCenter = (
  { size, origin }: { size: Size; origin: Point },
  layout?: LayoutRectangle
): number => {
  if (!layout) {
    return 0;
  }
  const x = (origin.x + size.width / 2) / layout.width;
  const y = (origin.y + size.height / 2) / layout.height;
  return Math.sqrt(x * x + y * y);
};

export const recognizeCoordinates = (
  features: TrackedTextFeature[],
  layout?: LayoutRectangle
): Coordinate | null => {
  const foundCoordinates: Array<{
    coordinates: Coordinate;
    distance: number;
  }> = [];
  for (const feature of features) {
    for (const component of feature.components) {
      const coordinates = parseDmsCoordinates(component.value);
      if (coordinates) {
        foundCoordinates.push({
          coordinates,
          distance: distanceFromCenter(component.bounds, layout),
        });
      }
    }
  }

  const coordinate = foundCoordinates.sort(
    (c1, c2) => c1.distance - c2.distance
  )[0]?.coordinates;
  if (coordinate) {
    return coordinate;
  }
  return null;
};
