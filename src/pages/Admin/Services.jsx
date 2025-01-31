import React, { useState } from 'react';
import { Scissors, Clock, DollarSign, Star, Plus, Edit, Trash } from 'lucide-react';

const Services = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">
          Manage <span className="text-[#c4a47c]">Services</span>
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div key={service.id} className="card-luxury">
            <div className="relative mb-6">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <div className="absolute top-4 right-4 bg-[#c4a47c] text-white px-3 py-1 rounded-full">
                ${service.price}
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4">{service.name}</h3>
            <p className="text-gray-400 mb-6">{service.description}</p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-[#c4a47c]" />
                  <span>Duration</span>
                </div>
                <span>{service.duration} min</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-[#c4a47c]" />
                  <span>Points</span>
                </div>
                <span>{service.points} points</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button className="btn-secondary flex-1 flex items-center justify-center space-x-2">
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </button>
              <button className="btn-secondary flex-1 flex items-center justify-center space-x-2 bg-red-900/20 hover:bg-red-900/40 text-red-400 border-red-900">
                <Trash className="h-4 w-4" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="card-luxury w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Add New Service</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Service Name</label>
                <input
                  type="text"
                  className="input-luxury w-full"
                  placeholder="Enter service name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  className="input-luxury w-full h-24 resize-none"
                  placeholder="Enter service description"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Price ($)</label>
                  <input
                    type="number"
                    className="input-luxury w-full"
                    placeholder="Enter price"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Duration (min)</label>
                  <input
                    type="number"
                    className="input-luxury w-full"
                    placeholder="Enter duration"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Points Earned</label>
                <input
                  type="number"
                  className="input-luxury w-full"
                  placeholder="Enter points"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1">
                  Add Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const services = [
  {
    id: 1,
    name: "Executive Cut",
    description: "Premium haircut with hot towel service",
    price: 45,
    duration: 45,
    points: 45,
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    name: "Luxury Shave",
    description: "Traditional straight razor shave",
    price: 35,
    duration: 30,
    points: 35,
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 3,
    name: "Beard Sculpting",
    description: "Professional beard trimming and styling",
    price: 30,
    duration: 30,
    points: 30,
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  }
];

export default Services;