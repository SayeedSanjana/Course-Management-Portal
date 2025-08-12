import React, { useEffect, useState } from 'react';
import { BookOpen, TrendingUp, Award, Calendar } from 'lucide-react';
import { Card } from '../components/Card';
import { StatsCard } from '../components/StatsCard';
import { gradeAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface Grade {
  id: number;
  course_code: string;
  course_name: string;
  credits: number;
  grade: string;
  semester: string;
  year: number;
  instructor: string;
}

interface GradeSummary {
  totalCourses: number;
  totalCredits: number;
  gpa: number;
  gradeDistribution: { [key: string]: number };
}

export function Grades() {
  const { user } = useAuth();
  const [grades, setGrades] = useState<Grade[]>([]);
  const [summary, setSummary] = useState<GradeSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSemester, setSelectedSemester] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gradesResponse, summaryResponse] = await Promise.all([
          gradeAPI.getGrades(),
          gradeAPI.getGradeSummary()
        ]);
        
        setGrades(gradesResponse.data.grades);
        setSummary(summaryResponse.data.summary);
      } catch (error) {
        console.error('Failed to fetch grade data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const gradePoints: { [key: string]: number } = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-50';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-50';
    if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-50';
    if (grade.startsWith('D')) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const semesters = [...new Set(grades.map(g => `${g.semester} ${g.year}`))];
  const filteredGrades = selectedSemester === 'all' 
    ? grades 
    : grades.filter(g => `${g.semester} ${g.year}` === selectedSemester);

  const semesterGPA = selectedSemester !== 'all' ? (() => {
    let totalPoints = 0;
    let totalCredits = 0;
    filteredGrades.forEach(grade => {
      const points = gradePoints[grade.grade] || 0;
      totalPoints += points * grade.credits;
      totalCredits += grade.credits;
    });
    return totalCredits > 0 ? (totalPoints / totalCredits) : 0;
  })() : user?.gpa || 0;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-300 rounded-lg"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Academic Records</h1>
        <p className="text-gray-600 mt-2">
          View your grades, GPA, and academic performance
        </p>
      </div>

      {/* Stats Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsCard
            title="Current GPA"
            value={user?.gpa?.toFixed(2) || '0.00'}
            icon={TrendingUp}
            color="green"
            subtitle="Cumulative"
          />
          <StatsCard
            title="Courses Completed"
            value={summary.totalCourses}
            icon={BookOpen}
            color="blue"
          />
          <StatsCard
            title="Total Credits"
            value={summary.totalCredits}
            icon={Award}
            color="purple"
          />
          <StatsCard
            title="Semester GPA"
            value={semesterGPA.toFixed(2)}
            icon={Calendar}
            color="yellow"
            subtitle={selectedSemester !== 'all' ? selectedSemester : 'All Time'}
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Grade History */}
        <div className="lg:col-span-3">
          <Card title="Grade History">
            <div className="mb-4">
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Semesters</option>
                {semesters.map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Credits
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Points
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Semester
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredGrades.map((grade) => (
                    <tr key={grade.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {grade.course_code}
                          </div>
                          <div className="text-sm text-gray-500">
                            {grade.course_name}
                          </div>
                          {grade.instructor && (
                            <div className="text-xs text-gray-400">
                              {grade.instructor}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {grade.credits}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGradeColor(grade.grade)}`}>
                          {grade.grade}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {(gradePoints[grade.grade] * grade.credits).toFixed(1)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {grade.semester} {grade.year}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredGrades.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No grades found</h3>
                <p className="text-gray-600">
                  {selectedSemester === 'all' 
                    ? 'No grades have been posted yet.'
                    : `No grades found for ${selectedSemester}.`
                  }
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Grade Distribution */}
        {summary && (
          <div>
            <Card title="Grade Distribution">
              <div className="space-y-4">
                {Object.entries(summary.gradeDistribution).map(([grade, count]) => (
                  <div key={grade} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`w-3 h-3 rounded-full ${getGradeColor(grade).split(' ')[1]}`} />
                      <span className="text-sm font-medium text-gray-900">{grade}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(count / summary.totalCourses) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-6">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}