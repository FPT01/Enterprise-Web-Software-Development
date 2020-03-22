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

import Rooms from "views/room/List.jsx";
import AddNewRoom from "views/room/AddNew.jsx";
import EditRoom from "views/room/Edit.jsx";

import ChatMessageBox from "views/chatRoom/ChatMessageBox.jsx";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin",
    subNav: false,
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/admin",
    subNav: false,
  },
  {
    path: "/role",
    name: "Management Roles",
    icon: "pe-7s-note2",
    component: UserRole,
    layout: "/admin",
    subNav: false,
  },
  {
    path: "/add-new-role",
    name: "Add New Role",
    icon: "pe-7s-note2",
    component: AddNewRole,
    layout: "/admin",
    subNav: true,
  },
  {
    path: "/edit-role",
    name: "Edit Role",
    icon: "pe-7s-note2",
    component: EditRole,
    layout: "/admin",
    subNav: true,
  },
  {
    path: "/user",
    name: "Management Users",
    icon: "pe-7s-user",
    component: Users,
    layout: "/admin",
    subNav: false,
  },
  {
    path: "/add-new-user",
    name: "Add New User",
    icon: "pe-7s-user",
    component: AddNewUser,
    layout: "/admin",
    subNav: true,
  },
  {
    path: "/edit-user",
    name: "Edit User",
    icon: "pe-7s-note2",
    component: EditUser,
    layout: "/admin",
    subNav: true,
  },
  {
    path: "/tutor",
    name: "Management Tutor",
    icon: "pe-7s-note2",
    component: TutorList,
    layout: "/admin",
    subNav: false,
  },
  {
    path: "/add-new-tutor",
    name: "Add New Tutor",
    icon: "pe-7s-note2",
    component: AddNewTutor,
    layout: "/admin",
    subNav: true,
  },
  {
    path: "/edit-tutor",
    name: "Edit Tutor",
    icon: "pe-7s-note2",
    component: EditTutor,
    layout: "/admin",
    subNav: true,
  },
  {
    path: "/student",
    name: "Management Student",
    icon: "pe-7s-note2",
    component: StudentList,
    layout: "/admin",
    subNav: false,
  },
  {
    path: "/add-new-student",
    name: "Add New Student",
    icon: "pe-7s-note2",
    component: AddNewStudent,
    layout: "/admin",
    subNav: true,
  },
  {
    path: "/edit-student",
    name: "Edit Student",
    icon: "pe-7s-note2",
    component: EditStudent,
    layout: "/admin",
    subNav: true,
  },

  {
    path: "/chat-message-box",
    name: "Chat Box",
    icon: "pe-7s-note2",
    component: ChatMessageBox,
    layout: "/admin",
    subNav: false,
  },

  {
    path: "/room",
    name: "Management Room",
    icon: "pe-7s-note2",
    component: Rooms,
    layout: "/admin",
    subNav: false,
  },
  {
    path: "/add-new-room",
    name: "Add New Room",
    icon: "pe-7s-note2",
    component: AddNewRoom,
    layout: "/admin",
    subNav: true,
  },
  {
    path: "/edit-room",
    name: "Edit Room",
    icon: "pe-7s-note2",
    component: EditRoom,
    layout: "/admin",
    subNav: true,
  }
];

export default dashboardRoutes;
