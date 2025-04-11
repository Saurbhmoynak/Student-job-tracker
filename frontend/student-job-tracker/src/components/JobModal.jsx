import React, { useState, useEffect, useRef } from "react";
import moment from "moment";

const JobModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    _id: null,
    role: "",
    company: "",
    status: "Not Applied",
    appliedDate: "",
    link: "",
  });

  const firstInputRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        _id: initialData._id || null,
        role: initialData.role || "",
        company: initialData.company || "",
        link: initialData.link || "",
        appliedDate: initialData.appliedDate
          ? moment(initialData.appliedDate).format("YYYY-MM-DD")
          : "",
        status: initialData.status || "Not Applied",
      });
    } else {
      setFormData({
        _id: null,
        role: "",
        company: "",
        link: "",
        appliedDate: "",
        status: "Not Applied",
      });
    }
  }, [initialData]);

  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const { role, company, appliedDate, link } = formData;

    if (!role || !company || !appliedDate || !link) {
      return alert("All fields are required"); // toast removed, handled outside
    }

    const finalData = {
      ...formData,
      appliedDate: moment(formData.appliedDate).valueOf(), // Convert to timestamp
    };

    onSave(finalData); // delegate save logic to parent
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/20 w-full h-full backdrop-blur flex justify-center items-center z-50">
      <div className="backdrop-blur-md bg-white/100 border border-black/100 shadow-xl p-6 rounded-xl w-[350px]">
        <h2 className="text-xl font-semibold mb-4 text-center text-black">
          {formData._id ? "Edit Job" : "Add Job"}
        </h2>

        <input
          ref={firstInputRef}
          type="text"
          name="role"
          placeholder="Role"
          className="w-full border border-gray-300 px-3 py-2 rounded mb-2"
          value={formData.role}
          onChange={handleChange}
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          className="w-full border border-gray-300 px-3 py-2 rounded mb-2"
          value={formData.company}
          onChange={handleChange}
        />
        <input
          type="text"
          name="link"
          placeholder="Link"
          className="w-full border border-gray-300 px-3 py-2 rounded mb-2"
          value={formData.link}
          onChange={handleChange}
        />
        <input
          name="appliedDate"
          type="date"
          className="w-full border border-gray-300 px-3 py-2 rounded mb-2"
          value={formData.appliedDate}
          onChange={handleChange}
        />
        <select
          name="status"
          className="w-full border border-gray-300 px-3 py-2 rounded mb-4"
          value={formData.status}
          onChange={handleChange}
        >
          <option>Not Applied</option>
          <option>Applied</option>
          <option>Interview</option>
          <option>Rejected</option>
          <option>Offer</option>
        </select>

        <div className="flex justify-end gap-4">
          <button
            className="text-gray-600 px-4 py-1 rounded hover:underline"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            onClick={handleSubmit}
          >
            {formData._id ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobModal;
