import { Router } from 'express';
import { GradeController } from '../controllers/GradeController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticateToken, GradeController.getUserGrades);
router.get('/summary', authenticateToken, GradeController.getGradesSummary);

export { router as gradeRoutes };