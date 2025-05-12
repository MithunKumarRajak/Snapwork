// src/components/JobCard.js
const JobCard = ({ job }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
      <p className="text-gray-600 mb-4 text-sm">{job.description}</p>
      <div className="mb-4">
        <p className="text-gray-700">
          <span className="font-medium">Pay:</span> {job.pay} {/* Assuming job.pay from dummy data, or job.payRate if that's the correct prop */}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Location:</span> {job.location}
        </p>
      </div>
      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
        Apply
      </button>
    </div>
  );
};

export default JobCard;
