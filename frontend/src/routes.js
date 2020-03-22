/*!

 =========================================================
 * Enterprise Web Software Development
 * Based on Light Bootstrap Dashboard React - v1.3.0
 * Based on Light Bootstrap Dashboard - v1.3.0
 =========================================================

*/

import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import Maps from "views/Maps.jsx";
import Notifications from "views/Notifications.jsx";
import Upgrade from "views/Upgrade.jsx";
import ChangePassword from "views/ChangePassword.jsx";
import TutorList from "views/tutor/List.jsx";
import StudentList from "views/student/List.jsx";

import UserRole from "views/role/List.jsx";
import AddNewRole from "views/role/AddNew.jsx";
import EditRole from "views/role/Edit.jsx";

import Users from "views/user/List.jsx";
import AddNewUser from "views/user/AddNew.jsx";
import EditUser from "views/user/Edit.jsx";

import Tutors from "views/tutor/List.jsx";
import AddNewTutor from "views/tutor/AddNew.jsx";
import EditTutor from "views/tutor/Edit.jsx";

import Students from "views/student/List.jsx";
import AddNewStudent from "views/student/AddNew.jsx";
import EditStudent from "views/student/Edit.jsx";

import BlogPosts from "views/blogpost/List.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User List",
    icon: "pe-7s-user",
    component: Users,
    layout: "/admin"
  },
  {
    path: "/add-new-user",
    name: "Add New User",
    icon: "pe-7s-user",
    component: AddNewUser,
    layout: "/admin"
  },
  {
    path: "/edit-user",
    name: "Edit User",
    icon: "pe-7s-note2",
    component: EditUser,
    layout: "/admin"
  },
  {
    path: "/role",
    name: "User Roles",
    icon: "pe-7s-note2",
    component: UserRole,
    layout: "/admin"
  },
  {
    path: "/add-new-role",
    name: "Add New Role",
    icon: "pe-7s-note2",
    component: AddNewRole,
    layout: "/admin"
  },
  {
    path: "/edit-role",
    name: "Edit Role",
    icon: "pe-7s-note2",
    component: EditRole,
    layout: "/admin"
  },
  {
    path: "/tutor",
    name: "Tutor List",
    icon: "pe-7s-note2",
    component: TutorList,
    layout: "/admin"
  },
  {
    path: "/add-new-tutor",
    name: "Add New Tutor",
    icon: "pe-7s-note2",
    component: AddNewTutor,
    layout: "/admin"
  },
  {
    path: "/edit-tutor",
    name: "Edit Tutor",
    icon: "pe-7s-note2",
    component: EditTutor,
    layout: "/admin"
  },
  {
    path: "/student",
    name: "Student List",
    icon: "pe-7s-note2",
    component: StudentList,
    layout: "/admin"
  },
  {
    path: "/add-new-student",
    name: "Add New Student",
    icon: "pe-7s-note2",
    component: AddNewStudent,
    layout: "/admin"
  },
  {
    path: "/edit-student",
    name: "Edit Student",
    icon: "pe-7s-note2",
    component: EditStudent,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "pe-7s-map-marker",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Notifications,
    layout: "/admin"
  },
  {
    upgrade: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "pe-7s-rocket",
    component: Upgrade,
    layout: "/admin"
  },
  {
    path: "/blogposts",
    name: "Blog post",
    icon: "pe-7s-rocket",
    component: BlogPosts,
    layout: "/admin"
  },
];

export default dashboardRoutes;
