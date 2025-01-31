import React, { useState } from 'react';
import { User, Star, Calendar, Clock, Plus, Edit, Trash } from 'lucide-react';

const Barbers = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">
          Manage <span className="text-[#c4a47c]">Barbers</span>
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Barber</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {barbers.map((barber) => (
          <div key={barber.id} className="card-luxury">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-[#3c3c3c] rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-[#c4a47c]" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{barber.name}</h3>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-[#c4a47c] fill-current" />
                  <span>{barber.rating}</span>
                  <span className="text-gray-400">({barber.reviews} reviews)</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-[#c4a47c]" />
                  <span>Experience</span>
                </div>
                <span>{barber.experience} years</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-[#c4a47c]" />
                  <span>Availability</span>
                </div>
                <span>{barber.availability}</span>
              </div>
            </div>

            <div className="border-t border-[#3c3c3c] pt-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">Specialties:</p>
                <div className="flex space-x-2">
                  {barber.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[#1c1c1c] rounded-full text-xs"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
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

      {/* Add Barber Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="card-luxury w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Add New Barber</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="input-luxury w-full"
                  placeholder="Enter barber's name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Experience (years)</label>
                <input
                  type="number"
                  className="input-luxury w-full"
                  placeholder="Years of experience"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Specialties</label>
                <input
                  type="text"
                  className="input-luxury w-full"
                  placeholder="Enter specialties (comma separated)"
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
                  Add Barber
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const barbers = [
  {
    id: 1,
    name: "John Smith",
    rating: 4.8,
    reviews: 156,
    experience: 8,
    availability: "Mon-Fri",
    specialties: ["Fades", "Beard"]
  },
  {
    id: 2,
    name: "Michael Johnson",
    rating: 4.9,
    reviews: 203,
    experience: 12,
    availability: "Tue-Sat",
    specialties: ["Classic", "Color"]
  },
  {
    id: 3,
    name: "David Williams",
    rating: 4.7,
    reviews: 128,
    experience: 6,
    availability: "Wed-Sun",
    specialties: ["Modern", "Styling"]
  }
];

export default Barbers;