import React from 'react';
import { Calendar, User, Phone, Mail, Clock, MessageSquare, AlertCircle } from 'lucide-react';
import { Card } from '../components/Card';

export function Advising() {
  const advisorInfo = {
    name: 'Dr. Sarah Johnson',
    title: 'Academic Advisor',
    department: 'Computer Science',
    email: 'sarah.johnson@university.edu',
    phone: '555-0101',
    office: 'CS Building 301',
    officeHours: 'Mon, Wed, Fri: 2:00 PM - 4:00 PM'
  };

  const upcomingAppointments = [
    {
      id: 1,
      date: '2024-03-20',
      time: '2:30 PM',
      type: 'Course Planning',
      status: 'confirmed'
    }
  ];

  const advisingResources = [
    {
      title: 'Degree Audit',
      description: 'Review your progress toward degree completion',
      action: 'View Audit',
      color: 'blue'
    },
    {
      title: 'Course Catalog',
      description: 'Browse available courses and requirements',
      action: 'Browse Catalog',
      color: 'green'
    },
    {
      title: 'Academic Calendar',
      description: 'View important dates and deadlines',
      action: 'View Calendar',
      color: 'purple'
    },
    {
      title: 'Registration Guide',
      description: 'Step-by-step guide for course registration',
      action: 'View Guide',
      color: 'yellow'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Academic Advising</h1>
        <p className="text-gray-600 mt-2">
          Get guidance on course selection, degree planning, and academic success
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Advisor Information */}
        <div className="lg:col-span-2">
          <Card title="Your Academic Advisor">
            <div className="flex items-start space-x-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{advisorInfo.name}</h3>
                <p className="text-blue-600 font-medium">{advisorInfo.title}</p>
                <p className="text-gray-600 mb-4">{advisorInfo.department}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <a href={`mailto:${advisorInfo.email}`} className="hover:text-blue-600">
                        {advisorInfo.email}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{advisorInfo.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{advisorInfo.office}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start space-x-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 mt-0.5" />
                      <div>
                        <p className="font-medium">Office Hours</p>
                        <p>{advisorInfo.officeHours}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                    Schedule Appointment
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 transition-colors">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Upcoming Appointments */}
          <Card title="Upcoming Appointments" className="mt-6">
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{appointment.type}</h4>
                        <p className="text-sm text-gray-600">
                          {appointment.date} at {appointment.time}
                        </p>
                        <span className="inline-flex px-2 py-1 text-xs font-semibold bg-green-100 text-green-600 rounded-full">
                          Confirmed
                        </span>
                      </div>
                    </div>
                    <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-100 rounded-md transition-colors">
                      Reschedule
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming appointments</h3>
                <p className="text-gray-600 mb-4">Schedule a meeting with your advisor to discuss your academic plans.</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Schedule Appointment
                </button>
              </div>
            )}
          </Card>
        </div>

        {/* Quick Actions and Resources */}
        <div>
          <Card title="Advising Resources">
            <div className="space-y-4">
              {advisingResources.map((resource, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">{resource.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                  <button className={`text-sm font-medium px-3 py-1 rounded-md transition-colors ${
                    resource.color === 'blue' ? 'text-blue-600 bg-blue-50 hover:bg-blue-100' :
                    resource.color === 'green' ? 'text-green-600 bg-green-50 hover:bg-green-100' :
                    resource.color === 'purple' ? 'text-purple-600 bg-purple-50 hover:bg-purple-100' :
                    'text-yellow-600 bg-yellow-50 hover:bg-yellow-100'
                  }`}>
                    {resource.action}
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Important Notices */}
          <Card title="Important Notices" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">Registration Period</h4>
                  <p className="text-xs text-gray-600">
                    Fall 2024 registration opens April 1st. Schedule an advising appointment to plan your courses.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">Degree Audit</h4>
                  <p className="text-xs text-gray-600">
                    Your updated degree audit is available. Review your progress toward graduation.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}