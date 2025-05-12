// c:\snapwork\src\models\Application.ts
import mongoose, { Document, Schema, Model, Types } from 'mongoose';

export interface IApplication extends Document {
  job: Types.ObjectId; // Reference to the Job
  applicant: Types.ObjectId; // Reference to the User (applicant)
  applicationDate: Date;
  status: 'Submitted' | 'Viewed' | 'Interviewing' | 'Offered' | 'Rejected' | 'Withdrawn';
  // Optional: coverLetter?: string;
  // Optional: resumeUrlAtTimeOfApplication?: string; // If user's profile resume might change
}

const ApplicationSchema: Schema<IApplication> = new Schema({
  job: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  applicant: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  applicationDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Submitted', 'Viewed', 'Interviewing', 'Offered', 'Rejected', 'Withdrawn'],
    default: 'Submitted',
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

// Ensure the combination of job and applicant is unique to prevent multiple applications
ApplicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

const Application: Model<IApplication> = mongoose.models.Application || mongoose.model<IApplication>('Application', ApplicationSchema);

export default Application;