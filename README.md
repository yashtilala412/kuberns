# Kuberns - Cloud App Deployment Dashboard

A full-stack cloud provisioning dashboard built for the technical assessment. This platform allows users to connect their GitHub repositories, configure application settings, and provision AWS EC2 instances automatically.

## 🚀 Key Features
- **Modern UI:** Built with React 19 and **Tailwind CSS v4**.
- **Multi-step Provisioning:** Logical flow from VCS selection to environment configuration.
- **Automated Backend:** Django signals trigger background provisioning threads upon record creation.
- **AWS Integration:** Boto3 implementation for EC2 creation with automatic region and instance type mapping.
- **Mock Mode:** Included a simulation mode for easy evaluation without requiring live AWS credentials.

## 🛠️ Tech Stack
- **Frontend:** React, Tailwind CSS v4, Lucide Icons, Framer Motion.
- **Backend:** Django, Django REST Framework, SQLite (Development).
- **Cloud Library:** Boto3 (AWS SDK for Python).

## 🏃 Setup Instructions

### Backend
1. Navigate to `/backend`.
2. Install dependencies: `pip install -r requirements.txt`.
3. Run migrations: `python manage.py migrate`.
4. Start server: `python manage.py runserver`.

### Frontend
1. Navigate to `/frontend`.
2. Install dependencies: `npm install`.
3. Start dev server: `npm run dev`.

## 📂 Project Structure
- `/backend/apps`: Core logic, models for WebApps, Environments, and Logs.
- `/backend/provisioner.py`: The AWS Boto3 logic and region mapping.
- `/frontend/src/App.jsx`: The React dashboard and API integration logic.
