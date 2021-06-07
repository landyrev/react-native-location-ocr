import { LayoutRectangle } from 'react-native';
import { Point, Size, TrackedTextFeature } from 'react-native-camera';
import { Coordinate } from '../../coordinate';
import modules from './modules';

const distanceFromCenter = (
  { size, origin }: { size: Size; origin: Point },
  layout?: LayoutRectangle
): number => {
  if (!layout) {
    return 0;
  }
  const centerX = layout.width / 2;
  const centerY = layout.height / 2;
  const x = origin.x + size.width / 2;
  const y = origin.y + size.height / 2;
  const distance = Math.sqrt(
    Math.pow(centerX - x, 2) + Math.pow(centerY - y, 2)
  );
  return distance;
};

/**
 * Parse given array of recognized text features to Coordinate instance
 * @param {TrackedTextFeature[]} features
 * @param {LayoutRectangle} layout
 * @returns {Coordinate}
 */
export const parseCoordinates = (
  features: TrackedTextFeature[],
  layout?: LayoutRectangle
): Coordinate | null => {
  const foundCoordinates: Array<{
    coordinates: Coordinate;
    distance: number;
  }> = [];
  for (const feature of features) {
    for (const component of feature.components) {
      let coordinates: Coordinate | null = null;
      for (const parseModule of modules) {
        if (!coordinates) {
          coordinates = parseModule(component.value);
        }
      }
      if (coordinates) {
        const distance = distanceFromCenter(component.bounds, layout);
        foundCoordinates.push({
          coordinates,
          distance,
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
