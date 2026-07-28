import React from "react";
import {
  MapPin,
  Calendar,
  MessageSquare,
  FileText,
} from "lucide-react";
import FloatingPaws from "./FloatingPaws";

const FeatureSection = () => {
  const features = [
    {
      icon: MapPin,
      title: "Find Nearby Vets",
      description:
        "Discover trusted veterinarians in your area with real-time availability.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Calendar,
      title: "Easy Appointments",
      description:
        "Book and manage appointments seamlessly with instant confirmations.",
      color: "from-emerald-500 to-green-500",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description:
        "Connect instantly with experienced veterinarians for quick advice.",
      color: "from-violet-500 to-purple-500",
    },
    {
      icon: FileText,
      title: "Pet Records",
      description:
        "Securely store your pet's medical history, prescriptions and vaccinations.",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-orange-50 py-24 px-6">
         {/* FLOATING PAWS BACKGROUND */}
              <FloatingPaws />
      {/* Background Blobs */}
      {/* <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-red-300/30 blur-3xl "></div>

      <div className="absolute top-40 right-0 h-96 w-96 rounded-full bg-orange-300/30 blur-3xl  animation-delay-2000"></div>

      <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-pink-300/20 blur-3xl"></div> */}

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}

        <div className="mb-16 text-center">
          <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
            WHY CHOOSE US
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
            Everything Your Pet
            <span className="text-red-600"> Needs</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            FluffyFriends brings veterinary care, appointments, medical
            records, and instant chat together in one secure platform.
          </p>
        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div key={index} className="group relative">
                {/* Glass Card */}

                <div
                  className="
                    relative
                    h-full
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/40
                    bg-white/20
                    p-8
                    backdrop-blur-2xl
                    shadow-[0_8px_32px_rgba(31,38,135,0.15)]
                    transition-all
                    duration-500
                    hover:-translate-y-3
                    hover:shadow-[0_20px_45px_rgba(31,38,135,0.25)]
                  "
                >
                  {/* Glass Shine */}

                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/50 via-white/10 to-transparent"></div>

                  {/* Hover Gradient */}

                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} opacity-0 transition-all duration-500 group-hover:opacity-15`}
                  ></div>

                  {/* Content */}

                  <div className="relative z-10">
                    <div
                      className={`
                        mb-6
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        ${feature.color}
                        text-white
                        shadow-xl
                        transition-all
                        duration-500
                        group-hover:scale-110
                        group-hover:rotate-6
                      `}
                    >
                      <Icon size={30} />
                    </div>

                    <h3 className="mb-4 text-xl font-bold text-gray-900">
                      {feature.title}
                    </h3>

                    <p className="mb-6 leading-7 text-gray-600">
                      {feature.description}
                    </p>

                    <button className="flex items-center gap-2 font-semibold text-red-600 transition-all group-hover:gap-3">
                      Learn More

                      <svg
                        className="h-5 w-5 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9 5l7 7-7 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Shine Animation */}

                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    <div
                      className="
                        absolute
                        -left-full
                        top-0
                        h-full
                        w-1/2
                        rotate-12
                        bg-gradient-to-r
                        from-transparent
                        via-white/50
                        to-transparent
                        transition-all
                        duration-1000
                        group-hover:left-[150%]
                      "
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;