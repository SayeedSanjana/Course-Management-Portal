import React, { useEffect, useState } from 'react';
import { Search, Mail, Phone, MapPin, BookOpen, Filter } from 'lucide-react';
import { Card } from '../components/Card';
import { facultyAPI } from '../services/api';

interface FacultyMember {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  department: string;
  title: string;
  office_location: string;
  phone: string;
  research_interests: string;
}

export function Faculty() {
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [filteredFaculty, setFilteredFaculty] = useState<FacultyMember[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [facultyResponse, departmentsResponse] = await Promise.all([
          facultyAPI.getFaculty(),
          facultyAPI.getDepartments()
        ]);
        
        setFaculty(facultyResponse.data.faculty);
        setFilteredFaculty(facultyResponse.data.faculty);
        setDepartments(departmentsResponse.data.departments);
      } catch (error) {
        console.error('Failed to fetch faculty data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = faculty;

    if (searchTerm) {
      filtered = filtered.filter(member =>
        `${member.first_name} ${member.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.research_interests?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDepartment) {
      filtered = filtered.filter(member => member.department === selectedDepartment);
    }

    setFilteredFaculty(filtered);
  }, [faculty, searchTerm, selectedDepartment]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDepartmentFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="grid gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg border">
                <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-300 rounded w-full"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Faculty Directory</h1>
        <p className="text-gray-600 mt-2">
          Find contact information and research interests for university faculty members
        </p>
      </div>

      {/* Search and Filter */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search faculty by name, department, or research interests..."
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={selectedDepartment}
              onChange={handleDepartmentFilter}
              className="block w-full pl-10 pr-8 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Results Summary */}
      <div className="text-sm text-gray-600">
        Showing {filteredFaculty.length} of {faculty.length} faculty members
      </div>

      {/* Faculty Grid */}
      <div className="grid gap-6">
        {filteredFaculty.map((member) => (
          <Card key={member.id} className="hover:shadow-lg transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Dr. {member.first_name} {member.last_name}
                    </h3>
                    <p className="text-blue-600 font-medium">{member.title}</p>
                    <p className="text-gray-600">{member.department}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <a href={`mailto:${member.email}`} className="hover:text-blue-600">
                        {member.email}
                      </a>
                    </div>
                    {member.phone && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{member.phone}</span>
                      </div>
                    )}
                    {member.office_location && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{member.office_location}</span>
                      </div>
                    )}
                  </div>

                  {member.research_interests && (
                    <div>
                      <div className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                        <BookOpen className="h-4 w-4" />
                        <span>Research Interests</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {member.research_interests}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                    Contact
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {filteredFaculty.length === 0 && (
          <Card>
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No faculty found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or department filter.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}