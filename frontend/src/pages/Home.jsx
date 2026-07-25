import hero from "../assets/login.jpg";

const Home = () => {
  return (
    <div>

      {/* Hero Section */}
      <section
        className="relative min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${hero})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/45"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">
          <h1 className="text-6xl md:text-7xl font-bold text-white">
            Caring for Pets,
            <br />
            Like Family ❤️
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-gray-200">
            Book appointments with experienced veterinarians, manage your
            pet's health records and receive quality healthcare from
            trusted professionals.
          </p>

          <div className="mt-10 flex gap-5">
            <button className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl text-white font-semibold transition">
              Book Appointment
            </button>

            <button className="border border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-black transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-16">
            Why Choose FluffyFriends?
          </h2>

          <div className="grid md:grid-cols-4 gap-8">

            <div className="bg-gray-100 rounded-2xl p-8 text-center shadow">
              🐶
              <h3 className="text-xl font-semibold mt-4">
                Trusted Vets
              </h3>

              <p className="mt-3 text-gray-600">
                Verified veterinarians ready to help your pets.
              </p>
            </div>

            <div className="bg-gray-100 rounded-2xl p-8 text-center shadow">
              📅
              <h3 className="text-xl font-semibold mt-4">
                Easy Booking
              </h3>

              <p className="mt-3 text-gray-600">
                Schedule appointments in just a few clicks.
              </p>
            </div>

            <div className="bg-gray-100 rounded-2xl p-8 text-center shadow">
              💬
              <h3 className="text-xl font-semibold mt-4">
                Live Chat
              </h3>

              <p className="mt-3 text-gray-600">
                Talk directly with your veterinarian anytime.
              </p>
            </div>

            <div className="bg-gray-100 rounded-2xl p-8 text-center shadow">
              ❤️
              <h3 className="text-xl font-semibold mt-4">
                Pet Records
              </h3>

              <p className="mt-3 text-gray-600">
                Store vaccinations and medical history securely.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-gray-50">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-16">
            Our Services
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold">
                General Checkup
              </h3>

              <p className="mt-4 text-gray-600">
                Regular health checkups to keep your pets healthy.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold">
                Emergency Care
              </h3>

              <p className="mt-4 text-gray-600">
                Immediate medical support during emergencies.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold">
                Vaccination
              </h3>

              <p className="mt-4 text-gray-600">
                Complete vaccination plans for every pet.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* Stats */}
      <section className="py-24 bg-red-600 text-white">

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">

          <div>
            <h2 className="text-5xl font-bold">10K+</h2>
            <p className="mt-3">Happy Pets</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">500+</h2>
            <p className="mt-3">Veterinarians</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">24/7</h2>
            <p className="mt-3">Support</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">99%</h2>
            <p className="mt-3">Customer Satisfaction</p>
          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="py-28 bg-black text-white">

        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-5xl font-bold">
            Your Pet Deserves the Best Care
          </h2>

          <p className="mt-6 text-gray-300">
            Join thousands of pet owners using FluffyFriends every day.
          </p>

          <button className="mt-10 bg-red-600 px-8 py-4 rounded-xl hover:bg-red-700 transition">
            Get Started
          </button>

        </div>

      </section>

    </div>
  );
};

export default Home;