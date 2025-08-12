import React, { useEffect, useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  TrendingUp,
  Calendar,
  Bell
} from 'lucide-react';
import { Card } from '../components/Card';
import { StatsCard } from '../components/StatsCard';
import { useAuth } from '../contexts/AuthContext';
import { gradeAPI } from '../services/api';

export function Dashboard() {
  const { user } = useAuth();
  const [gradeSummary, setGradeSummary] = useState<any>(null);

  useEffect(() => {
    const fetchGradeSummary = async () => {
      try {
        const response = await gradeAPI.getGradeSummary();
        setGradeSummary(response.data.summary);
      } catch (error) {
        console.error('Failed to fetch grade summary:', error);
      }
    };

    fetchGradeSummary();
  }, []);

  const upcomingEvents = [
    { title: 'Midterm Exams Begin', date: '2024-03-15', type: 'exam' },
    { title: 'Spring Break', date: '2024-03-25', type: 'break' },
    { title: 'Registration Opens', date: '2024-04-01', type: 'registration' },
    { title: 'Final Exams', date: '2024-05-10', type: 'exam' },
  ];

  const quickActions = [
    { title: 'View Grades', description: 'Check your latest grades and GPA', href: '/grades', icon: BookOpen },
    { title: 'Faculty Directory', description: 'Find faculty members and contact information', href: '/faculty', icon: Users },
    { title: 'Academic Advising', description: 'Schedule advising appointments', href: '/advising', icon: Calendar },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg text-white p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user?.first_name}! 👋</h1>
            <p className="text-blue-100 mt-2">
              Student ID: {user?.student_id} • {user?.major} • Year {user?.year}
            </p>
          </div>
          <GraduationCap className="h-16 w-16 text-blue-200" />
        </div>
      </div>

      {/* Stats Cards */}
      {gradeSummary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Current GPA"
            value={user?.gpa?.toFixed(2) || '0.00'}
            icon={TrendingUp}
            color="green"
          />
          <StatsCard
            title="Courses Completed"
            value={gradeSummary.totalCourses}
            icon={BookOpen}
            color="blue"
          />
          <StatsCard
            title="Total Credits"
            value={gradeSummary.totalCredits}
            icon={GraduationCap}
            color="purple"
          />
          <StatsCard
            title="This Semester"
            value="6 Courses"
            icon={Calendar}
            color="yellow"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <Card title="Quick Actions">
            <div className="grid gap-4">
              {quickActions.map((action, index) => (
                <a
                  key={index}
                  href={action.href}
                  className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <action.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </Card>
        </div>

        {/* Upcoming Events */}
        <div>
          <Card title="Upcoming Events">
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    event.type === 'exam' ? 'bg-red-500' : 
                    event.type === 'break' ? 'bg-green-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <Card title="Recent Activity">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Bell className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">New grade posted</p>
              <p className="text-xs text-gray-500">CS301 Database Systems - Grade: A-</p>
              <p className="text-xs text-gray-400">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Calendar className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Advising appointment scheduled</p>
              <p className="text-xs text-gray-500">Meeting with Dr. Johnson on March 20th</p>
              <p className="text-xs text-gray-400">1 day ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <BookOpen className="h-5 w-5 text-purple-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Course registration reminder</p>
              <p className="text-xs text-gray-500">Fall 2024 registration opens April 1st</p>
              <p className="text-xs text-gray-400">3 days ago</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}