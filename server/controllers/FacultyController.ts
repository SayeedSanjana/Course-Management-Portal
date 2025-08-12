import { Request, Response } from 'express';
import { Faculty } from '../models/Faculty.js';

export class FacultyController {
  static async getAllFaculty(req: Request, res: Response) {
    try {
      const { department, search } = req.query;

      let faculty;
      if (search) {
        faculty = await Faculty.search(search as string);
      } else if (department) {
        faculty = await Faculty.findByDepartment(department as string);
      } else {
        faculty = await Faculty.findAll();
      }

      res.json({ faculty });
    } catch (error) {
      console.error('Faculty error:', error);
      res.status(500).json({ error: 'Failed to get faculty' });
    }
  }

  static async getDepartments(req: Request, res: Response) {
    try {
      const departments = await Faculty.findAll();
      const uniqueDepartments = [...new Set(departments.map(f => f.department))];
      res.json({ departments: uniqueDepartments });
    } catch (error) {
      console.error('Departments error:', error);
      res.status(500).json({ error: 'Failed to get departments' });
    }
  }
}