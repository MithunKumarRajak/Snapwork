// c:\snapwork\src\models\User.js
import mongoose from 'mongoose';
import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
export interface IUser extends Document {
  email: {
    type: String,
    required: [true, 'Please provide an email.'],
Unchanged lines
    required: [true, 'Please provide a password.'],
    minlength: 6,
    select: false, // Important: don't return password by default
  },
  // We added these during signup page creation
  firstName: {
    type: String,
    // required: [true, 'Please provide a first name.'] // Make required if it was intended
    required: [true, 'Please provide a first name.']
  },
  lastName: {
    type: String,
    // required: [true, 'Please provide a last name.']
    required: [true, 'Please provide a last name.']
  },
  role: {
    type: String,
    enum: ['Job Seeker', 'Employer', 'Admin'], // Example roles
    default: 'Job Seeker',
  },
  bio: {
    type: String,
    maxlength: 500,
    default: '',
  },
  skills: { // Primarily for Job Seekers
    type: [String],
    default: [],
  },
  resumeUrl: { // Primarily for Job Seekers
    type: String,
    default: '',
  },
  companyName: { // Primarily for Employers
    type: String,
    default: '',
  },
  profilePictureUrl: {
    type: String,
    default: '', // You might want a default placeholder image URL
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
  // Methods
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email.'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: 6,
    select: false,
  },
    password: string; // Will be selected: false in schema

  firstName: {
    type: String,
    required: [true, 'Please provide a first name.']
  },
  lastName: {
    type: String,
    required: [true, 'Please provide a last name.']
  },
  role: {
    type: String,
    enum: ['Job Seeker', 'Employer', 'Admin'],
    default: 'Job Seeker',
  },
  bio: { type: String, maxlength: 500, default: '' },
  skills: { type: [String], default: [] },
  resumeUrl: { type: String, default: '' },
  companyName: { type: String, default: '' },
  profilePictureUrl: { type: String, default: '' },
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Password hashing middleware
UserSchema.pre('save', async function (next) {
Unchanged lines
  next();
});

// Method to compare password
UserSchema.methods.matchPassword = async function (enteredPassword) {
// Method to compare password (ensure 'this' context is correct, might need to be a regular function if 'this' is IUser)
UserSchema.methods.matchPassword = async function (this: IUser, enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default mongoose.models.User || mongoose.model('User', UserSchema);
export default User;