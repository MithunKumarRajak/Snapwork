// c:\snapwork\src\app\api\profile\[userId]\saved-jobs\[jobId]\route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../../../lib/dbConnect'; // Adjusted path
import User from '../../../../../../models/User'; // Adjusted path
import mongoose from 'mongoose';

// Helper to simulate getting authenticated user ID (replace with real auth)
async function getAuthenticatedUserIdFromRequest(request: NextRequest): Promise<string | null> {
  // Placeholder
  const sessionUserId = request.headers.get('x-user-id');
  return sessionUserId;
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string; jobId: string } }
) {
  const { userId, jobId } = params;

  // **SECURITY NOTE:** Ensure userId from params matches authenticated user's ID.

  if (!userId || !mongoose.Types.ObjectId.isValid(userId) || !jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
    return NextResponse.json({ message: 'Invalid user ID or job ID' }, { status: 400 });
  }

  try {
    await dbConnect();

    // Remove jobId from the savedJobs array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { savedJobs: jobId } }, // $pull removes the item
      { new: true, select: 'savedJobs' }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Job unsaved successfully', savedJobs: updatedUser.savedJobs }, { status: 200 });
  } catch (error) {
    console.error('Error unsaving job:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}