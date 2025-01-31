import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Star, Award, Clock } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-cover bg-center" 
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80")' }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Experience <span className="text-[#c4a47c]">Luxury</span> Grooming
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Where style meets sophistication
          </p>
          <Link to="/appointments" className="btn-primary text-lg">
            Book Now
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[#1c1c1c]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-luxury text-center">
              <Scissors className="h-12 w-12 text-[#c4a47c] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Expert Stylists</h3>
              <p className="text-gray-400">
                Our master barbers bring years of experience and artistry to every cut
              </p>
            </div>
            <div className="card-luxury text-center">
              <Star className="h-12 w-12 text-[#c4a47c] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Premium Service</h3>
              <p className="text-gray-400">
                Enjoy complimentary beverages and a relaxing atmosphere
              </p>
            </div>
            <div className="card-luxury text-center">
              <Clock className="h-12 w-12 text-[#c4a47c] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
              <p className="text-gray-400">
                Book your appointment online anytime, anywhere
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-[#2c2c2c]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Our <span className="text-[#c4a47c]">Services</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="card-luxury">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-[#c4a47c] font-bold">${service.price}</span>
                  <Link to="/appointments" className="btn-secondary">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const services = [
  {
    id: 1,
    name: "Executive Cut",
    description: "Premium haircut with hot towel service",
    price: 45,
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    name: "Luxury Shave",
    description: "Traditional straight razor shave",
    price: 35,
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 3,
    name: "Beard Sculpting",
    description: "Professional beard trimming and styling",
    price: 30,
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  }
];

export default Home;