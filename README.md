![Screenshot 2025-04-12 100004](https://github.com/user-attachments/assets/db6676b7-b9c7-41f3-ba27-766ee61c9450)# Student Job Tracker Web App

A fullstack application built using the **MERN** stack (MongoDB, Express.js, React, Node.js) to track job applications for students. The app allows users to add job applications, update statuses, filter by date/status, and delete entries. The project is deployed on **Vercel** (Frontend), **Render** (Backend), and uses **MongoDB Atlas** for data storage.

## Live Links
- 🔗 **Frontend**: [https://student-job-tracker-ten-navy.vercel.app/](https://student-job-tracker-ten-navy.vercel.app/)
- 🔗 **Backend**: [https://student-job-tracker-3vla.onrender.com](https://student-job-tracker-3vla.onrender.com)

# 🎓 Student Job Tracker (MERN Stack)

The **Student Job Tracker** is a full-stack web application built with the **MERN stack (MongoDB, Express.js, React.js, Node.js)**. This application helps students efficiently track their job applications with features like add, update, delete, filtering, and a clean, responsive UI.

---

## 🚀 Features

### 🏠 Main Page
- Displays all job applications in an organized **card format**.
- Shows job **title**, **company name**, **status**, and **application date**.
- Options to **view**, **edit**, or **delete** each job.
![Screenshot 2025-04-12 095900](https://github.com/user-attachments/assets/11ef2b77-9170-4740-9e7e-8709be0db4fa)

---

### ➕ Add New Job Application
- Click on the **"Add New"** button to open a modal form.
- Fill in details:
  - **Job Title**
  - **Company**
  - **Location**
  - **Status**
  - **Date Applied**
![Screenshot 2025-04-12 100158](https://github.com/user-attachments/assets/48bcb54c-231a-4f83-b2d7-c52ff770749a)

- Submit the form to save the new job entry.
- ✅ **Toast notification** confirms successful addition.
- Job appears immediately in the list.
![Screenshot 2025-04-12 100219](https://github.com/user-attachments/assets/e31639a1-91d5-430a-8afb-312dea86ebe3)
---

### 🔁 Update Job
- Click the **Edit** icon on any job card.
- The modal is pre-filled with existing data.
- Make changes and click **Update**.

![Screenshot 2025-04-12 100313](https://github.com/user-attachments/assets/68998d20-a9ff-449c-82bb-afd59974dfe0)

- ✅ **Real-time UI update** and confirmation via toast.
- No need to reload the page.
  
![Screenshot 2025-04-12 100322](https://github.com/user-attachments/assets/3dab8cf5-59b5-4de3-93be-f628a9e06b62)

---

### 🗑️ Delete Job (with Confirmation)
- Click the **Delete** icon on a job card.
- A confirmation modal pops up with **Yes/No** options.
- Clicking "Yes" permanently deletes the job.
- ✅ Toast feedback confirms deletion.
![Screenshot 2025-04-12 100411](https://github.com/user-attachments/assets/6aaeabf3-f515-41c1-895a-f6639302e810)

---

### 🧪 Filter by Status
Use the status dropdown to filter job applications by:
- Not Applied
  ![Screenshot 2025-04-12 100004](https://github.com/user-attachments/assets/66447b55-c288-46bf-992f-87a9a16d5e03)
  
- Applied
  ![Screenshot 2025-04-12 100026](https://github.com/user-attachments/assets/542f15ea-a784-4c95-8b7f-a529650c8621)

- Interview
  ![Screenshot 2025-04-12 100048](https://github.com/user-attachments/assets/b33a250b-041b-4708-abd2-bd23ab8b9fa0)

- Rejected
  ![Screenshot 2025-04-12 100055](https://github.com/user-attachments/assets/964c52b6-75f4-4c57-be8a-73fbfb8669fa)
  
- Offer

---

### 📅 Filter by Date or Range
- Use the **Date Picker** to filter jobs:
  - Applied on a **specific date**.
  - Applied within a **custom date range**.
![Screenshot 2025-04-12 100342](https://github.com/user-attachments/assets/fa9b8d25-a247-4483-b97b-b338c18aca74)
---

## 📱 Responsive Design

- Fully responsive layout — optimized for **desktop**, **tablet**, and **mobile**.
- Interactive and modern UI with:
  - Modals for Add/Edit
  - Tooltips
  - Smooth transitions
<div style="display: flex; justify-content: space-between;">
  <img src="https://github.com/user-attachments/assets/a50af51c-b96b-4fc9-8069-fce9758f7a1f" alt="App Image 1" width="45%" />
  <img src="https://github.com/user-attachments/assets/7a00c657-396d-46d2-a686-cb1ed1a9917d" alt="App Image 2" width="45%" />
</div>


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

