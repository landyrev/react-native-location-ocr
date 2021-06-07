import { Coordinate } from '../../../coordinate';
import { IDMSCoordinate } from '../../../interfaces/dms-coordinate.interface';
import { normalizeString } from '../../normalize-string';
import { ParserType } from './parser.type';

/**
 *
 * @param {string[]} s Array with Degrees, Minutes, Seconds and Direction
 * @returns {IDMSCoordinate}
 */
const stringToDms = (s: string[]): IDMSCoordinate => {
  return {
    degrees: parseInt(s[0], 10),
    minutes: parseInt(s[1], 10),
    seconds: parseFloat(s[2]),
    direction: s[3].toLocaleUpperCase() as any,
  };
};

export const parseDmsCoordinates: ParserType = (
  source: string
): Coordinate | null => {
  const normalizedString = normalizeString(source);
  const re = new RegExp(
    /(\d{1,2})\D{0,3}?(\d{1,2})\D{0,3}?(\d{1,2}(?:[.,]\d{1,})?)\D{0,3}?([ns])\D{0,6}?(\d{1,2})\D{0,3}?(\d{1,2})\D{0,3}?(\d{1,2}(?:[.,]\d{1,})?)\D{0,3}?([we])/,
    'gi'
  );
  let matchResult = re.exec(normalizedString);
  if (!matchResult || matchResult.length < 9) {
    return null;
  }
  return Coordinate.fromDMSCoordinate([
    stringToDms(matchResult.slice(1, 5)),
    stringToDms(matchResult.slice(5)),
  ]);
};
