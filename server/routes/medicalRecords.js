const { Router } = require('express');
const rateLimit = require('express-rate-limit');
const { createRecord, getRecordsByPatient } = require('../controllers/medicalRecordController');
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

router.post('/', createRecord);
router.get('/patient/:patientId', getRecordsByPatient);

module.exports = router;
