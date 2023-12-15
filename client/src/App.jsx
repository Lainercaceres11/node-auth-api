import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuntContext";

import ProtectedRoute from "./ProtectedRoute";

import TaskPage from "./pages/TaskPage";
import FormPage from "./pages/FormPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { TaskProvider } from "./context/TaskContext";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Navbar />
          <main className="container mx-auto ">
            <Routes>
              <Route path="/" element={<h1>Home Page</h1>}></Route>
              <Route path="/register" element={<RegisterPage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>

              <Route element={<ProtectedRoute />}>
                <Route path="/task" element={<TaskPage />}></Route>
                <Route path="/add-task" element={<FormPage />}></Route>
                <Route path="/task/:id" element={<FormPage />}></Route>
                <Route path="/profile" element={<ProfilePage />}></Route>
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}
