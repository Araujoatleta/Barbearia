-- Barbershop Management System Database Schema

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT CHECK(role IN ('client', 'barber', 'admin')) DEFAULT 'client',
  loyalty_level TEXT CHECK(loyalty_level IN ('bronze', 'silver', 'gold')) DEFAULT 'bronze',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Barbers table
CREATE TABLE IF NOT EXISTS barbers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  specialties TEXT,
  rating DECIMAL(3,2) DEFAULT 0,
  is_available BOOLEAN DEFAULT true,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  duration INTEGER NOT NULL, -- in minutes
  price DECIMAL(10,2) NOT NULL,
  points_earned INTEGER DEFAULT 0
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  barber_id INTEGER NOT NULL,
  service_id INTEGER NOT NULL,
  appointment_date DATETIME NOT NULL,
  status TEXT CHECK(status IN ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')) DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES users(id),
  FOREIGN KEY (barber_id) REFERENCES barbers(id),
  FOREIGN KEY (service_id) REFERENCES services(id)
);

-- Loyalty points table
CREATE TABLE IF NOT EXISTS loyalty_points (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  points INTEGER DEFAULT 0,
  transaction_type TEXT CHECK(transaction_type IN ('earned', 'spent')) NOT NULL,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sender_id INTEGER NOT NULL,
  receiver_id INTEGER,
  message TEXT NOT NULL,
  is_bot_message BOOLEAN DEFAULT false,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (receiver_id) REFERENCES users(id)
);

-- Feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  appointment_id INTEGER NOT NULL,
  rating INTEGER CHECK(rating BETWEEN 1 AND 5) NOT NULL,
  comment TEXT,
  is_anonymous BOOLEAN DEFAULT false,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (appointment_id) REFERENCES appointments(id)
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT CHECK(type IN ('appointment', 'points', 'promotion', 'system', 'chat')) NOT NULL,
  is_read BOOLEAN DEFAULT false,
  action_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Rewards table
CREATE TABLE IF NOT EXISTS rewards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  points_required INTEGER NOT NULL,
  reward_type TEXT CHECK(reward_type IN ('service', 'product', 'discount')) NOT NULL,
  discount_amount DECIMAL(5,2),
  service_id INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (service_id) REFERENCES services(id)
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category TEXT CHECK(category IN ('shampoo', 'conditioner', 'styling', 'beard', 'accessories')) NOT NULL,
  stock_quantity INTEGER DEFAULT 0,
  points_earned INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT CHECK(status IN ('pending', 'completed', 'cancelled')) DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  price_at_time DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Barber schedule table
CREATE TABLE IF NOT EXISTS barber_schedule (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  barber_id INTEGER NOT NULL,
  day_of_week INTEGER CHECK(day_of_week BETWEEN 0 AND 6) NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT true,
  FOREIGN KEY (barber_id) REFERENCES barbers(id)
);

-- Time slots table
CREATE TABLE IF NOT EXISTS time_slots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  barber_id INTEGER NOT NULL,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  is_available BOOLEAN DEFAULT true,
  FOREIGN KEY (barber_id) REFERENCES barbers(id)
);

-- Promotions table
CREATE TABLE IF NOT EXISTS promotions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  discount_type TEXT CHECK(discount_type IN ('percentage', 'fixed')) NOT NULL,
  discount_value DECIMAL(10,2) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  min_loyalty_level TEXT CHECK(min_loyalty_level IN ('bronze', 'silver', 'gold')),
  is_active BOOLEAN DEFAULT true
);

-- Service categories table
CREATE TABLE IF NOT EXISTS service_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT
);

-- Initial data insertion for service categories
INSERT INTO service_categories (name, description) VALUES
  ('Haircut', 'Premium haircut services'),
  ('Beard', 'Professional beard grooming'),
  ('Combo', 'Combined haircut and beard services'),
  ('Special', 'Luxury and VIP treatments');

-- Insert sample services
INSERT INTO services (name, description, duration, price, points_earned) VALUES
  ('Executive Cut', 'Premium haircut with hot towel service', 45, 45.00, 45),
  ('Luxury Shave', 'Traditional straight razor shave', 30, 35.00, 35),
  ('Beard Sculpting', 'Professional beard trimming and styling', 30, 30.00, 30),
  ('VIP Package', 'Haircut, shave, and facial treatment', 90, 89.00, 100),
  ('Hair Color', 'Professional hair coloring service', 120, 75.00, 75),
  ('Father & Son', 'Special package for father and son', 60, 75.00, 80);

-- Insert sample rewards
INSERT INTO rewards (name, description, points_required, reward_type) VALUES
  ('Free Executive Cut', 'Redeem for a complimentary executive haircut', 1000, 'service'),
  ('Luxury Shave Package', 'Free luxury shave experience', 1500, 'service'),
  ('VIP Treatment', 'Complete VIP treatment package', 2000, 'service'),
  ('Product Discount', '25% off any product purchase', 500, 'discount');

-- Insert admin user for testing
INSERT INTO users (name, email, password_hash, role) 
VALUES ('Admin User', 'admin@luxurycuts.com', '$2a$10$6Bnv6HT.Qz6L5GMScZhWB.3VlwR3SFoVz6.2vQEQGE9YVB.F0jQXi', 'admin');

-- Insert test client user
INSERT INTO users (name, email, password_hash, role) 
VALUES ('Test Client', 'client@test.com', '$2a$10$6Bnv6HT.Qz6L5GMScZhWB.3VlwR3SFoVz6.2vQEQGE9YVB.F0jQXi', 'client');
