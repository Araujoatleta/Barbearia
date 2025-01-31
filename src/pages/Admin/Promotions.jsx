import React, { useState } from 'react';
import { Gift, Calendar, Percent, Plus, Edit, Trash } from 'lucide-react';

const Promotions = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">
          Manage <span className="text-[#c4a47c]">Promotions</span>
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Promotion</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {promotions.map((promotion) => (
          <div key={promotion.id} className="card-luxury">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-[#c4a47c] rounded-lg">
                <Gift className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{promotion.name}</h3>
                <p className="text-[#c4a47c]">{promotion.type}</p>
              </div>
            </div>

            <p className="text-gray-400 mb-6">{promotion.description}</p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Percent className="h-5 w-5 text-[#c4a47c]" />
                  <span>Discount</span>
                </div>
                <span>{promotion.discount}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-[#c4a47c]" />
                  <span>Valid Until</span>
                </div>
                <span>{promotion.validUntil}</span>
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

      {/* Add Promotion Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="card-luxury w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Add New Promotion</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Promotion Name</label>
                <input
                  type="text"
                  className="input-luxury w-full"
                  placeholder="Enter promotion name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  className="input-luxury w-full h-24 resize-none"
                  placeholder="Enter promotion description"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Discount Type</label>
                  <select className="input-luxury w-full">
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Discount Value</label>
                  <input
                    type="number"
                    className="input-luxury w-full"
                    placeholder="Enter value"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Start Date</label>
                  <input
                    type="date"
                    className="input-luxury w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">End Date</label>
                  <input
                    type="date"
                    className="input-luxury w-full"
                  />
                </div>
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
                  Add Promotion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const promotions = [
  {
    id: 1,
    name: "Summer Special",
    type: "Seasonal Offer",
    description: "Get 20% off on all premium services",
    discount: "20% OFF",
    validUntil: "Aug 31, 2024"
  },
  {
    id: 2,
    name: "First Time Client",
    type: "Welcome Offer",
    description: "15% discount on your first visit",
    discount: "15% OFF",
    validUntil: "Dec 31, 2024"
  },
  {
    id: 3,
    name: "VIP Package Deal",
    type: "Package Offer",
    description: "Book VIP package and get free beard trim",
    discount: "Free Service",
    validUntil: "Sep 30, 2024"
  }
];

export default Promotions;