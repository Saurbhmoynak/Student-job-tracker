import React from "react";

const FilterInfoTitle = ({ onFilter, onClear }) => {
  const statuses = ["Not Applied", "Applied", "Interview", "Rejected", "Offer"];

  const statusColors = {
    "Not Applied": "bg-gray-400",
    "Applied": "bg-blue-500",
    "Interview": "bg-yellow-500",
    "Rejected": "bg-red-500",
    "Offer": "bg-violet-500",
  };

  return (
    <div className="flex flex-wrap items-center justify-between mt-4 mb-2 gap-4">
      <div className="flex flex-wrap gap-3">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => onFilter(status.toLowerCase())}
            className={`text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md ${statusColors[status]} hover:opacity-90 transition`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterInfoTitle;
