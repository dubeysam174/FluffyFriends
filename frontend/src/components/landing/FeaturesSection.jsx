import React from "react";
import {
  MapPin,
  Calendar,
  MessageSquare,
  FileText,
  ArrowRight,
} from "lucide-react";
import FloatingPaws from "./FloatingPaws";

const FeatureSection = () => {
  const features = [
    {
      icon: MapPin,
      title: "Find Nearby Vets",
      description:
        "Discover trusted veterinarians in your area and find the right care for your pet.",
      info: "Nearby",
      button: "Find Vet",
    },
    {
      icon: Calendar,
      title: "Easy Appointments",
      description:
        "Book and manage your pet's appointments quickly and easily.",
      info: "Quick & Easy",
      button: "Book Now",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description:
        "Connect with experienced veterinarians and get quick advice for your pet.",
      info: "Available",
      button: "Chat Now",
    },
    {
      icon: FileText,
      title: "Pet Records",
      description:
        "Keep your pet's medical history, prescriptions and vaccinations organized.",
      info: "Secure",
      button: "View Records",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#fffafa] px-6 py-20">
      {/* Background paws */}
      <FloatingPaws />

      <div className=" z-10 mx-auto max-w-6xl">
        {/* Heading */}
 <div className="relative">


  <div className="relative h-36 md:h-40">
  <img
    src="/hero.png"
    alt="Dog"
    
      className="absolute bottom-[-105px] left-[20%] z-30 w-[200px]"
  />
</div>


  {/* ==============================
      COLORED SERVICE HEADER
  ============================== */}
  <div className="
    relative
    z-10
    bg-red-500
    px-6
    py-5
    text-center
  ">

    <p className="
      text-xs
      font-semibold
      text-white
      md:text-sm
    ">
      What We Offer
    </p>

    <h2 className="
      mt-1
      text-3xl
      font-extrabold
      text-white
      md:text-4xl
    ">
      Our Services
    </h2>

  </div>

</div>

        {/* Cards */}
        <div className="grid gap-x-14 mt-5 gap-y-14 md:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div key={index} className="group relative">
                {/* Icon */}
                <div
                  className="
                    absolute
                    -top-6
                    left-6
                    z-20
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-red-500
                    text-white
                    shadow-lg
                    ring-4
                    ring-[#fffafa]
                    transition-all
                    duration-300
                    group-hover:scale-110
                    group-hover:bg-red-600
                  "
                >
                  <Icon size={24} />
                </div>

                {/* Card */}
                <div
                  className="
                    min-h-[210px]
                    rounded-2xl
                    border
                    border-red-100
                    bg-white
                    px-7
                    pb-6
                    pt-10
                    shadow-sm
                    transition-all
                    duration-300
                    group-hover:-translate-y-2
                    group-hover:border-red-200
                    group-hover:shadow-xl
                  "
                >
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 max-w-lg text-sm leading-6 text-gray-500">
                    {feature.description}
                  </p>

                  {/* Bottom */}
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm font-semibold text-red-500">
                      {feature.info}
                    </span>

                    <button
                      className="
                        flex
                        items-center
                        gap-1.5
                        rounded-full
                        bg-red-500
                        px-4
                        py-2
                        text-xs
                        font-semibold
                        text-white
                        transition-all
                        duration-200
                        hover:bg-red-600
                        group-hover:gap-2.5
                      "
                    >
                      {feature.button}

                      <ArrowRight size={14} />
                    </button>
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