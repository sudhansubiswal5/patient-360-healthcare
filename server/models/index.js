const User = require('./User');
const Patient = require('./Patient');
const Appointment = require('./Appointment');
const ClinicalRecord = require('./ClinicalRecord');

// Associations
Patient.hasMany(Appointment, { foreignKey: 'patientId', onDelete: 'CASCADE' });
Appointment.belongsTo(Patient, { foreignKey: 'patientId' });

module.exports = { User, Patient, Appointment, ClinicalRecord };
