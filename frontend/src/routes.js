/*!

 =========================================================
 * Enterprise Web Software Development
 * Based on Light Bootstrap Dashboard React - v1.3.0
 * Based on Light Bootstrap Dashboard - v1.3.0
 =========================================================

*/

import Dashboard from "views/Dashboard.jsx";
import DashboardTutor from "views/DashboardTutor.jsx";
import DashboardStudent from "views/DashboardStudent.jsx";
import Maps from "views/Maps.jsx";
import Notifications from "views/Notifications.jsx";
import ForgotPassword from "views/ForgotPassword.jsx";
import TutorList from "views/tutor/List.jsx";
import StudentList from "views/student/List.jsx";

import UserRole from "views/role/List.jsx";
import AddNewRole from "views/role/AddNew.jsx";
import EditRole from "views/role/Edit.jsx";

import Users from "views/user/List.jsx";
import AddNewUser from "views/user/AddNew.jsx";
import EditUser from "views/user/Edit.jsx";

import UserProfile from "views/userprofile/UserProfile.jsx";
import Documents from "views/document/Documents.jsx";
import ChangePassword from "views/changePassword/ChangePassword.jsx";

import Tutors from "views/tutor/List.jsx";
import AddNewTutor from "views/tutor/AddNew.jsx";
import EditTutor from "views/tutor/Edit.jsx";

import Students from "views/student/List.jsx";
import AddNewStudent from "views/student/AddNew.jsx";
import EditStudent from "views/student/Edit.jsx";

import BlogPosts from "views/blogpost/List.jsx";
import BlogDetail from "views/blogpost/Detail.jsx";
import AddNewBlog from "views/blogpost/AddNew.jsx";
import EditBlog from "views/blogpost/Edit.jsx";

import AllocateList from "views/allocate/List.jsx";
import EditAllocate from "views/allocate/Edit.jsx";
import AddAllocate from "views/allocate/AddNew.jsx";
import Meeting from "views/meeting/List.jsx";
import ImportExport from "views/Import-Export/Import-Export.jsx";

import Rooms from "views/room/List.jsx";
import AddNewRoom from "views/room/AddNew.jsx";
import EditRoom from "views/room/Edit.jsx";

import ChatMessageBox from "views/chatRoom/ChatMessageBox.jsx";
import ChatRoom from "views/chatRoom/ChatRoom.jsx";

import ReportLastSevenDays from "views/report/ReportLastSevenDays.jsx";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin",
    role: "admin",
    subNav: false,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: DashboardTutor,
    layout: "/tutor",
    role: "tutor",
    subNav: false,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: DashboardStudent,
    layout: "/students",
    role: "student",
    subNav: false,
  },
  {
    path: "/profile-user",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/tutor",
    role: "tutor",
    subNav: false,
  },
  {
    path: "/profile-user",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/students",
    role: "student",
    subNav: false,
  },
  {
    path: "/change-password",
    name: "Change Password",
    icon: "pe-7s-user",
    component: ChangePassword,
    layout: "/admin",
    role: "admin",
    subNav: false,
  },
  {
    path: "/change-password",
    name: "Change Password",
    icon: "pe-7s-user",
    component: ChangePassword,
    layout: "/tutor",
    role: "tutor",
    subNav: false,
  },
  {
    path: "/change-password",
    name: "Change Password",
    icon: "pe-7s-user",
    component: ChangePassword,
    layout: "/students",
    role: "student",
    subNav: false,
  },
  {
    path: "/role",
    name: "Management Roles",
    icon: "pe-7s-note2",
    component: UserRole,
    layout: "/admin",
    role: "admin",
    subNav: false,
  },
  {
    path: "/add-new-role",
    name: "Add New Role",
    icon: "pe-7s-note2",
    component: AddNewRole,
    layout: "/admin",
    role: "admin",
    subNav: true,
  },
  {
    path: "/edit-role",
    name: "Edit Role",
    icon: "pe-7s-note2",
    component: EditRole,
    layout: "/admin",
    role: "admin",
    subNav: true,
  },
  {
    path: "/user",
    name: "Management Users",
    icon: "pe-7s-users",
    component: Users,
    layout: "/admin",
    role: "admin",
    subNav: false,
  },
  {
    path: "/add-new-user",
    name: "Add New User",
    icon: "pe-7s-user",
    component: AddNewUser,
    layout: "/admin",
    role: "admin",
    subNav: true,
  },
  {
    path: "/edit-user",
    name: "Edit User",
    icon: "pe-7s-note2",
    component: EditUser,
    layout: "/admin",
    role: "admin",
    subNav: true,
  },
  {
    path: "/tutor",
    name: "Management Tutors",
    icon: "pe-7s-users",
    component: TutorList,
    layout: "/admin",
    role: "admin",
    subNav: false,
  },
  {
    path: "/add-new-tutor",
    name: "Add New Tutor",
    icon: "pe-7s-note2",
    component: AddNewTutor,
    layout: "/admin",
    role: "admin",
    subNav: true,
  },
  {
    path: "/edit-tutor",
    name: "Edit Tutor",
    icon: "pe-7s-note2",
    component: EditTutor,
    layout: "/admin",
    role: "admin",
    subNav: true,
  },
  {
    path: "/student",
    name: "Management Student",
    icon: "pe-7s-users",
    component: Students,
    layout: "/admin",
    role: "admin",
    subNav: false,
  },
  {
    path: "/add-new-student",
    name: "Add New Student",
    icon: "pe-7s-note2",
    component: AddNewStudent,
    layout: "/admin",
    role: "admin",
    subNav: true,
  },
  {
    path: "/edit-student",
    name: "Edit Student",
    icon: "pe-7s-note2",
    component: EditStudent,
    layout: "/admin",
    role: "admin",
    subNav: true,
  },
  {
    path: "/room",
    name: "Management Rooms",
    icon: "pe-7s-note2",
    component: Rooms,
    layout: "/admin",
    role: "admin",
    subNav: false,
  },
  {
    path: "/add-new-room",
    name: "Add New Room",
    icon: "pe-7s-note2",
    component: AddNewRoom,
    layout: "/admin",
    role: "admin",
    subNav: true,
  },
  {
    path: "/edit-room",
    name: "Edit Room",
    icon: "pe-7s-note2",
    component: EditRoom,
    layout: "/admin",
    role: "admin",
    subNav: true,
  },
  {
    path: "/documents",
    name: "Documents",
    icon: "pe-7s-note2",
    component: Documents,
    layout: "/admin",
    role: "admin",
    subNav: false,
  },
  {
    path: "/documents",
    name: "Documents",
    icon: "pe-7s-note2",
    component: Documents,
    layout: "/tutor",
    role: "tutor",
    subNav: false,
  },
  {
    path: "/documents",
    name: "Documents",
    icon: "pe-7s-note2",
    component: Documents,
    layout: "/students",
    role: "student",
    subNav: false,
  },
  {
    path: "/chat-room",
    name: "Chat Box",
    icon: "pe-7s-chat",
    component: ChatRoom,
    layout: "/tutor",
    role: "tutor",
    subNav: false,
  },
  {
    path: "/chat-room",
    name: "Chat Box",
    icon: "pe-7s-chat",
    component: ChatRoom,
    layout: "/students",
    role: "student",
    subNav: false,
  },
  {
    path: "/chat-message-box",
    name: "Chat Box",
    icon: "pe-7s-note2",
    component: ChatMessageBox,
    layout: "/tutor",
    role: "tutor",
    subNav: true,
  },
  {
    path: "/chat-message-box",
    name: "Chat Box",
    icon: "pe-7s-note2",
    component: ChatMessageBox,
    layout: "/students",
    role: "students",
    subNav: true,
  },
  {
    path: "/blogposts",
    name: "Blog post",
    icon: "pe-7s-note2",
    component: BlogPosts,
    layout: "/admin",
    role: "admin",
    subNav: false,
  },
  {
    path: "/blogposts",
    name: "Blog post",
    icon: "pe-7s-note2",
    component: BlogPosts,
    layout: "/tutor",
    role: "tutor",
    subNav: false,
  },
  {
    path: "/blogposts",
    name: "Blog",
    icon: "pe-7s-note2",
    component: BlogPosts,
    layout: "/student",
    role: "student",
    subNav: false,
  },
  {
    path: "/blogdetail",
    name: "Blog post",
    icon: "pe-7s-note2",
    component: BlogDetail,
    layout: "/admin",
    role: "admin",
    subNav: true,
  },
  {
    path: "/add-new-blog",
    name: "Add New Blog",
    icon: "pe-7s-note2",
    component: AddNewBlog,
    layout: "/admin",
    role: "admin",
    subNav: true,
  },
  {
    path: "/edit-blog",
    name: "Edit Blog",
    icon: "pe-7s-note2",
    component: EditBlog,
    layout: "/admin",
    subNav: true,
  },
  {
    path: "/allocate",
    name: "Allocate",
    icon: "pe-7s-note2",
    component: AllocateList,
    layout: "/admin",
    role: "admin",
    subNav: false,
  },
  {
    path: "/edit-allocate",
    name: "Edit Allocate",
    icon: "pe-7s-note2",
    component: EditAllocate,
    layout: "/admin",
    role: "admin",
    subNav: true
  },
  {
    path: "/add-allocate",
    name: "Allocate Tutor and Student for class",
    icon: "pe-7s-note2",
    component: AddAllocate,
    layout: "/admin",
    role: "admin",
    subNav: true
  },
  {
    path: "/meeting",
    name: "Meeting",
    icon: "pe-7s-note2",
    component: Meeting,
    layout: "/admin",
    role: "admin",
    subNav: false,
  },
  {
    path: "/import-export",
    name: "Import / Export",
    icon: "pe-7s-cloud-upload",
    component: ImportExport,
    layout: "/admin",
  },
  {
    path: "/meeting",
    name: "Meeting",
    icon: "pe-7s-note2",
    component: Meeting,
    layout: "/students",
    role: "student",
    subNav: false,
  },
  {
    path: "/report-lastsevendays",
    name: "Report",
    icon: "pe-7s-graph3",
    component: ReportLastSevenDays,
    layout: "/admin",
    role: "admin",
    subNav: false,
  },

];

export default dashboardRoutes;
