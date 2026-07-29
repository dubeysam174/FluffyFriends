import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import { MapPin, Calendar, MessageSquare, Plus } from "lucide-react";
import DashboardLayout from "../layout/DashboardLayout";

const PetOwnerDashboard = () => {
  const user = useSelector(selectUser);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        {/* WELCOME HEADER */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border border-red-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, <span className="text-red-600">{user?.name}!</span> 🐾
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

        {/* QUICK STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Your Pets</p>
                <p className="text-3xl font-bold text-gray-900">3</p>
              </div>
              <div className="text-4xl">🐕</div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Upcoming Appointments</p>
                <p className="text-3xl font-bold text-gray-900">2</p>
              </div>
              <div className="text-4xl">📅</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Trusted Vets</p>
                <p className="text-3xl font-bold text-gray-900">5</p>
              </div>
              <div className="text-4xl">🏥</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">New Messages</p>
                <p className="text-3xl font-bold text-gray-900">1</p>
              </div>
              <div className="text-4xl">💬</div>
            </div>
          </div>
        </div>

        {/* MAIN ACTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* FIND VET */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition">
            <MapPin size={40} className="mb-4" />
            <h3 className="text-2xl font-bold mb-2">Find a Vet</h3>
            <p className="text-blue-100 mb-4">
              Search for trusted veterinarians near you
            </p>
            <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg hover:bg-blue-50 transition">
              Search Vets
            </button>
          </div>

          {/* BOOK APPOINTMENT */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition">
            <Calendar size={40} className="mb-4" />
            <h3 className="text-2xl font-bold mb-2">Book Appointment</h3>
            <p className="text-green-100 mb-4">
              Schedule a checkup with your favorite vet
            </p>
            <button className="bg-white text-green-600 font-semibold px-6 py-2 rounded-lg hover:bg-green-50 transition">
              Book Now
            </button>
          </div>

          {/* CHAT WITH VET */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition">
            <MessageSquare size={40} className="mb-4" />
            <h3 className="text-2xl font-bold mb-2">Chat with Vet</h3>
            <p className="text-purple-100 mb-4">
              Get quick advice from your veterinarian
            </p>
            <button className="bg-white text-purple-600 font-semibold px-6 py-2 rounded-lg hover:bg-purple-50 transition">
              Chat Now
            </button>
          </div>
        </div>

        {/* UPCOMING APPOINTMENTS */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Appointments</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 border-l-4 border-red-600 bg-gray-50 rounded-lg">
              <div className="text-3xl">🏥</div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Annual Checkup with Dr. Sharma</h4>
                <p className="text-gray-600 text-sm">Max (Golden Retriever)</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">May 15, 2024</p>
                <p className="text-gray-600 text-sm">10:00 AM</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border-l-4 border-green-600 bg-gray-50 rounded-lg">
              <div className="text-3xl">💉</div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Vaccination with Dr. Patel</h4>
                <p className="text-gray-600 text-sm">Bella (Beagle)</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">May 20, 2024</p>
                <p className="text-gray-600 text-sm">2:30 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* YOUR PETS */}
        <div className="bg-white rounded-2xl shadow p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Pets</h2>
            <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition">
              <Plus size={20} />
              Add Pet
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Max", "Bella", "Charlie"].map((petName, index) => (
              <div key={index} className="border-2 border-gray-200 rounded-lg p-4 hover:border-red-600 transition">
                <img
                  src={`https://images.unsplash.com/photo-1633722715463-d30628cad4ae?w=300&h=300&fit=crop`}
                  alt={petName}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{petName}</h3>
                <p className="text-gray-600 text-sm mb-4">Golden Retriever • 3 years</p>
                <button className="w-full border-2 border-red-600 text-red-600 font-semibold py-2 rounded-lg hover:bg-red-50 transition">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PetOwnerDashboard;