import { Router } from 'express';
import { FacultyController } from '../controllers/FacultyController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticateToken, FacultyController.getAllFaculty);
router.get('/departments', authenticateToken, FacultyController.getDepartments);

export { router as facultyRoutes };