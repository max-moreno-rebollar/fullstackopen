export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export interface NewPatient {
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type Result<T, E> =
  | { kind: "success"; value: T }
  | { kind: "failure"; error: E };

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export type PublicPatient = Omit<Patient, "ssn">;
