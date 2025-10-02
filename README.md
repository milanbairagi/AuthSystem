# TaskAuth - Task Management System

A full-stack task management application with user authentication and CRUD operations built with Django REST Framework and React.

## 🚀 Features

### 🔐 Authentication
- User registration with email
- JWT-based authentication
- Token refresh mechanism
- Role-based access (Admin/User)
- Profile management

### ✅ Task Management
- Create, read, update, and delete tasks
- Task status tracking (Pending, In Progress, Completed)
- User-specific task isolation
- Task search and filtering

### 🎨 Modern UI
- Responsive React frontend
- Tailwind CSS styling
- Clean and intuitive interface
- Real-time task updates

## 🛠️ Tech Stack

### ⚙️ Backend
- **Django 5.2.6** - Web framework
- **Django REST Framework** - API development
- **Simple JWT** - Token authentication
- **SQLite** - Database (development)
- **Django CORS Headers** - Cross-origin requests

### 🖥️ Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Router** - Routing
- **React Icons** - Icon library

## 📁 Project Structure

```
TaskAuth/
├── Backend/
│   ├── accounts/          # User authentication app
│   │   ├── models.py      # Custom User model
│   │   ├── serializers/   # API serializers
│   │   ├── views/         # API views
│   │   └── urls/          # URL routing
│   ├── tasks/             # Task management app
│   │   ├── models.py      # Task model
│   │   ├── serializers/   # Task serializers
│   │   ├── views/         # Task API views
│   │   └── urls/          # Task URL routing
│   ├── core/              # Django project settings
│   └── manage.py          # Django management script
├── Frontend/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── hooks/         # Custom hooks
│   │   ├── pages/         # Page components
│   │   └── utils/         # Utility functions
│   └── package.json       # Frontend dependencies
```

## 🔧 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd Backend
```

2. Create a virtual environment:
```bash
python -m venv venv
venv\Scripts\activate  # Windows
# or
source venv/bin/activate  # Linux/Mac
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
Create a `.env` file in the Backend directory:
```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

5. Run migrations:
```bash
python manage.py migrate
```

6. Create a superuser (optional):
```bash
python manage.py createsuperuser
```

7. Start the development server:
```bash
python manage.py runserver
```

The backend will be available at `http://127.0.0.1:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📡 API Endpoints

### Authentication
- `POST /api/v1/token/` - Obtain JWT token (login)
- `POST /api/v1/token/refresh/` - Refresh JWT token
- `POST /api/v1/accounts/register/` - User registration
- `GET /api/v1/accounts/me/` - Get current user profile

### Tasks
- `GET /api/v1/tasks/` - List all user tasks
- `POST /api/v1/tasks/` - Create a new task
- `GET /api/v1/tasks/{id}/` - Get specific task
- `PUT /api/v1/tasks/{id}/` - Update task
- `DELETE /api/v1/tasks/{id}/` - Delete task

## 📝 Task Model

Tasks have the following fields:
- `title` (string, required) - Task title
- `description` (text, optional) - Task description
- `status` (choice) - pending, in_progress, completed
- `owner` (foreign key) - User who created the task
- `created_at` (datetime) - Creation timestamp
- `updated_at` (datetime) - Last update timestamp

## 👤 User Model

Custom user model with:
- `email` (unique) - Used as username
- `first_name` - User's first name
- `last_name` - User's last name
- `role` - admin or user
- Email-based authentication instead of username

*Backend Developer Intern Assignment - primetrade.ai*
