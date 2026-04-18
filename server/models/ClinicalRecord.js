const mongoose = require('mongoose');

const clinicalRecordSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
    unique: true,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  medications: [{
    name: String,
    dosage: String,
    frequency: String,
  }],
  labResults: [{
    testName: String,
    result: String,
    date: { type: Date, default: Date.now },
  }],
  vitals: {
    bloodPressure: String,
    heartRate: Number,
    temperature: Number,
    respiratoryRate: Number,
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const ClinicalRecord = mongoose.model('ClinicalRecord', clinicalRecordSchema);

module.exports = ClinicalRecord;
