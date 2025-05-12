// c:\snapwork\src\app\api\jobs\route.ts
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect'; // Adjust path as per your project structure
import Job from '../../../models/Job'; // Adjust path as per your project structure

export async function GET() {
  try {
    await dbConnect();

    const jobs = await Job.find({}) // Fetch all jobs
      .sort({ createdAt: -1 }); // Optional: sort by newest first

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error('API Error fetching jobs:', error);
    return NextResponse.json(
      {
        message: 'Failed to fetch jobs from API',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// You might also have a POST function here if you allow creating jobs via /api/jobs