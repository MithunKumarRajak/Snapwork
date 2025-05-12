const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Configure dotenv to load variables from .env.local at the project root
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// --- IMPORTANT: Adjust the path to your Job model ---
// This path assumes your 'scripts' folder is at the root of 'c:\snapwork'
// and your models are in 'c:\snapwork\src\models'
const Job = require('../src/models/Job').default; // .default is often needed for ES6 modules imported in CommonJS

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in .env.local. Make sure the path in dotenv.config is correct.');
  process.exit(1);
}

// Generate a placeholder ObjectId for userId.
// In a real scenario, you might fetch an actual user's ID or have a predefined test user ID.
const placeholderUserId = new mongoose.Types.ObjectId();

const sampleJobs = [
  {
    title: 'Senior Frontend Developer',
    description: 'Join our innovative team to build cutting-edge user interfaces with React and Next.js. Strong experience with TypeScript required.',
    payRate: 75, // Assuming hourly
    location: 'Remote (US)',
    userId: placeholderUserId,
  },
  {
    title: 'Backend Engineer (Node.js)',
    description: 'Develop robust and scalable backend services using Node.js, Express, and MongoDB. Experience with microservices is a plus.',
    payRate: 80,
    location: 'New York, NY',
    userId: placeholderUserId,
  },
  {
    title: 'Full Stack Developer',
    description: 'Looking for a versatile developer proficient in both frontend (React/Vue) and backend (Node.js/Python) technologies.',
    payRate: 70,
    location: 'San Francisco, CA',
    userId: placeholderUserId,
  },
  {
    title: 'UX/UI Designer',
    description: 'Create intuitive and visually appealing designs for web and mobile applications. Proficiency in Figma or Sketch is essential.',
    payRate: 65,
    location: 'Remote',
    userId: placeholderUserId,
  },
  {
    title: 'DevOps Engineer',
    description: 'Manage and automate our CI/CD pipelines, cloud infrastructure (AWS/Azure), and ensure system reliability and performance.',
    payRate: 85,
    location: 'Austin, TX',
    userId: placeholderUserId,
  },
  // Add as many job objects as you like here!
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected for seeding...');

    // Optional: Clear existing jobs before seeding
    // await Job.deleteMany({});
    // console.log('Existing jobs cleared.');

    await Job.insertMany(sampleJobs);
    console.log(`${sampleJobs.length} jobs have been added to the database!`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
    process.exit();
  }
};

seedDB();