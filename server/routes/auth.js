const { Router } = require('express');
const rateLimit = require('express-rate-limit');
const { signup, login } = require('../controllers/authController');

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later' },
});

router.post('/signup', authLimiter, signup);
router.post('/login', authLimiter, login);

module.exports = router;
