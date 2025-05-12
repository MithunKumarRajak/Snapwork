// c:\snapwork\src\app\page.tsx
"use client"; // Mark this as a Client Component

import Link from 'next/link'; // Import Link
import { useEffect, useState } from 'react';

// Define an interface for the Job data on the frontend
// This should match the structure of the data returned by your API
interface Job {
  _id: string;
  title: string;
  description: string;
  payRate: number;
  location: string;
  // Add any other fields you expect from the API
}

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/jobs'); // Your API endpoint
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        const data: Job[] = await response.json();
        setJobs(data);
      } catch (e: any) {
        console.error("Failed to fetch jobs:", e);
        setError(e.message || "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []); // Empty dependency array means this effect runs once on mount

  if (isLoading) {
    return <p className="text-center text-gray-500 mt-10">Loading jobs...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">Error loading jobs: {error}</p>;
  }

  if (jobs.length === 0) {
    return <p className="text-center text-gray-500 mt-10">No jobs found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          Available Jobs
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out">
              <div className="p-6">
                <Link href={`/jobs/${job._id}`} className="block text-2xl font-semibold text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-200">
                  {job.title}
                </Link>
                <p className="text-gray-600 mt-2 text-sm h-16 overflow-hidden line-clamp-3">{job.description}</p> {/* Truncate description */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-1"><strong>Location:</strong> {job.location}</p>
                  <p className="text-sm text-gray-500"><strong>Pay Rate:</strong> Rs. {job.payRate.toFixed(2)}</p> {/* Changed to Rs. */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}