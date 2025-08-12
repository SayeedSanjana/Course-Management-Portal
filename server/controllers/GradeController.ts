import { Response } from 'express';
import { Grade } from '../models/Grade.js';
import { AuthRequest } from '../middleware/auth.js';

export class GradeController {
  static async getUserGrades(req: AuthRequest, res: Response) {
    try {
      const grades = await Grade.findByUserId(req.user.id);
      res.json({ grades });
    } catch (error) {
      console.error('Grades error:', error);
      res.status(500).json({ error: 'Failed to get grades' });
    }
  }

  static async getGradesSummary(req: AuthRequest, res: Response) {
    try {
      const grades = await Grade.findByUserId(req.user.id);
      
      const summary = {
        totalCourses: grades.length,
        totalCredits: grades.reduce((sum, grade) => sum + grade.credits, 0),
        gpa: req.user.gpa || 0,
        gradeDistribution: grades.reduce((acc: any, grade) => {
          acc[grade.grade] = (acc[grade.grade] || 0) + 1;
          return acc;
        }, {})
      };

      res.json({ summary });
    } catch (error) {
      console.error('Grade summary error:', error);
      res.status(500).json({ error: 'Failed to get grade summary' });
    }
  }
}