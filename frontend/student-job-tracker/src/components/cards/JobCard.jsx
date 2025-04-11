import React, { useState } from "react";
import moment from "moment";

const JobCard = ({ _id, company, role, status, appliedDate, link, onEdit, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const statusColors = {
    "Not Applied": "bg-gray-400",
    "Applied": "bg-blue-500",
    "Interview": "bg-yellow-500",
    "Rejected": "bg-red-500",
    "Offer": "bg-violet-500",
  };

  return (
    <div className="p-4 border rounded-xl shadow-sm hover:shadow-lg transition relative">
      <h2 className="text-xl font-bold">{role}</h2>
      <p className="text-[15px] mt-1 text-gray-600">{company}</p>

      <div className="flex items-center justify-between mt-3">
        <span className={`text-white text-sm font-medium px-3 py-1 rounded-full ${statusColors[status]}`}>
          {status}
        </span>
        <span className="text-sm font-medium text-gray-700">{moment(appliedDate).format("D/M/YYYY")}</span>
      </div>

      <a href={link} target="_blank" rel="noreferrer" className="text-blue-600 text-sm mt-4 block">
        View Application
      </a>

      <div className="flex justify-between items-center gap-3 mt-4">
        <button
          onClick={() => onEdit({ _id, company, role, status, appliedDate, link })}
          className="text-sm text-blue-600 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => setShowConfirm(true)}
          className="text-sm text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>

      {/* Confirm Delete Overlay */}
      {showConfirm && (
        <div className="absolute top-0 left-0 w-full h-full backdrop-blur-sm bg-white/20 flex items-center justify-center rounded-xl z-50">
          <div className="bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-xl text-center w-64 border border-white/30">
            <p className="mb-4 text-sm font-medium">Are you sure you want to delete this job?</p>
            <div className="flex justify-around">
              <button
                onClick={() => {
                  onDelete(_id);
                  setShowConfirm(false);
                }}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 text-black px-4 py-1 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCard;
