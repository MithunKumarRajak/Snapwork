// c:\snapwork\src\app\api\jobs\[id]\apply\route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/dbConnect'; // Adjust path as needed
import Job from '../../../../../models/Job'; // Adjust path
import User from '../../../../../models/User'; // Adjust path
import Application from '../../../../../models/Application'; // Adjust path
import mongoose from 'mongoose';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } } // Changed to expect 'id'
) {
  const { id: jobId } = params; // Destructure 'id' and alias to 'jobId'

  // In a real app, applicantId would come from an authenticated session/token
  // For now, we'll expect it in the request body for simulation purposes.
  // This is NOT secure for production without proper server-side session management.
  const { applicantId } = await request.json();

  if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
    return NextResponse.json({ message: 'Invalid job ID' }, { status: 400 });
  }
  if (!applicantId || !mongoose.Types.ObjectId.isValid(applicantId)) {
    return NextResponse.json({ message: 'Invalid applicant ID' }, { status: 400 });
  }

  try {
    await dbConnect();

    // Check if the job exists
    const jobExists = await Job.findById(jobId);
    if (!jobExists) {
      return NextResponse.json({ message: 'Job not found' }, { status: 404 });
    }

    // Check if the applicant (user) exists
    const applicantExists = await User.findById(applicantId);
    if (!applicantExists) {
      return NextResponse.json({ message: 'Applicant profile not found' }, { status: 404 });
    }

    // Check if the user has already applied for this job (handled by unique index, but good to check)
    const existingApplication = await Application.findOne({ job: jobId, applicant: applicantId });
    if (existingApplication) {
      return NextResponse.json({ message: 'You have already applied for this job.' }, { status: 409 }); // 409 Conflict
    }

    // Create the new application
    const newApplication = new Application({
      job: jobId,
      applicant: applicantId,
      // status will default to 'Submitted'
    });

    await newApplication.save();

    return NextResponse.json({ message: 'Application submitted successfully!', application: newApplication }, { status: 201 });

  } catch (error: any) {
    console.error('Error submitting application:', error);
    if (error.code === 11000) { // MongoDB duplicate key error
        return NextResponse.json({ message: 'You have already applied for this job (duplicate).' }, { status: 409 });
    }
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
}