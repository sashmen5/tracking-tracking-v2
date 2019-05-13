export interface Keyed<T> { [key: string]: T; }
export interface Project {
  id: number;
  label: string;
}

export interface DayTimeStat {
  amountOfHours: number;
  date: number;
}