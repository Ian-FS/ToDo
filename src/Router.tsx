import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './layout/default-layout';
import TasksPage from './pages/tasks-page';
import LoginPage from './pages/auth-page/login';
import Register from './pages/auth-page/register';
import { useAuth } from './context/useAuth';

export default function Router() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route
          path="/"
          element={isAuthenticated ? <TasksPage /> : <LoginPage />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <TasksPage /> : <LoginPage />}
        />
        <Route
          path="/tasks"
          element={isAuthenticated ? <TasksPage /> : <LoginPage />}
        />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}
