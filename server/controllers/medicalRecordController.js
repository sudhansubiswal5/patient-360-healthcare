const ClinicalRecord = require('../models/ClinicalRecord');

const createRecord = async (req, res) => {
  try {
    const { patientId, data } = req.body;
    if (!patientId || !data) {
      return res.status(400).json({ error: 'patientId and data are required' });
    }
    const record = await ClinicalRecord.create({ patientId, data });
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getRecordsByPatient = async (req, res) => {
  try {
    const records = await ClinicalRecord.find({ patientId: req.params.patientId });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createRecord, getRecordsByPatient };
