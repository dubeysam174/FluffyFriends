import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import ActionCard from "./ActionCard";
import { MapPin, Calendar, MessageSquare, User, Stethoscope, Users } from "lucide-react";

const QuickActions = () => {
  const user = useSelector(selectUser);

  const actions = [
    {
      show: user.role === "petOwner",
      icon: MapPin,
      title: "Find Vet",
      description: "Search for nearby veterinarians",
      path: "/find-vet",
      color: "blue",
      emoji: "🏥",
    },
    {
      show: true,
      icon: Calendar,
      title: "Appointments",
      description: user.role === "petOwner" ? "View and book appointments" : "Manage your appointments",
      path: "/appointments",
      color: "green",
      emoji: "📅",
    },
    {
      show: true,
      icon: MessageSquare,
      title: "Chat",
      description: user.role === "petOwner" ? "Message with veterinarians" : "Chat with pet owners",
      path: "/chat",
      color: "purple",
      emoji: "💬",
    },
    {
      show: true,
      icon: User,
      title: "Profile",
      description: user.role === "petOwner" ? "Manage your profile & pets" : "Manage your profile",
      path: "/profile",
      color: "orange",
      emoji: "👤",
    },
    {
      show: user.role === "petOwner",
      icon: Stethoscope,
      title: "Pet Health",
      description: "Track your pet's health records",
      path: "/pet-health",
      color: "red",
      emoji: "💊",
    },
    {
      show: user.role === "vet",
      icon: Users,
      title: "My Patients",
      description: "View all your patients",
      path: "/my-patients",
      color: "indigo",
      emoji: "👥",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {actions
        .filter((action) => action.show)
        .map((action, index) => (
          <ActionCard key={index} {...action} />
        ))}
    </div>
  );
};

export default QuickActions;