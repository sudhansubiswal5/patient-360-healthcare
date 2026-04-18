const { Appointment } = require('../models');

const createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json({ success: true, data: appointment });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getAppointmentsByPatient = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { patientId: req.params.patientId },
    });
    res.json({ success: true, data: appointments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const [updated] = await Appointment.update(
      { status: req.body.status },
      { where: { id: req.params.id } }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    res.json({ success: true, message: 'Status updated' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = { createAppointment, getAppointmentsByPatient, updateAppointmentStatus };
