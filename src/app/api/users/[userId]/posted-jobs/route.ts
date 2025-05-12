// c:\snapwork\src\app\api\users\[userId]\posted-jobs\route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/dbConnect'; // Adjust path
import Job from '../../../../../models/Job'; // Adjust path
// import User from '../../../../../models/User'; // User model no longer strictly needed here if not checking employer existence
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  // **SECURITY NOTE:** In a real app, you'd verify that the currently
  // authenticated user is indeed this userId or has admin rights.

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
  }

  try {
    await dbConnect();

    // Fetch jobs posted by the given userId.
    // If the user doesn't exist or has no jobs, this will correctly return an empty array.
    const jobs = await Job.find({ postedBy: userId }).sort({ createdAt: -1 });

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error(`Error fetching jobs for user ${userId}:`, error);
    return NextResponse.json({ message: 'Internal server error', error: (error as Error).message }, { status: 500 });
  }
}