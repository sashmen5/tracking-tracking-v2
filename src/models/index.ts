export interface Keyed<T> {
  [key: string]: T;
}

export interface Project {
  id: string;
  label: string;
  owner: string;
  maxMembers: number;
}

export interface DayTimeStat {
  amountOfHours: string;
  date: string;
}

export interface User {
  displayName?: string;
  email: string;
  idToken: string;
  kind: string;
  localId: string;
  registered: boolean;
}
