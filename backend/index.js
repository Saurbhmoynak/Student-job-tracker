require("dotenv").config();
const mongoose = require("mongoose");

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;
const Job = require("./models/job.model");
app.use(cors({
  origin: 'https://student-job-tracker-ten-navy.vercel.app', // or whatever your frontend URL is
  credentials: true
}));

app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});

// Create new job
app.post("/create-job", async (req, res) => {
  const { company, role, status, appliedDate, link } = req.body;

  if (!company || !role || !status || !appliedDate || !link) {
    return res.status(400).json({
      error: true,
      message: "All fields are required",
    });
  }

  const parsedAppliedDate = new Date(parseInt(appliedDate));

  try {

    // 🔍 Check for existing job
    const existingJob = await Job.findOne({
      company: company.trim(),
      role: role.trim(),
      appliedDate: parsedAppliedDate,
    });

    if (existingJob) {
      return res.status(409).json({
        error: true,
        message: "Job already exists",
      });
    }

    const newJob = new Job({
      company,
      role,
      status,
      appliedDate: parsedAppliedDate,
      link,
    });

    await newJob.save();

    return res.status(201).json({
      error: false,
      job: newJob,
      message: "New job is created successfully",
    });
  } catch (error) {
    console.error("Error in creating new job", error);
    return res.status(400).json({
      error: true,
      message: error.message,
    });
  }
});

app.get("/list-job", async(req, res) => {
  try {
    const allJobs = await Job.find().sort({ createdAt: -1 });

    return res.status(200).json({
      error: false,
      jobs: allJobs,
      message: "All jobs retrieved successfully",
    });
  } catch (error) {
    console.error("Error in fetching jobs", error);
    res.status(500).json({
      error: true,
      message: "Failed to fetch jobs",
    });
  }
});

app.put("/update-job/:id", async(req, res) => {
  const { id } = req.params;
  const { company, role, status, appliedDate, link } = req.body;

  if (!company || !role || !status || !appliedDate || !link) {
    return res.status(400).json({
      error: true,
      message: "All fields are required",
    });
  }

  const parsedDate = new Date(parseInt(appliedDate));

  try {
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { company, role, status, appliedDate: parsedDate, link },
      {new:true}
    );

    if (!updatedJob) {
      return res.status(400).json({ error: true, message: "Job not found" });
    }

    res.status(200).json({
      error: false,
      job: updatedJob,
      message: "Job updated successfully",
    });
  } catch (error) {
    console.error("Error in updating job", error);
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
});

app.delete("/delete-job/:id", async(req, res) => {
  const { id } = req.params;
  try {
    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return res.status(400).json({ error: true, message: "Job not found" });
    }

    res.status(200).json({
      error: false,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Failed to delete job",
    });
  }
});

app.patch("/update-job-status/:id", async(req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      error: true,
      message: "Status field is required",
    });
  }

  try {
    
    const updatedJobStatus = await Job.findOneAndUpdate(
      { _id: id },
      { status },
      { new: true } // return the updated document
    );

    if (!updatedJobStatus) {
      return res.status(404).json({
        error: true,
        message: "Job not found",
      });
    }

    res.status(200).json({
      error: false,
      job: updatedJobStatus,
      message:"Job status updated successfully",
    })
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Failed to update job status",
    });
  }
});

app.get("/jobs/filter", async (req, res) => {
  const { status, startDate, endDate } = req.query;

  const filter = {};

  if (status) {
    filter.status = { $regex: new RegExp(`^${status}$`, "i") };
  }

  if (startDate && endDate) {
    filter.appliedDate = {
      $gte: new Date(parseInt(startDate)),
      $lte: new Date(parseInt(endDate)),
    };
  }

  try {
    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      error: false,
      jobs,
    });
  } catch (error) {
    console.error("Error in filtering jobs", error);
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
