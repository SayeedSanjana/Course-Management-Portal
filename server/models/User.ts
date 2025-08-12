import bcrypt from 'bcryptjs';
import { Database } from '../config/database.js';

export interface UserData {
  id?: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  student_id: string;
  major?: string;
  year?: number;
  gpa?: number;
}

export class User {
  static async create(userData: UserData): Promise<any> {
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    
    const result = await Database.run(`
      INSERT INTO users (email, password, first_name, last_name, student_id, major, year)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [userData.email, hashedPassword, userData.first_name, userData.last_name, userData.student_id, userData.major, userData.year]);

    return this.findById(result.id);
  }

  static async findByEmail(email: string): Promise<any> {
    return await Database.get('SELECT * FROM users WHERE email = ?', [email]);
  }

  static async findById(id: number): Promise<any> {
    return await Database.get('SELECT id, email, first_name, last_name, student_id, major, year, gpa, created_at FROM users WHERE id = ?', [id]);
  }

  static async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async updateGPA(userId: number): Promise<void> {
    const grades = await Database.query(`
      SELECT grade, credits FROM grades WHERE user_id = ?
    `, [userId]);

    if (grades.length === 0) return;

    const gradePoints: { [key: string]: number } = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'F': 0.0
    };

    let totalPoints = 0;
    let totalCredits = 0;

    grades.forEach((grade: any) => {
      const points = gradePoints[grade.grade] || 0;
      totalPoints += points * grade.credits;
      totalCredits += grade.credits;
    });

    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

    await Database.run('UPDATE users SET gpa = ? WHERE id = ?', [gpa.toFixed(2), userId]);
  }
}