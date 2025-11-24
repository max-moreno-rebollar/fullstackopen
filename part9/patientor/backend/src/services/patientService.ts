import diagnosesData from "../../data/diagnoses";
import patientData from "../../data/patients";
import { PublicPatient, Result, NewPatient, Gender } from "../../types";
import { v1 as uuid } from "uuid";
import * as z from "zod";

const getDiagnoses = () => {
  return diagnosesData;
};

const getPatients = (): PublicPatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient) => {
  const id = uuid();
  const newPatient = { id, ...patient };
  patientData.push(newPatient);
  const { name, dateOfBirth, gender, occupation } = newPatient;
  return { id, name, dateOfBirth, gender, occupation };
};

/*
const parseGender = (gender: unknown) => {
  if (typeof gender !== "string") {
    return false;
  }

  if (gender === "male") {
    return true;
  } else if (gender === "female") {
    return true;
  } else if (gender === "other") {
    return true;
  }

  return false;
};

/*
const validatePatient = (data: unknown): Result<NewPatient, string> => {
  if (
    typeof data === "object" &&
    data !== null &&
    "name" in data &&
    typeof data.name === "string" &&
    "dateOfBirth" in data &&
    typeof data.dateOfBirth === "string" &&
    "ssn" in data &&
    typeof data.ssn === "string" &&
    "gender" in data &&
    parseGender(data.gender) &&
    "occupation" in data &&
    typeof data.occupation === "string"
  ) {
    return { kind: "success", value: data as NewPatient };
  }

  console.log(data);
  return { kind: "failure", error: "Missing data" };
};
*/

const validPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

const validatePatient = (data: unknown): Result<NewPatient, z.ZodError> => {
  const patient = validPatientSchema.safeParse(data);
  if (!patient.success) {
    return { kind: "failure", error: patient.error };
  }

  return { kind: "success", value: patient.data };
};

export default {
  getDiagnoses,
  getPatients,
  validatePatient,
  addPatient,
};
