import { Database } from '../config/database.js';

export class Faculty {
  static async findAll(): Promise<any[]> {
    return await Database.query(`
      SELECT id, first_name, last_name, email, department, title, office_location, phone, research_interests
      FROM faculty
      ORDER BY department, last_name
    `);
  }

  static async findByDepartment(department: string): Promise<any[]> {
    return await Database.query(`
      SELECT id, first_name, last_name, email, department, title, office_location, phone, research_interests
      FROM faculty
      WHERE department LIKE ?
      ORDER BY last_name
    `, [`%${department}%`]);
  }

  static async search(query: string): Promise<any[]> {
    return await Database.query(`
      SELECT id, first_name, last_name, email, department, title, office_location, phone, research_interests
      FROM faculty
      WHERE first_name LIKE ? OR last_name LIKE ? OR department LIKE ? OR research_interests LIKE ?
      ORDER BY department, last_name
    `, [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`]);
  }
}