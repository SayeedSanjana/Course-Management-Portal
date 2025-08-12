import { Router } from 'express';
import { authRoutes } from './auth.js';
import { facultyRoutes } from './faculty.js';
import { gradeRoutes } from './grades.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/faculty', facultyRoutes);
router.use('/grades', gradeRoutes);

export { router as routes };