import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import JobCard from "../components/cards/JobCard";
import JobModal from "../components/JobModal";
import EmptyCard from "../components/cards/EmptyCard";
import FilterInfoTitle from "../components/FilterInfoTitle";
import { DayPicker } from "react-day-picker";
import moment from "moment";
import img1 from "../assets/empty.svg";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedRange, setSelectedRange] = useState(undefined);

  const getAllJobs = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/list-job");
      if (response.data?.jobs) {
        setJobs(response.data.jobs);
        setFilterType("");
        setSelectedRange(undefined);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load jobs");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveJob = async (jobData) => {
    try {
      if (jobData._id) {
        await axiosInstance.put(`/update-job/${jobData._id}`, jobData);
        toast.success("Job updated successfully");
      } else {
        await axiosInstance.post("/create-job", jobData);
        toast.success("Job added successfully");
      }
      setShowModal(false);
      getAllJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save job");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      try {
        await axiosInstance.delete(`/delete-job/${id}`);
        toast.success("Job deleted");
        getAllJobs();
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to delete job");
        console.error(err);
      }
    }
  };

  const filterByStatus = async (status) => {
    try {
      const response = await axiosInstance.get("/jobs/filter", {
        params: { status },
      });
      if (response.data?.jobs) {
        setJobs(response.data.jobs);
        setFilterType(`Status: ${status}`);
        setSelectedRange(undefined); // clear date range
      } else {
        setJobs([]);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error filtering by status");
      console.error(err);
    }
  };

  const filterJobsByDate = async (range) => {
    console.log("Selected Range:", range);
    setSelectedRange(range);

    const startDate = range?.from ? moment(range.from).valueOf() : null;
    const endDate = range?.to ? moment(range.to).valueOf() : null;

    if (!startDate || !endDate) return;

    try {
      const response = await axiosInstance.get("/jobs/filter", {
        params: { startDate, endDate },
      });
      if (response.data?.jobs) {
        setJobs(response.data.jobs);
        setFilterType(
          `Date: ${moment(range.from).format("DD MMM")} - ${moment(
            range.to
          ).format("DD MMM")}`
        );
      } else {
        setJobs([]);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error filtering by date");
      console.error(err);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  return (
    <>
      <Navbar />

      <section className="relative text-center py-12 px-4 overflow-hidden bg-gradient-to-br from-blue-100 via-purple-50 to-yellow-500">
        {/* Decorative blur blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200 opacity-30 rounded-full filter blur-3xl animate-pulse -z-10"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-200 opacity-30 rounded-full filter blur-2xl animate-pulse -z-10"></div>

        <h2 className="text-3xl font-bold text-indigo-700 mb-4">
          Welcome 🚀
        </h2>
        <p className="text-gray-700 text-lg font-medium">
          🎯 Track your job applications with ease and land your dream job! 💼✨
        </p>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Mobile Date Picker */}
        <div className="block lg:hidden mb-6">
          <div className="bg-white border rounded-lg p-3 shadow-sm">
            <DayPicker
              captionLayout="dropdown-buttons"
              mode="range"
              selected={selectedRange}
              onSelect={filterJobsByDate}
              pageNavigation
            />
            {selectedRange?.from && selectedRange?.to && (
              <p className="text-sm text-gray-600 mt-2">
                Selected: {moment(selectedRange.from).format("DD MMM")} -{" "}
                {moment(selectedRange.to).format("DD MMM")}
              </p>
            )}
          </div>
        </div>

        {/* Filters + Add/Clear */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <FilterInfoTitle onFilter={filterByStatus} />

          <div className="flex gap-3">
            <button
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              onClick={getAllJobs}
            >
              Clear Filters
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => {
                setEditingJob(null);
                setShowModal(true);
              }}
            >
              + Add Job
            </button>
          </div>
        </div>

        {/* Filter Info Tag */}
        {filterType && (
          <div className="text-sm text-gray-600 mb-4">
            Showing results filtered by: <strong>{filterType}</strong>
          </div>
        )}

        {/* Main Grid + Desktop Date Picker */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Job Cards */}
          <div className="flex-1">
            {loading ? (
              <p className="text-center text-gray-500">Loading jobs...</p>
            ) : jobs.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <JobCard
                    key={job._id}
                    {...job}
                    onEdit={(jobData) => {
                      setEditingJob(jobData);
                      setShowModal(true);
                    }}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <EmptyCard imgSrc={img1} message="No jobs found." />
            )}
          </div>

          {/* Desktop Date Picker */}
          <div className="hidden lg:block w-[330px]">
            <div className="bg-white border justify-center rounded-lg p-3 shadow-sm">
              <DayPicker
                captionLayout="dropdown-buttons"
                mode="range"
                selected={selectedRange}
                onSelect={filterJobsByDate}
                pageNavigation
              />
              {selectedRange?.from && selectedRange?.to && (
                <p className="text-sm text-gray-600 mt-2">
                  Selected: {moment(selectedRange.from).format("DD MMM")} -{" "}
                  {moment(selectedRange.to).format("DD MMM")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <JobModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveJob}
        initialData={editingJob}
      />

      <ToastContainer />
    </>
  );
};

export default Home;
