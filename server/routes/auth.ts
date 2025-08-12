import { Router } from 'express';
import { AuthController } from '../controllers/AuthController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/profile', authenticateToken, AuthController.getProfile);

export { router as authRoutes };