import {
  Check,
  ArrowRight,
} from "lucide-react";
import FloatingPaws from "./FloatingPaws";

const tips = [
  "Provide a balanced and nutritious diet.",
  "Schedule regular veterinary checkups.",
  "Keep vaccinations up to date.",
  "Maintain proper grooming and hygiene.",
  "Ensure daily exercise and playtime.",
  "Recognize emergency warning signs early.",
];

export default function PetCareTips() {
  return (
<section className="relative py-24 bg-white overflow-hidden">
            <FloatingPaws/>
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Image */}

          <div className="flex justify-center">
  <div className="relative">
    <img
      src="/hero3.png"
      alt="Pet Care"
      className="
        h-[600px]
        w-[500px]
        rounded-full
        object-cover
        border-8
        border-white
        shadow-[0_20px_60px_rgba(0,0,0,0.15)]
      "
    />

    {/* Small floating badge */}
    <div className="absolute bottom-8 right-0 rounded-2xl backdrop-blur-xl bg-white/20 px-5 py-3 shadow-xl">
      <p className="text-sm font-semibold text-gray-900">
        ❤️ Trusted by 10k+ Pet Parents
      </p>
    </div>
  </div>
</div>

          {/* Right Content */}

          <div>
           
            <span className="inline-flex rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
              PET CARE TIPS
            </span>

            <h2 className="mt-6 text-5xl font-bold text-gray-900">
              Keep Your Pets
              <span className="text-red-600"> Healthy</span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Follow these simple tips to keep your furry companions healthy,
              active, and happy throughout every stage of their lives.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 gap-5">

              {tips.map((tip, index) => (

                <div
                  key={index}
                  className="flex items-start gap-3"
                >

                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
                    <Check
                      size={14}
                      className="text-red-600"
                    />
                  </div>

                  <p className="text-gray-700">
                    {tip}
                  </p>

                </div>

              ))}

            </div>

            <button
              className="
              mt-10
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-red-600
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:bg-red-700
              "
            >
              Explore More
              <ArrowRight size={18} />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}