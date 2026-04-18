const User = require('./User');
const Patient = require('./Patient');
const Appointment = require('./Appointment');
const ClinicalRecord = require('./ClinicalRecord');

// Associations
Patient.hasMany(Appointment, { foreignKey: 'patient_id', onDelete: 'CASCADE' });
Appointment.belongsTo(Patient, { foreignKey: 'patient_id' });

module.exports = { User, Patient, Appointment, ClinicalRecord };
