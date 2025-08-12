import { Database } from '../config/database.js';

export interface GradeData {
  user_id: number;
  course_code: string;
  course_name: string;
  credits: number;
  grade: string;
  semester: string;
  year: number;
  instructor?: string;
}

export class Grade {
  static async findByUserId(userId: number): Promise<any[]> {
    return await Database.query(`
      SELECT id, course_code, course_name, credits, grade, semester, year, instructor
      FROM grades
      WHERE user_id = ?
      ORDER BY year DESC, semester DESC
    `, [userId]);
  }

  static async create(gradeData: GradeData): Promise<any> {
    const result = await Database.run(`
      INSERT INTO grades (user_id, course_code, course_name, credits, grade, semester, year, instructor)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [gradeData.user_id, gradeData.course_code, gradeData.course_name, gradeData.credits, gradeData.grade, gradeData.semester, gradeData.year, gradeData.instructor]);

    return result;
  }

  static async insertSampleGrades(userId: number): Promise<void> {
    const sampleGrades = [
      { course_code: 'CS101', course_name: 'Introduction to Programming', credits: 3, grade: 'A', semester: 'Fall', year: 2023, instructor: 'Dr. Johnson' },
      { course_code: 'MATH201', course_name: 'Calculus II', credits: 4, grade: 'B+', semester: 'Fall', year: 2023, instructor: 'Dr. Davis' },
      { course_code: 'ENG101', course_name: 'English Composition', credits: 3, grade: 'A-', semester: 'Fall', year: 2023, instructor: 'Prof. Smith' },
      { course_code: 'CS201', course_name: 'Data Structures', credits: 3, grade: 'A', semester: 'Spring', year: 2024, instructor: 'Dr. Brown' },
      { course_code: 'PHYS101', course_name: 'Physics I', credits: 4, grade: 'B', semester: 'Spring', year: 2024, instructor: 'Dr. Wilson' },
      { course_code: 'CS301', course_name: 'Database Systems', credits: 3, grade: 'A-', semester: 'Fall', year: 2024, instructor: 'Dr. Johnson' }
    ];

    for (const grade of sampleGrades) {
      await this.create({ ...grade, user_id: userId });
    }
  }
}