import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import { Users, CalendarDays, MessageSquare,Clock3,Star } from "lucide-react";
import DashboardLayout from "../layout/DashboardLayout";

const VetDashboard = () => {
  const user = useSelector(selectUser);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* WELCOME HEADER */}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back, <span className="text-red-600">{user?.name}!</span>
        </h1>
        <p className="text-gray-600">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* STATS */}
       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

  {/* Total Patients */}
  <div className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm font-medium">
          Total Patients
        </p>

        <h2 className="text-4xl font-bold text-gray-900 mt-2">
          24
        </h2>
      </div>

      <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
        <Users className="text-blue-600" size={28} />
      </div>
    </div>
  </div>

  {/* Today's Appointments */}
  <div className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm font-medium">
          Today's Appointments
        </p>

        <h2 className="text-4xl font-bold text-gray-900 mt-2">
          5
        </h2>
      </div>

      <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
        <CalendarDays className="text-green-600" size={28} />
      </div>
    </div>
  </div>

  {/* Pending Requests */}
  <div className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm font-medium">
          Pending Requests
        </p>

        <h2 className="text-4xl font-bold text-gray-900 mt-2">
          3
        </h2>
      </div>

      <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">
        <Clock3 className="text-orange-600" size={28} />
      </div>
    </div>
  </div>

  {/* Rating */}
  <div className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm font-medium">
          Rating
        </p>

        <h2 className="text-4xl font-bold text-gray-900 mt-2">
          4.8
        </h2>
      </div>

      <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
        <Star className="text-gray-600" size={28} />
      </div>
    </div>
  </div>

</div>


        {/* TODAY'S APPOINTMENTS */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-3xl font-bold text-gray-900  mb-6">
            Today's Appointments
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 border-l-4 border-green-600 bg-gray-50 rounded-lg">
              <div className="text-3xl">🐕</div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">
                  Max (Golden Retriever)
                </h4>
                <p className="text-gray-600 text-sm">
                  Owner: John Doe • Annual Checkup
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">10:00 AM</p>
                <span className="text-green-600 text-sm font-semibold">
                  Confirmed
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border-l-4 border-yellow-600 bg-gray-50 rounded-lg">
              <div className="text-3xl">🐈</div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Bella (Beagle)</h4>
                <p className="text-gray-600 text-sm">
                  Owner: Sarah • Vaccination
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">11:30 AM</p>
                <span className="text-yellow-600 text-sm font-semibold">
                  Pending
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border-l-4 border-red-600 bg-gray-50 rounded-lg">
              <div className="text-3xl">🐩</div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">
                  Charlie (Poodle)
                </h4>
                <p className="text-gray-600 text-sm">
                  Owner: Mike • Grooming & Health Check
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">1:00 PM</p>
                <span className="text-red-600 text-sm font-semibold">
                  Urgent
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* APPOINTMENT REQUESTS */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
  {/* Header */}
  <div className="flex items-center justify-between px-6 py-5">
    <h2 className="text-3xl font-bold text-gray-900">
      New Appointment Requests
    </h2>

    <span className="bg-blue-100 text-blue-600 text-sm font-semibold px-4 py-1 rounded-full">
      3 pending
    </span>
  </div>

  {/* Request 1 */}
  <div className="flex items-center justify-between px-6 py-5 border-t border-gray-200 hover:bg-gray-50 transition">
    <div>
      <div className="flex items-center gap-3">
        <h3 className="font-bold text-lg text-gray-900">
          Lucky <span className="text-gray-500">(Labrador)</span>
        </h3>

        <span className="bg-red-100 text-red-500 text-xs font-semibold px-3 py-1 rounded-full">
          Emergency
        </span>
      </div>

      <p className="text-gray-500 mt-1">
        Owner: Tom • Urgent consultation needed
      </p>
    </div>

    <div className="flex gap-3">
      <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition">
        Accept
      </button>

      <button className="border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold transition">
        Decline
      </button>
    </div>
  </div>

  {/* Request 2 */}
  <div className="flex items-center justify-between px-6 py-5 border-t border-gray-200 hover:bg-gray-50 transition">
    <div>
      <div className="flex items-center gap-3">
        <h3 className="font-bold text-lg text-gray-900">
          Rocky <span className="text-gray-500">(German Shepherd)</span>
        </h3>

        <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">
          Vaccination
        </span>
      </div>

      <p className="text-gray-500 mt-1">
        Owner: Lisa • Vaccination appointment
      </p>
    </div>

    <div className="flex gap-3">
      <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition">
        Accept
      </button>

      <button className="border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold transition">
        Decline
      </button>
    </div>
  </div>

  {/* Request 3 */}
  <div className="flex items-center justify-between px-6 py-5 border-t border-gray-200 hover:bg-gray-50 transition">
    <div>
      <div className="flex items-center gap-3">
        <h3 className="font-bold text-lg text-gray-900">
          Bella <span className="text-gray-500">(Beagle)</span>
        </h3>

        <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
          Routine
        </span>
      </div>

      <p className="text-gray-500 mt-1">
        Owner: Sam • Annual check-up
      </p>
    </div>

    <div className="flex gap-3">
      <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition">
        Accept
      </button>

      <button className="border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold transition">
        Decline
      </button>
    </div>
  </div>
</div>

        {/* PATIENT STATISTICS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* TOP PATIENTS */}
          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Recent Patients
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Buddy</p>
                  <p className="text-gray-600 text-sm">
                    Owner: Alex • Last visit: 2 days ago
                  </p>
                </div>
                <span className="text-2xl">🐕</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Luna</p>
                  <p className="text-gray-600 text-sm">
                    Owner: Emma • Last visit: 1 week ago
                  </p>
                </div>
                <span className="text-2xl">🐈</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Daisy</p>
                  <p className="text-gray-600 text-sm">
                    Owner: Chris • Last visit: 3 days ago
                  </p>
                </div>
                <span className="text-2xl">🐩</span>
              </div>
            </div>
          </div>

          {/* PERFORMANCE */}
          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              This Month Stats
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Completed Appointments</span>
                  <span className="font-semibold text-gray-900">28/30</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: "93%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Patient Satisfaction</span>
                  <span className="font-semibold text-gray-900">98%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "98%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">On-Time Rate</span>
                  <span className="font-semibold text-gray-900">96%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: "96%" }}
                  ></div>
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
