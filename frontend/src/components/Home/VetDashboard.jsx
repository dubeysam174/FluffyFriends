import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import { Users, Calendar, MessageSquare } from "lucide-react";
import DashboardLayout from "../layout/DashboardLayout";

const VetDashboard = () => {
  const user = useSelector(selectUser);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        {/* WELCOME HEADER */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, Dr. <span className="text-green-600">{user?.name}!</span> 🏥
          </h1>
          <p className="text-gray-600">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Patients</p>
                <p className="text-3xl font-bold text-gray-900">24</p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Today's Appointments</p>
                <p className="text-3xl font-bold text-gray-900">5</p>
              </div>
              <div className="text-4xl">📅</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Requests</p>
                <p className="text-3xl font-bold text-gray-900">3</p>
              </div>
              <div className="text-4xl">⏳</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Rating</p>
                <p className="text-3xl font-bold text-yellow-500">4.8/5</p>
              </div>
              <div className="text-4xl">⭐</div>
            </div>
          </div>
        </div>

        {/* MAIN ACTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* MY APPOINTMENTS */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition">
            <Calendar size={40} className="mb-4" />
            <h3 className="text-2xl font-bold mb-2">My Appointments</h3>
            <p className="text-blue-100 mb-4">
              View and manage your schedule
            </p>
            <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg hover:bg-blue-50 transition">
              View Schedule
            </button>
          </div>

          {/* PATIENTS */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition">
            <Users size={40} className="mb-4" />
            <h3 className="text-2xl font-bold mb-2">My Patients</h3>
            <p className="text-green-100 mb-4">
              Access patient records and history
            </p>
            <button className="bg-white text-green-600 font-semibold px-6 py-2 rounded-lg hover:bg-green-50 transition">
              View Patients
            </button>
          </div>

          {/* MESSAGES */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition">
            <MessageSquare size={40} className="mb-4" />
            <h3 className="text-2xl font-bold mb-2">Messages</h3>
            <p className="text-purple-100 mb-4">
              Chat with pet owners
            </p>
            <button className="bg-white text-purple-600 font-semibold px-6 py-2 rounded-lg hover:bg-purple-50 transition">
              Open Chat
            </button>
          </div>
        </div>

        {/* TODAY'S APPOINTMENTS */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Today's Appointments</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 border-l-4 border-green-600 bg-gray-50 rounded-lg">
              <div className="text-3xl">🐕</div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Max (Golden Retriever)</h4>
                <p className="text-gray-600 text-sm">Owner: John Doe • Annual Checkup</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">10:00 AM</p>
                <span className="text-green-600 text-sm font-semibold">Confirmed</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border-l-4 border-yellow-600 bg-gray-50 rounded-lg">
              <div className="text-3xl">🐈</div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Bella (Beagle)</h4>
                <p className="text-gray-600 text-sm">Owner: Sarah • Vaccination</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">11:30 AM</p>
                <span className="text-yellow-600 text-sm font-semibold">Pending</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border-l-4 border-red-600 bg-gray-50 rounded-lg">
              <div className="text-3xl">🐩</div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Charlie (Poodle)</h4>
                <p className="text-gray-600 text-sm">Owner: Mike • Grooming & Health Check</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">1:00 PM</p>
                <span className="text-red-600 text-sm font-semibold">Urgent</span>
              </div>
            </div>
          </div>
        </div>

        {/* APPOINTMENT REQUESTS */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">New Appointment Requests</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border-2 border-red-200 bg-red-50 rounded-lg">
              <div>
                <h4 className="font-semibold text-gray-900">Lucky (Labrador) - Emergency</h4>
                <p className="text-gray-600 text-sm">Owner: Tom • Urgent consultation needed</p>
              </div>
              <div className="flex gap-2">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition font-semibold">
                  Accept
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                  Decline
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border-2 border-yellow-200 bg-yellow-50 rounded-lg">
              <div>
                <h4 className="font-semibold text-gray-900">Rocky (German Shepherd)</h4>
                <p className="text-gray-600 text-sm">Owner: Lisa • Vaccination appointment</p>
              </div>
              <div className="flex gap-2">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition font-semibold">
                  Accept
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* PATIENT STATISTICS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* TOP PATIENTS */}
          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Patients</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Buddy</p>
                  <p className="text-gray-600 text-sm">Owner: Alex • Last visit: 2 days ago</p>
                </div>
                <span className="text-2xl">🐕</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Luna</p>
                  <p className="text-gray-600 text-sm">Owner: Emma • Last visit: 1 week ago</p>
                </div>
                <span className="text-2xl">🐈</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Daisy</p>
                  <p className="text-gray-600 text-sm">Owner: Chris • Last visit: 3 days ago</p>
                </div>
                <span className="text-2xl">🐩</span>
              </div>
            </div>
          </div>

          {/* PERFORMANCE */}
          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">This Month Stats</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Completed Appointments</span>
                  <span className="font-semibold text-gray-900">28/30</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: "93%"}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Patient Satisfaction</span>
                  <span className="font-semibold text-gray-900">98%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: "98%"}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">On-Time Rate</span>
                  <span className="font-semibold text-gray-900">96%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{width: "96%"}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VetDashboard;