import { createBrowserRouter } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import { StudentDashboard } from "./pages/student/StudentDashboard";
import { StudentProfile } from "./pages/student/StudentProfile";
import { StudentReports } from "./pages/student/StudentReports";
import { ManagementDashboard } from "./pages/management/ManagementDashboard";
import { ManagementStudents } from "./pages/management/ManagementStudents";
import { ManagementStudentProfile } from "./pages/management/ManagementStudentProfile";
import { ManagementEvents } from "./pages/management/ManagementEvents";
import { ManagementReports } from "./pages/management/ManagementReports";
import { ManagementProfile360 } from "./pages/management/ManagementProfile360";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/student",
    element: <ProtectedRoute requiredRole="student" />,
    children: [
      { index: true, Component: StudentDashboard },
      { path: "profile", Component: StudentProfile },
      { path: "reports", Component: StudentReports },
    ],
  },
  {
    path: "/management",
    element: <ProtectedRoute requiredRole="management" />,
    children: [
      { index: true, Component: ManagementDashboard },
      { path: "students", Component: ManagementStudents },
      { path: "students/:id", Component: ManagementStudentProfile },
      { path: "profile360/:id", Component: ManagementProfile360 },
      { path: "events", Component: ManagementEvents },
      { path: "reports", Component: ManagementReports },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
