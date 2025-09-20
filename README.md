# GenAI
This repository features experiments in Generative AI (GenAI) that demonstrate the integration of AI techniques with Pinecone vector databases, showcasing vector search, data indexing, and retrieval for practical real-world applications.




## Task Management System

A full stack Task Management System built with React (Frontend), Node.js + Express (Backend) and MongoDB (Database).
The app allows users to Create, Read, Update and Delete (CRUD) tasks with additional features like task status tracking and a dashboard view.

## Features

 Create tasks with title, description, due date, priority and status.

 View tasks in a clean task list with filters (status & priority).

 Update/Delete tasks with realtime updates.

 Dashboard with task overview (Total, Completed, Pending).

 RESTful API backend using Node.js + Express.

 MongoDB database with Mongoose ODM.

 Deployed frontend (Netlify) + backend (Render).

## UI Overview

``` Task List```

Filter by status (All / Pending / Started / Completed).

Filter by priority (Low / Medium / High).

```Create Task Form```

Add title, description, due date, priority and status.

Default status: Pending.

# Dashboard

## Displays:

```Total tasks```

Completed tasks

Pending tasks

```Task status overview (chart/summary)```

Recent tasks list

## Tech Stack

```Frontend```

React

React Router DOM

Material UI (MUI)

Axios (API calls)

Recharts (Dashboard charts)

```Backend```

Node.js + Express

MongoDB (Mongoose ODM)

CORS, Dotenv

## Deployment

Netlify


'''📂 Project Structure

TASK-MANAGEMENT-SYSTEM/
│── backend/         # Node.js + Express API
│   ├── models/      # Mongoose models
│   ├── routes/      # API routes
│   ├── server.js    # Backend entry point
│   └── package.json
│
│── frontend/        # React app
│   ├── src/pages/   # TaskList, TaskForm, TaskDetails, Dashboard
│   ├── src/App.jsx  # Frontend entry
│   └── package.json
'''
## Setup Instructions

1️⃣ ```Clone the repository```
git clone https://github.com/piyushmishra8008/TASK-MANAGEMENT-SYSTEM.git
cd TASK-MANAGEMENT-SYSTEM

2️⃣ ```Backend Setup```
cd backend
npm install


Create a .env file in the backend folder:

PORT=5000
MONGO_URI


## Run the backend:

npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

## Deployment

(Netlify): https://taskmanagem.netlify.app/


# Future Enhancements

 User authentication (Login/Register).

 Task search & sorting.

 Advanced analytics dashboard.

 Dark mode for better UI/UX.
