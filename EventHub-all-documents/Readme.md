
---

# EventHub

---

##  Project Description

EventHub is a dynamic event management platform where users can explore, create, and manage events with ease.  
It provides a seamless experience with a powerful backend, modern frontend, and optional AI-powered features.

---

## AI Tools Utilized

- **OpenAI GPT**
- **Gemini-2.0-Flash**

---

## 🚀 Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens

---

##  Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/EventHub.git
cd EventHub
```

### 2. Install Dependencies

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd ../frontend
npm install
```


### 3. Create `.env` File

Inside the `backend` folder, create a `.env` file and add the following:

```env
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_secret_key_here
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here  # optional, if using AI features
FRONTEND_URL=http://localhost:3000
```

You can refer to the `.env.example` provided.
 you can run frontend


**deployment steps:**


# Deploy MERN Stack App on AWS EC2 - Step Titles

## Prerequisites

## Step 1: Creating an EC2 Instance

## Step 2: Setting Up an Elastic IP

## Step 3: Editing Security Groups

## Step 4: Connecting to the EC2 Instance

## Step 5: Installing Required Software on Ubuntu
- Install Node.js and npm
- Set Up MongoDB Atlas
- Install PM2
- Configure UFW Firewall
- Install NGINX

## Step 6: Cloning the Repository
- Set Up the Backend
- Set Up the Frontend

## Step 7: Configuring NGINX

## Step 8: Verify Deployment
- Access the Application
- Test Application Features


##  Usage Guide

- **Create an Event**: Add title, date, location, and description (can be AI-generated).
- **Register for Events**: Join available events.
- **Manage Your Events**: Update or delete your own events.

 