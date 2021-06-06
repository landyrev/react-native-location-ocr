export interface IDMSCoordinate {
  degrees: number;
  minutes: number;
  seconds?: number;
  direction: 'N' | 'E' | 'S' | 'W';
}
