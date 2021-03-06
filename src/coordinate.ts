import { IDMSCoordinate, IHasValueOf } from './interfaces';

export class Coordinate implements IHasValueOf {
  public readonly latitude: number = 0;
  public readonly longitude: number = 0;

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  /**
   * Compare two coordinates
   * @param {Coordinate} coordinate Coordinate to compare with
   * @returns {boolean}
   */
  isEqual(coordinate: Coordinate): boolean {
    return (
      coordinate.latitude === this.latitude &&
      coordinate.longitude === this.longitude
    );
  }

  toString() {
    const dms = this.dms;
    return dms.map(this.dmsToString).join(' ');
  }

  private dmsToString(dms: IDMSCoordinate): string {
    return `${dms.degrees}°${dms.minutes}'${dms.seconds}"${dms.direction}`;
  }

  valueOf() {
    return [this.latitude, this.longitude].join(':');
  }

  get dms(): [IDMSCoordinate, IDMSCoordinate] {
    const first = Coordinate.DDToDMS(Math.abs(this.latitude));
    const second = Coordinate.DDToDMS(Math.abs(this.longitude));
    return [
      {
        ...first,
        direction: this.latitude > 0 ? 'N' : 'S',
      },
      {
        ...second,
        direction: this.longitude > 0 ? 'E' : 'W',
      },
    ];
  }

  static isCoordinateValid(coordinate: IDMSCoordinate) {
    if (coordinate.degrees < 0 || coordinate.degrees >= 60) {
      return false;
    }
    if (coordinate.minutes < 0 || coordinate.minutes >= 60) {
      return false;
    }
    if (coordinate.seconds < 0 || coordinate.seconds >= 100) {
      return false;
    }
    return true;
  }

  static fromDMSCoordinate(
    coordinate: [IDMSCoordinate, IDMSCoordinate]
  ): Coordinate | null {
    if (!Coordinate.isCoordinateValid(coordinate[0])) {
      return null;
    }

    if (!Coordinate.isCoordinateValid(coordinate[1])) {
      return null;
    }

    const parsed = new Coordinate(
      Coordinate.convertDMSToDD(coordinate[0]),
      Coordinate.convertDMSToDD(coordinate[1])
    );
    return parsed;
  }

  static convertDMSToDD({
    degrees,
    minutes,
    seconds = 0,
    direction,
  }: IDMSCoordinate): number {
    var dd = degrees + (minutes + seconds / 100) / 60;
    if (direction === 'S' || direction === 'W') {
      dd = dd * -1;
    }
    return dd;
  }

  static DDToDMS(deg: number) {
    const absolute = Math.abs(deg);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = Math.round((minutesNotTruncated - minutes) * 100);
    return { degrees, minutes, seconds };
  }
}
