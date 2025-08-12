import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Database {
  private static instance: sqlite3.Database;

  static getInstance(): sqlite3.Database {
    if (!this.instance) {
      const dbPath = process.env.DATABASE_URL || path.join(__dirname, '../../database.sqlite');
      this.instance = new sqlite3.Database(dbPath);
    }
    return this.instance;
  }

  static initialize(): void {
    const db = this.getInstance();
    
    // Create users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        student_id VARCHAR(50) UNIQUE NOT NULL,
        major VARCHAR(100),
        year INTEGER,
        gpa DECIMAL(3,2) DEFAULT 0.00,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create faculty table
    db.run(`
      CREATE TABLE IF NOT EXISTS faculty (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        department VARCHAR(100) NOT NULL,
        title VARCHAR(100),
        office_location VARCHAR(100),
        phone VARCHAR(20),
        research_interests TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create grades table
    db.run(`
      CREATE TABLE IF NOT EXISTS grades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        course_code VARCHAR(20) NOT NULL,
        course_name VARCHAR(200) NOT NULL,
        credits INTEGER NOT NULL,
        grade VARCHAR(5) NOT NULL,
        semester VARCHAR(20) NOT NULL,
        year INTEGER NOT NULL,
        instructor VARCHAR(200),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `);

    // Create advisings table
    db.run(`
      CREATE TABLE IF NOT EXISTS advisings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        advisor_name VARCHAR(200) NOT NULL,
        appointment_date DATE,
        notes TEXT,
        status VARCHAR(20) DEFAULT 'scheduled',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `);

    // Insert sample data
    this.insertSampleData();
  }

  private static insertSampleData(): void {
    const db = this.getInstance();

    // Insert sample faculty
    const facultyData = [
      ['Dr. Sarah', 'Johnson', 'sarah.johnson@university.edu', 'Computer Science', 'Professor', 'CS Building 301', '555-0101', 'Machine Learning, AI, Data Mining'],
      ['Dr. Michael', 'Brown', 'michael.brown@university.edu', 'Computer Science', 'Associate Professor', 'CS Building 205', '555-0102', 'Software Engineering, Web Development'],
      ['Dr. Emily', 'Davis', 'emily.davis@university.edu', 'Mathematics', 'Professor', 'Math Building 401', '555-0103', 'Applied Mathematics, Statistics'],
      ['Dr. James', 'Wilson', 'james.wilson@university.edu', 'Physics', 'Assistant Professor', 'Physics Building 201', '555-0104', 'Quantum Physics, Theoretical Physics'],
      ['Dr. Lisa', 'Anderson', 'lisa.anderson@university.edu', 'Chemistry', 'Professor', 'Chemistry Building 301', '555-0105', 'Organic Chemistry, Biochemistry']
    ];

    facultyData.forEach(faculty => {
      db.run(`
        INSERT OR IGNORE INTO faculty (first_name, last_name, email, department, title, office_location, phone, research_interests)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, faculty);
    });
  }

  static async query(sql: string, params: any[] = []): Promise<any[]> {
    const db = this.getInstance();
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      });
    });
  }

  static async run(sql: string, params: any[] = []): Promise<any> {
    const db = this.getInstance();
    return new Promise((resolve, reject) => {
      db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, changes: this.changes });
      });
    });
  }

  static async get(sql: string, params: any[] = []): Promise<any> {
    const db = this.getInstance();
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }
}