// c:\snapwork\src\models\Job.ts
import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IJob extends Document {
  title: string;
  description: string;
  payRate: number;
  location: string;
  // userId?: mongoose.Schema.Types.ObjectId; // Optional: if you link jobs to users
  createdAt?: Date;
  updatedAt?: Date;
}

const JobSchema: Schema<IJob> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for the job.'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description for the job.'],
    },
    payRate: {
      type: Number,
      required: [true, 'Please provide a pay rate for the job.'],
    },
    location: {
      type: String,
      required: [true, 'Please provide a location for the job.'],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps automatically
  }
);

// Prevent model recompilation in Next.js dev environment
const Job: Model<IJob> = mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema);

export default Job;