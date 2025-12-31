import React, { useContext, useEffect, useState } from "react";
import Loading from "../../components/student/Loading";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const StudentsEnrolled = () => {
  const { backendUrl, getToken, isEducator } = useContext(AppContext);
  const [enrolledStudents, setEnrolledStudents] = useState(null);

  const fetchEnrolledStudents = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(
        backendUrl + "/api/educator/enrolled-students",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        setEnrolledStudents(data.enrolledStudents.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isEducator) {
      fetchEnrolledStudents();
    }
  }, [isEducator]);

  return enrolledStudents ? (
    <div className="w-full min-h-screen bg-gradient-to-b from-white to-purple-50/30">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Student <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Enrollments</span>
          </h1>
          <p className="text-gray-600">{enrolledStudents.length} total {enrolledStudents.length === 1 ? 'enrollment' : 'enrollments'}</p>
        </div>

        {/* Enrollments Table */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-white">All Enrollments</h2>
            <p className="text-purple-100 text-sm mt-1">Complete list of students enrolled in your courses</p>
          </div>

          {/* Table Content */}
          {enrolledStudents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden sm:table-cell">
                      #
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">
                      Enrolled Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {enrolledStudents.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 md:px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">
                        {index + 1}
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.student.imageUrl}
                            alt={item.student.name}
                            className="w-10 h-10 rounded-full border-2 border-purple-200"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {item.student.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {item.student.email || "Student"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <p className="text-sm text-gray-900 truncate max-w-xs">
                          {item.courseTitle}
                        </p>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-sm text-gray-600 hidden md:table-cell">
                        {new Date(item.purchaseDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No enrollments yet</h3>
              <p className="text-gray-600 text-center">
                When students enroll in your courses, they'll appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default StudentsEnrolled;