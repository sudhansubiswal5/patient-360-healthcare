const mongoose = require('mongoose');

const clinicalRecordSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
    index: true,
  },
  diagnosis: String,
  medications: [
    {
      name: String,
      dosage: String,
      frequency: String,
    },
  ],
  labResults: [
    {
      testName: String,
      result: String,
      date: { type: Date, default: Date.now },
    },
  ],
  vitals: {
    bloodPressure: String,
    heartRate: Number,
    temperature: Number,
    respiratoryRate: Number,
  },
  notes: String,
}, { timestamps: true });

module.exports = mongoose.model('ClinicalRecord', clinicalRecordSchema);
