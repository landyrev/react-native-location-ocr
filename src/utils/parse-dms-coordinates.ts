import { Coordinate } from '../coordinate';
import { IDMSCoordinate } from '../interfaces/dms-coordinate.interface';

const stringToDms = (s: string[]): IDMSCoordinate => {
  return {
    degrees: parseInt(s[0], 10),
    minutes: parseInt(s[1], 10),
    seconds: parseFloat(s[2]),
    direction: s[3].toLocaleUpperCase() as any,
  };
};

export const parseDmsCoordinates = (s: string): Coordinate | null => {
  const re = new RegExp(
    /(\d{1,2})\D{1,3}(\d{1,2})\D{1,3}(\d{1,2}(?:[.,]\d{1,})?)\D{0,3}([nwsw"])/,
    'gi'
  );
  let matchResult = re.exec(s);
  const result = [];
  while (matchResult) {
    result.push(matchResult);
    matchResult = re.exec(s);
  }
  if (result.length < 2) {
    return null;
  }
  return Coordinate.fromDMSCoordinate([
    stringToDms(result[0].slice(1)),
    stringToDms(result[1].slice(1)),
  ]);
};
