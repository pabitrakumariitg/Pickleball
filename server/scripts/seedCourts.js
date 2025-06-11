const mongoose = require('mongoose');
const Court = require('../models/court.model');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a default business ID (you'll need to replace this with a real business ID)
const defaultBusinessId = new mongoose.Types.ObjectId();

const courts = [
  {
    name: "Akim Astro Turf",
    description: "High-quality turf pickleball court in the heart of Kohima, perfect for all skill levels.",
    location: "M4V4+F9, Kohima, Nagaland 797001",
    price: 28000,
    memberPrice: 18000,
    image: "/court1.jpg",
    type: "indoor",
    surface: "synthetic",
    capacity: 4,
    business: defaultBusinessId,
    openingTime: new Date().setHours(9, 0, 0, 0),
    closingTime: new Date().setHours(21, 0, 0, 0),
    amenities: ["parking", "showers", "equipment_rental", "wifi"],
    status: "active",
    city: "Kohima"
  },
  {
    name: "Aiko Greens",
    description: "Beautiful outdoor pickleball court with green surroundings and modern facilities.",
    location: "Purana Bazar, Dimapur, Nagaland 797112, India",
    price: 22000,
    memberPrice: 14000,
    image: "/court2.jpg",
    type: "outdoor",
    surface: "concrete",
    capacity: 4,
    business: defaultBusinessId,
    openingTime: new Date().setHours(9, 0, 0, 0),
    closingTime: new Date().setHours(21, 0, 0, 0),
    amenities: ["parking", "showers", "equipment_rental"],
    status: "active",
    city: "Dimapur"
  },
  {
    name: "Niathu Resort",
    description: "Luxury resort court offering top-notch indoor pickleball experience.",
    location: "Chumukedima, 7th Mile, Dimapur, Nagaland 797103",
    price: 25000,
    memberPrice: 15000,
    image: "/court3.jpg",
    type: "indoor",
    surface: "wood",
    capacity: 4,
    business: defaultBusinessId,
    openingTime: new Date().setHours(9, 0, 0, 0),
    closingTime: new Date().setHours(21, 0, 0, 0),
    amenities: ["parking", "showers", "equipment_rental", "cafe"],
    status: "active",
    city: "Dimapur"
  },
  {
    name: "Noune Resort",
    description: "Scenic outdoor pickleball court located inside Noune Resort, surrounded by nature.",
    location: "Seithekiema-A Village, Seithekima-A, Dimapur, Nagaland 797103",
    price: 23000,
    memberPrice: 13000,
    image: "/court4.jpg",
    type: "outdoor",
    surface: "concrete",
    capacity: 4,
    business: defaultBusinessId,
    openingTime: new Date().setHours(8, 0, 0, 0),
    closingTime: new Date().setHours(20, 0, 0, 0),
    amenities: ["parking", "showers", "equipment_rental", "cafe"],
    status: "active",
    city: "Dimapur"
  }
];

const seedCourts = async () => {
  try {
    // Clear existing courts
    await Court.deleteMany({});
    
    // Insert new courts
    const createdCourts = await Court.insertMany(courts);
    
    console.log('Courts seeded successfully!');
    console.log('Created courts with IDs:');
    createdCourts.forEach(court => {
      console.log(`${court.name}: ${court._id}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding courts:', error);
    process.exit(1);
  }
};

seedCourts();