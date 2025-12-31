import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { currency, backendUrl, getToken, isEducator } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(backendUrl + "/api/educator/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    // Fetch dashboard data immediately when component mounts
    fetchDashboardData();
  }, []);

  return dashboardData ? (
    <div className="w-full min-h-screen bg-gradient-to-b from-white to-purple-50/30">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Dashboard <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Overview</span>
          </h1>
          <p className="text-gray-600">Welcome back! Here's your teaching performance.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          {/* Total Enrollments */}
          <div className="group bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-purple-300 hover:shadow-xl transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                Students
              </span>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                {dashboardData.enrolledStudentsData.length}
              </p>
              <p className="text-sm text-gray-600">Total Enrollments</p>
            </div>
          </div>

          {/* Total Courses */}
          <div className="group bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-pink-300 hover:shadow-xl transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-semibold rounded-full">
                Courses
              </span>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                {dashboardData.totalCourses}
              </p>
              <p className="text-sm text-gray-600">Active Courses</p>
            </div>
          </div>

          {/* Total Earnings */}
          <div className="group bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-green-300 hover:shadow-xl transition-all sm:col-span-2 lg:col-span-1">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                Revenue
              </span>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">
                {currency}{dashboardData.totalEarnings.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Earnings</p>
            </div>
          </div>
        </div>

        {/* Latest Enrollments Table */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-white">Latest Enrollments</h2>
            <p className="text-purple-100 text-sm mt-1">Recent students who joined your courses</p>
          </div>

          {/* Table Content */}
          {dashboardData.enrolledStudentsData.length > 0 ? (
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dashboardData.enrolledStudentsData.slice(0, 10).map((item, index) => (
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

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="/educator/add-course"
            className="group flex items-center justify-between p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 hover:border-purple-300 hover:shadow-lg transition-all"
          >
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Create New Course</h3>
              <p className="text-sm text-gray-600">Start teaching something new</p>
            </div>
            <svg className="w-8 h-8 text-purple-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </a>

          <a
            href="/educator/my-courses"
            className="group flex items-center justify-between p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all"
          >
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Manage Courses</h3>
              <p className="text-sm text-gray-600">Edit and update your courses</p>
            </div>
            <svg className="w-8 h-8 text-blue-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Dashboard;