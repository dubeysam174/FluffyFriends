import {
  Stethoscope,
  Scissors,
  Home,
  ShieldPlus,
  Ambulance,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import FloatingPaws from "./FloatingPaws";

const services = [
  {
    id: 1,
    title: "Veterinary Care",
    description:
      "24/7 consultations, health checkups, surgery and expert medical care.",
    icon: Stethoscope,
    className: "lg:col-span-4",
    gradient: "from-red-500 via-rose-500 to-orange-500",
  },
 
  {
    id: 2,
    title: "Vaccinations",
    description: "Protect your pet with timely vaccinations.",
    icon: ShieldPlus,
    className: "lg:col-span-2",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: 3,
    title: "Emergency Care",
    description: "Immediate medical support whenever your pet needs it.",
    icon: Ambulance,
    className: "lg:col-span-2",
    gradient: "from-orange-500 to-red-500",
  },
  
];

export default function ServicesSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-red-50/40 to-white">
      {/* FLOATING PAWS BACKGROUND */}
           <FloatingPaws />
      {/* Background Blur */}
      {/* <div className="absolute -top-40 -left-32 w-96 h-96 bg-red-300/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-orange-300/20 blur-3xl rounded-full"></div> */}

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Heading */}

        <div className="text-center mb-16">

          <span className="px-4 py-2 rounded-full bg-red-100 text-red-600 font-semibold">
            OUR SERVICES
          </span>

          <h2 className="mt-5 text-5xl font-extrabold text-gray-900">
            Everything Your Pet
            <span className="text-red-600"> Needs</span>
          </h2>

          <p className="mt-5 text-gray-600 max-w-2xl mx-auto text-lg">
            Comprehensive pet healthcare, grooming, boarding and emergency
            services — all in one place.
          </p>
        </div>

        {/* Bento Grid */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[260px] gap-6">

          {services.map((service) => {

            const Icon = service.icon;

            return (
              <div
               className={`
group
float-card
gradient-border
relative
overflow-hidden
rounded-3xl
border
border-white/40
bg-white/20
backdrop-blur-xl
shadow-[0_15px_40px_rgba(0,0,0,0.08)]
hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)]
transition-all
duration-500
${service.className}
`}
              >
                <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-white/30 blur-3xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                {/* Gradient Circle */}

                <div
                  className={`absolute -right-10 -top-10 h-44 w-44 rounded-full bg-gradient-to-br ${service.gradient} opacity-20 blur-2xl group-hover:scale-125 transition duration-700`}
                />

                {/* Icon */}

                <div
                  className={`m-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} text-white shadow-lg`}
                >
                  <Icon size={30} />
                </div>

                {/* Content */}

                <div className="px-6 pb-6">

                  <h3 className="text-2xl font-bold text-gray-900">
                    {service.title}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-600">
                    {service.description}
                  </p>

                  <button className="mt-8 inline-flex items-center gap-2 font-semibold text-red-600 group-hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight size={18} />
                  </button>

                </div>

                {/* Glass Reflection */}

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                  <div className="absolute -left-40 top-0 h-full w-32 rotate-12 bg-white/30 blur-xl group-hover:left-[120%] transition-all duration-1000"></div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}