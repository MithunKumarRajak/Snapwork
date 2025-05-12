// c:\snapwork\src\app\api\profile\[userId]\saved-jobs\route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/dbConnect';
import User from '../../../../../models/User';
import Job from '../../../../../models/Job'; // Needed for populating
import mongoose from 'mongoose';

// Helper to simulate getting authenticated user ID (replace with real auth)
async function getAuthenticatedUserIdFromRequest(request: NextRequest): Promise<string | null> {
  // In a real app, this comes from a session or token.
  // For now, let's assume a header or that the [userId] in path is validated elsewhere.
  // This is a placeholder and NOT secure for production.
  const sessionUserId = request.headers.get('x-user-id'); // Example
  return sessionUserId;
}

// GET saved jobs for a user
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  // **SECURITY NOTE:** Ensure the requesting user is authorized to view this list
  // (e.g., userId from params matches authenticated user's ID).

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
  }

  try {
    await dbConnect();
    const user = await User.findById(userId)
      .populate({
        path: 'savedJobs',
        model: Job, // Explicitly provide the model for population
        select: 'title description payRate location createdAt' // Select fields you want from Job
      })
      .select('savedJobs'); // Only select the savedJobs field from the user

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user.savedJobs || [], { status: 200 });
  } catch (error) {
    console.error('Error fetching saved jobs:', error);
    return NextResponse.json({ message: 'Internal server error', error: (error as Error).message }, { status: 500 });
  }
}

// POST to add a job to saved jobs
export async function POST(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const { jobId } = await request.json();

  // **SECURITY NOTE:** Ensure userId from params matches authenticated user's ID.

  if (!userId || !mongoose.Types.ObjectId.isValid(userId) || !jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
    return NextResponse.json({ message: 'Invalid user ID or job ID' }, { status: 400 });
  }

  try {
    await dbConnect();
    // Add jobId to the savedJobs array if it's not already present
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { savedJobs: jobId } }, // $addToSet prevents duplicates
      { new: true, select: 'savedJobs' } // Return the updated document, only savedJobs
    ).populate({ path: 'savedJobs', model: Job, select: 'title' }); // Optionally populate for response

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Job saved successfully', savedJobs: updatedUser.savedJobs }, { status: 200 });
  } catch (error) {
    console.error('Error saving job:', error);
    return NextResponse.json({ message: 'Internal server error', error: (error as Error).message }, { status: 500 });
  }
}