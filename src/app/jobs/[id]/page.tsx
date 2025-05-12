// c:\snapwork\src\app\jobs\[id]\page.tsx
'use client';

import { useEffect, useState }
from 'react';
import { useParams } from 'next/navigation'; // To get the [id] from the URL
import Link from 'next/link';
import { ArrowLeft, MapPin, DollarSign, Briefcase, CalendarDays } from 'lucide-react'; // Example icons

interface Job {
  _id: string;
  title: string;
  description: string;
  payRate: number;
  location: string;
  // Add other potential fields from your Job model if needed
  // e.g., companyName?: string;
  // jobType?: string; // e.g., Full-time, Part-time
  // postedDate?: string;
}

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params.id as string; // Get the job ID from the URL

  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [applicationStatus, setApplicationStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    if (jobId) {
      const fetchJobDetails = async () => {
        setIsLoading(true);
        setError(null);
        try {
          // Assuming your API endpoint to fetch a single job is /api/jobs/[id]
          const response = await fetch(`/api/jobs/${jobId}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch job details: ${response.statusText}`);
          }
          const data = await response.json();
          setJob(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
          setIsLoading(false);
        }
      };
      fetchJobDetails();
    }

    // Check login status
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    const storedUserId = localStorage.getItem('userId');
    setIsLoggedIn(loggedInStatus === 'true');
    setUserId(storedUserId);

  }, [jobId]); // Run when jobId changes or component mounts

  const handleApply = async () => {
    if (!userId || !jobId) return;
    setIsApplying(true);
    setApplicationStatus(null);
    try {
      const response = await fetch(`/api/jobs/${jobId}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicantId: userId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to submit application');
      setApplicationStatus({ message: data.message, type: 'success' });
    } catch (err: any) {
      setApplicationStatus({ message: err.message, type: 'error' });
    } finally {
      setIsApplying(false);
    }
  };

  if (isLoading) {
    return <p className="text-center text-gray-500 mt-20">Loading job details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-20">Error: {error}</p>;
  }

  if (!job) {
    return <p className="text-center text-gray-500 mt-20">Job not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-3xl">
        <Link href="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 group">
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to all jobs
        </Link>

        <div className="bg-white shadow-xl rounded-lg p-6 md:p-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">{job.title}</h1>
          {/* Optional: Add company name or job type here if available */}
          {/* <p className="text-lg text-indigo-600 mb-6">at SnapWork Inc. - Full-time</p> */}

          <div className="space-y-4 text-gray-700 mb-8">
            <p className="flex items-center"><MapPin size={18} className="mr-3 text-indigo-500" /> Location: {job.location}</p>
            <p className="flex items-center"><DollarSign size={18} className="mr-3 text-indigo-500" /> Pay Rate: Rs. {job.payRate.toFixed(2)}</p>
            {/* <p className="flex items-center"><CalendarDays size={18} className="mr-3 text-indigo-500" /> Posted: {new Date(job.postedDate).toLocaleDateString()}</p> */}
          </div>

          <h2 className="text-2xl font-semibold text-gray-700 mb-3">Job Description</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            {/* Using dangerouslySetInnerHTML can be risky if description contains malicious HTML.
                If description is plain text or markdown, consider a markdown parser.
                For now, assuming it's safe plain text or simple HTML. */}
            <p>{job.description}</p>
          </div>

          {isLoggedIn && (
            <div className="mt-10 text-center">
              {applicationStatus && (
                <p className={`mb-4 text-sm ${applicationStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {applicationStatus.message}
                </p>
              )}
              {applicationStatus?.type !== 'success' && ( // Only show button if not successfully applied
                <button
                  onClick={handleApply}
                  disabled={isApplying}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:bg-indigo-300"
                >
                  {isApplying ? 'Submitting...' : 'Apply Now'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}