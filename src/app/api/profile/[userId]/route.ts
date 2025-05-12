// c:\snapwork\src\app\api\profile\[userId]\route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect'; // Adjust path
import User, { IUser } from '../../../../models/User'; // Adjust path
import mongoose from 'mongoose';

// Helper to get authenticated user ID (placeholder for real auth)
async function getAuthenticatedUserId(request: NextRequest): Promise<string | null> {
  // In a real app, you'd get this from a session, token, etc.
  // For now, we'll assume a header or rely on the [userId] for owned profiles.
  // This is NOT secure for production for PUT requests without proper checks.
  const sessionUserId = request.headers.get('x-user-id'); // Example: if you pass it in headers
  return sessionUserId;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
  }

  try {
    await dbConnect();
    // Exclude password when fetching profile
    const userProfile = await User.findById(userId).select('-password');

    if (!userProfile) {
      return NextResponse.json({ message: 'User profile not found' }, { status: 404 });
    }

    return NextResponse.json(userProfile, { status: 200 });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId: targetUserId } = params; // The ID of the profile to update

  // **SECURITY NOTE:** In a real application, you MUST verify that the
  // authenticated user has permission to update this profile.
  // For example, targetUserId should match the ID of the logged-in user.
  // const authenticatedUserId = await getAuthenticatedUserId(request);
  // if (!authenticatedUserId || authenticatedUserId !== targetUserId) {
  //   return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  // }

  if (!targetUserId || !mongoose.Types.ObjectId.isValid(targetUserId)) {
    return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
  }

  try {
    await dbConnect();
    const body = await request.json();

    // Fields that can be updated (exclude email, password, role for now from direct profile update)
    const { firstName, lastName, bio, skills, resumeUrl, companyName, profilePictureUrl } = body;

    const updatedProfile = await User.findByIdAndUpdate(
      targetUserId,
      { $set: { firstName, lastName, bio, skills, resumeUrl, companyName, profilePictureUrl } },
      { new: true, runValidators: true, select: '-password' } // Return updated doc, run schema validators
    );

    if (!updatedProfile) {
      return NextResponse.json({ message: 'User profile not found for update' }, { status: 404 });
    }

    return NextResponse.json(updatedProfile, { status: 200 });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}