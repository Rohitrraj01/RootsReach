/**
 * MongoDB Initialization Script
 * This script creates initial data for the application
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI_LOCAL || 'mongodb://localhost:27017/artisan_management');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

// Create admin user
const createAdminUser = async () => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@rootsreach.com' });
    
    if (adminExists) {
      console.log('Admin user already exists');
      return;
    }
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = new User({
      name: 'Admin User',
      email: 'admin@rootsreach.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
      isEmailVerified: true,
      isPhoneVerified: true,
      phone: '+1234567890'
    });
    
    await admin.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error(`Error creating admin user: ${error.message}`);
  }
};

// Create test users for each role
const createTestUsers = async () => {
  try {
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    // Create artisan user
    const artisanExists = await User.findOne({ email: 'artisan@rootsreach.com' });
    
    if (!artisanExists) {
      const artisan = new User({
        name: 'Test Artisan',
        email: 'artisan@rootsreach.com',
        password: hashedPassword,
        role: 'artisan',
        isActive: true,
        isEmailVerified: true,
        isPhoneVerified: true,
        phone: '+1234567891',
        skills: ['Pottery', 'Weaving'],
        location: {
          city: 'Jaipur',
          state: 'Rajasthan',
          country: 'India'
        }
      });
      
      await artisan.save();
      console.log('Artisan user created successfully');
    }
    
    // Create distributor user
    const distributorExists = await User.findOne({ email: 'distributor@rootsreach.com' });
    
    if (!distributorExists) {
      const distributor = new User({
        name: 'Test Distributor',
        email: 'distributor@rootsreach.com',
        password: hashedPassword,
        role: 'distributor',
        isActive: true,
        isEmailVerified: true,
        isPhoneVerified: true,
        phone: '+1234567892',
        businessName: 'Test Distribution Co.',
        businessType: 'Retail'
      });
      
      await distributor.save();
      console.log('Distributor user created successfully');
    }
    
    // Create buyer user
    const buyerExists = await User.findOne({ email: 'buyer@rootsreach.com' });
    
    if (!buyerExists) {
      const buyer = new User({
        name: 'Test Buyer',
        email: 'buyer@rootsreach.com',
        password: hashedPassword,
        role: 'buyer',
        isActive: true,
        isEmailVerified: true,
        isPhoneVerified: true,
        phone: '+1234567893'
      });
      
      await buyer.save();
      console.log('Buyer user created successfully');
    }
  } catch (error) {
    console.error(`Error creating test users: ${error.message}`);
  }
};

// Main function
const initializeDB = async () => {
  const conn = await connectDB();
  
  // Create initial data
  await createAdminUser();
  await createTestUsers();
  
  // Close connection
  await mongoose.connection.close();
  console.log('Database initialization completed');
};

// Run the script
initializeDB();