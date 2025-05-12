// app/job-listings/page.js
import JobCard from '../../components/JobCard';

const dummyJobs = [
  { id: 1, title: 'Web Developer', location: 'Delhi', pay: '₹30,000', description: 'Build a website using React.js.' },
  { id: 2, title: 'Graphic Designer', location: 'Mumbai', pay: '₹25,000', description: 'Design marketing material for a campaign.' },
];

export default function JobListings() {
  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Available Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </main>
  );
}
