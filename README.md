# Student Job Tracker Web App

A fullstack application built using the **MERN** stack (MongoDB, Express.js, React, Node.js) to track job applications for students. The app allows users to add job applications, update statuses, filter by date/status, and delete entries. The project is deployed on **Vercel** (Frontend), **Render** (Backend), and uses **MongoDB Atlas** for data storage.

## Features
- **Add Job Application**: Users can add new job applications with details like Company, Role, Status, Date of Application, and Link.
- **List All Applications**: All applications are displayed in a clean, responsive layout.
- **Filter Applications**: Users can filter applications by status or date of application.
- **Update Status**: Users can update the status of a job application (e.g., Applied, Interview, Offer, Rejected).
- **Delete Application**: Users can delete a job application with confirmation.

## Tech Stack
- **Frontend**: React.js (with Hooks)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (MongoDB Atlas)
- **Deployment**:
  - Frontend: Vercel
  - Backend: Render or Railway
  - Database: MongoDB Atlas

## Installation and Setup

### 1. Clone the Repository
Clone the repository to your local machine.

```bash
git clone https://github.com/your-username/student-job-tracker.git
cd student-job-tracker
```

### 2. Backend Setup

- Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

- Create a `.env` file in the backend directory with the following variables:

```bash
MONGO_URI=your-mongodb-atlas-connection-url
PORT=5000
```

- Start the backend server:

```bash
npm start
```

Your backend will now be running on `http://localhost:5000`.

### 3. Frontend Setup

- Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

- Create a `.env` file in the frontend directory with the following variables:

```bash
REACT_APP_API_URL=http://localhost:5000
```

- Start the frontend development server:

```bash
npm start
```

Your frontend will now be running on `http://localhost:3000`.

### 4. Deployment

- Deploy the **frontend** on [Vercel](https://vercel.com/).
- Deploy the **backend** on [Render](https://render.com/) or [Railway](https://railway.app/).
- Set up your **MongoDB Atlas** database and replace the connection URL in the `.env` file.

## Endpoints

### 1. `GET /api/jobs`
Fetch all job applications.

**Response:**

```json
[
  {
    "_id": "123",
    "company": "Company Name",
    "role": "Role Name",
    "status": "Applied",
    "date": "2025-04-10",
    "link": "https://joblink.com"
  }
]
```

### 2. `POST /api/jobs`
Add a new job application.

**Request Body:**

```json
{
  "company": "Company Name",
  "role": "Role Name",
  "status": "Applied",
  "date": "2025-04-10",
  "link": "https://joblink.com"
}
```

### 3. `PATCH /api/jobs/:id`
Update the status of a job application.

**Request Body:**

```json
{
  "status": "Interview"
}
```

### 4. `DELETE /api/jobs/:id`
Delete a job application.

---

## Screenshots

Include screenshots or gifs of the app here to showcase its functionality.

---

## Contributing

Feel free to fork the repository and submit pull requests if you'd like to contribute.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

