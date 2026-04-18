const ClinicalRecord = require('../models/ClinicalRecord');

const createClinicalRecord = async (req, res) => {
  try {
    const record = await ClinicalRecord.create(req.body);
    res.status(201).json({ success: true, data: record });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getRecordsByPatientId = async (req, res) => {
  try {
    const records = await ClinicalRecord.find({ patientId: req.params.patientId });
    res.json({ success: true, data: records });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createClinicalRecord, getRecordsByPatientId };
