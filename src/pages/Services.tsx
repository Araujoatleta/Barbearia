import { Link } from 'react-router-dom';
import { Clock, Scissors, Star } from 'lucide-react';

const Services = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">
        Our Premium <span className="text-[#c4a47c]">Services</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div key={service.id} className="card-luxury">
            <div className="relative">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-48 object-cover rounded-t-md"
              />
              <div className="absolute top-4 right-4 bg-[#c4a47c] text-white px-3 py-1 rounded-full">
                ${service.price}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{service.name}</h3>
              <p className="text-gray-400 mb-4">{service.description}</p>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-[#c4a47c]" />
                  <span>{service.duration} min</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-[#c4a47c]" />
                  <span>{service.points} points</span>
                </div>
              </div>
              <Link to="/appointments" className="btn-primary w-full text-center">
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const services = [
  {
    id: 1,
    name: "Executive Cut",
    description: "Premium haircut with hot towel service and scalp massage",
    price: 45,
    duration: 45,
    points: 45,
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    name: "Luxury Shave",
    description: "Traditional straight razor shave with premium products",
    price: 35,
    duration: 30,
    points: 35,
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 3,
    name: "Beard Sculpting",
    description: "Professional beard trimming and styling with shape design",
    price: 30,
    duration: 30,
    points: 30,
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 4,
    name: "VIP Package",
    description: "Haircut, shave, and facial treatment with premium service",
    price: 89,
    duration: 90,
    points: 100,
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 5,
    name: "Hair Color",
    description: "Professional hair coloring with premium products",
    price: 75,
    duration: 120,
    points: 75,
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 6,
    name: "Father & Son",
    description: "Special package for father and son haircuts",
    price: 75,
    duration: 60,
    points: 80,
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  }
];

export default Services;