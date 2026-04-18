const { Patient } = require('../models');

const createPatient = async (req, res) => {
  try {
    const { name, dob, insurance_id } = req.body;
    const patient = await Patient.create({ name, dob, insurance_id });
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createPatient, getAllPatients, getPatientById };
