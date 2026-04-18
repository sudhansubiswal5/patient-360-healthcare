const { Router } = require('express');
const rateLimit = require('express-rate-limit');
const {
  createAppointment,
  getAppointmentsByPatient,
  updateAppointmentStatus,
} = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/auth');

const router = Router();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later' },
});

router.use(apiLimiter);
router.use(authMiddleware);

router.post('/', createAppointment);
router.get('/patient/:patientId', getAppointmentsByPatient);
router.patch('/:id/status', updateAppointmentStatus);

module.exports = router;
