const { Router } = require('express');
const rateLimit = require('express-rate-limit');
const { createPatient, getAllPatients, getPatientById } = require('../controllers/patientController');
const authMiddleware = require('../middleware/auth');

const router = Router();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later' },
});

router.use(authMiddleware);
router.use(apiLimiter);

router.post('/', createPatient);
router.get('/', getAllPatients);
router.get('/:id', getPatientById);

module.exports = router;
