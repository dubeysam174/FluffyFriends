import {
  UserRound,
  MapPin,
  CalendarCheck,
  HeartHandshake,
} from "lucide-react";

const steps = [
  { 
    step: "STEP 1", 
    title: "Create Account", 
    description: "Register yourself and create your pet's profile in just a minute.", 
    icon: UserRound, 
    active: true 
  },
  { 
    step: "STEP 2", 
    title: "Find Nearby Vet", 
    description: "Search trusted veterinarians based on your location.", 
    icon: MapPin, 
    active: true 
  },
  { 
    step: "STEP 3", 
    title: "Book Appointment", 
    description: "Choose a suitable date and time with instant confirmation.", 
    icon: CalendarCheck, 
    active: true 
  },
  { 
    step: "STEP 4", 
    title: "Get Expert Care", 
    description: "Visit the veterinarian and keep your pet records safely stored.", 
    icon: HeartHandshake, 
    active: false 
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-3">
        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="inline-flex rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
            HOW IT WORKS
          </span>
          <h2 className="mt-6 text-5xl font-bold text-gray-900">
            Booking Care <span className="text-red-600">Is Easy</span>
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-lg text-gray-600">
            Four simple steps to connect with trusted veterinarians and keep your furry friends healthy.
          </p>
        </div>

        {/* DESKTOP VERSION */}
        <div className="hidden lg:block relative overflow-hidden rounded-[36px] shadow-2xl">
         {/* Parent wrapper */}
<div className="h-[800px] w-full overflow-hidden rounded-2xl">
  <img 
    src="/dog.jpg" 
    alt="Veterinarian"
    className="w-full h-full object-cover"
  />
</div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/95 via-[#020617]/70 to-transparent"></div>

          {/* OVERLAY CONTENT */}
          <div className="absolute inset-0">
            <div className="w-[45%] h-full bg-black/30 backdrop-blur-md px-10 py-12">
              <div className="relative">
                {/* VERTICAL LINE */}
                <div className="absolute left-6 top-2 bottom-2 w-[2px] bg-white/20"></div>

                {/* STEPS */}
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div 
                      key={index} 
                      className="relative flex gap-6 pb-12 group hover:translate-x-2 transition"
                    >
                      {/* ICON CIRCLE */}
                      <div 
                        className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full transition ${
                          step.active 
                            ? "bg-red-600 text-white shadow-[0_0_30px_rgba(239,68,68,.45)]" 
                            : "bg-white/10 border border-white/20 text-white"
                        }`}
                      >
                        <Icon size={20} />
                      </div>

                      {/* TEXT CONTENT */}
                      <div>
                        <p className="text-xs uppercase tracking-[3px] text-red-400 font-semibold">
                          {step.step}
                        </p>
                        <h3 className="mt-2 text-2xl font-bold text-white group-hover:text-red-400 transition">
                          {step.title}
                        </h3>
                        <p className="mt-3 max-w-sm leading-7 text-gray-300">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {/* CTA BUTTON */}
                <button className="mt-3 inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 transition transform hover:scale-105">
                  Book Appointment
                  <CalendarCheck size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE VERSION */}
        <div className="lg:hidden overflow-hidden rounded-3xl border border-gray-200 shadow-xl">
          {/* IMAGE */}
          <img 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop" 
            alt="Veterinarian" 
            className="h-64 w-full object-cover"
          />

          {/* DARK SECTION */}
          <div className="bg-gray-900 p-4">
            {/* STEPS */}
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex gap-3 pb-8 last:pb-0">
                  {/* TIMELINE */}
                  <div className="flex flex-col items-center">
                    <div 
                      className={`flex h-12 w-12 items-center justify-center rounded-full transition ${
                        step.active 
                          ? "bg-red-600 text-white" 
                          : "bg-white/10 border border-white/20 text-white"
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                    {index !== steps.length - 1 && (
                      <div className="mt-2 h-16 w-[2px] bg-white/20"></div>
                    )}
                  </div>

                  {/* TEXT CONTENT */}
                  <div>
                    <p className="text-xs uppercase tracking-[3px] text-red-400 font-semibold">
                      {step.step}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-3 leading-7 text-gray-300">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* CTA BUTTON */}
            <button className="mt-1 w-full rounded-full bg-red-600 py-3 font-semibold text-white hover:bg-red-700 transition">
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}