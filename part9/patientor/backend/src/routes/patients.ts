import express, { Response } from "express";
import patientService from "../services/patientService";
import { Diagnoses, PublicPatient } from "../../types";
const router = express.Router();

router.get("/diagnoses", (_req, res: Response<Diagnoses[]>) => {
  res.json(patientService.getDiagnoses());
});

router.get("/patients", (_req, res: Response<PublicPatient[]>) => {
  res.json(patientService.getPatients());
});

router.post("/patients", (req, res) => {
  const result = patientService.validatePatient(req.body);
  if (result.kind === "success") {
    const output = patientService.addPatient(result.value);
    res.json(output);
  } else {
    res.status(400).json("Error with new person data entry.");
  }
});

export default router;
