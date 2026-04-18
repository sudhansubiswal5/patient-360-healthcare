const { Appointment } = require('../models');

const VALID_STATUSES = ['scheduled', 'completed', 'cancelled'];

const createAppointment = async (req, res) => {
  try {
    const { patient_id, date, status } = req.body;
    if (!patient_id || !date) {
      return res.status(400).json({ error: 'patient_id and date are required' });
    }
    const appointment = await Appointment.create({ patient_id, date, status });
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAppointmentsByPatient = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { patient_id: req.params.patientId },
    });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ error: `Status must be one of: ${VALID_STATUSES.join(', ')}` });
    }
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    await appointment.update({ status });
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createAppointment, getAppointmentsByPatient, updateAppointmentStatus };
