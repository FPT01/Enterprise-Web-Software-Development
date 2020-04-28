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
import Documents from "views/document/List.jsx";
import AddNewDocument from "views/document/AddNew.jsx";
import ChangePassword from "views/changePassword/ChangePassword.jsx";

import Tutors from "views/tutor/List.jsx";
import AddNewTutor from "views/tutor/AddNew.jsx";
import EditTutor from "views/tutor/Edit.jsx";
import TutorProfile from "views/tutor/Detail.jsx";

import Students from "views/student/List.jsx";
import AddNewStudent from "views/student/AddNew.jsx";
import EditStudent from "views/student/Edit.jsx";
import StudentProfile from "views/student/Detail.jsx";

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
// ADMIN Route
  { path: "/dashboard", name: "Dashboard", icon: "pe-7s-graph", component: Dashboard, layout: "/admin", role: "admin", subNav: false, },
  { path: "/profile-user", name: "User Profile", icon: "pe-7s-user", component: UserProfile, layout: "/admin", role: "admin", subNav: false, },
  { path: "/change-password", name: "Change Password", icon: "pe-7s-user", component: ChangePassword, layout: "/admin", role: "admin", subNav: false, },
  { path: "/role", name: "Management Roles", icon: "pe-7s-note2", component: UserRole, layout: "/admin", role: "admin", subNav: false, },
  { path: "/add-new-role", name: "Add New Role", icon: "pe-7s-note2", component: AddNewRole, layout: "/admin", role: "admin", subNav: true, },
  { path: "/edit-role", name: "Edit Role", icon: "pe-7s-note2", component: EditRole, layout: "/admin", role: "admin", subNav: true, },
  { path: "/user", name: "Management Users", icon: "pe-7s-users", component: Users, layout: "/admin", role: "admin", subNav: false, },
  { path: "/add-new-user", name: "Add New User", icon: "pe-7s-user", component: AddNewUser, layout: "/admin", role: "admin", subNav: true, },
  { path: "/edit-user", name: "Edit User", icon: "pe-7s-note2", component: EditUser, layout: "/admin", role: "admin", subNav: true, },
  { path: "/tutor", name: "Management Tutors", icon: "pe-7s-users", component: TutorList, layout: "/admin", role: "admin", subNav: false, },
  { path: "/add-new-tutor", name: "Add New Tutor", icon: "pe-7s-note2", component: AddNewTutor, layout: "/admin", role: "admin", subNav: true, },
  { path: "/edit-tutor", name: "Edit Tutor", icon: "pe-7s-note2", component: EditTutor, layout: "/admin", role: "admin", subNav: true, },
  { path: "/student", name: "Management Student", icon: "pe-7s-users", component: Students, layout: "/admin", role: "admin", subNav: false, },
  { path: "/add-new-student", name: "Add New Student", icon: "pe-7s-note2", component: AddNewStudent, layout: "/admin", role: "admin", subNav: true, },
  { path: "/edit-student", name: "Edit Student", icon: "pe-7s-note2", component: EditStudent, layout: "/admin", role: "admin", subNav: true, },
  { path: "/import-export", name: "Import / Export", icon: "pe-7s-cloud-upload", component: ImportExport, layout: "/admin", role: "admin", subNav: false, },

// Staff Route
  { path: "/dashboard", name: "Dashboard", icon: "pe-7s-graph", component: Dashboard, layout: "/admin", role: "staff", subNav: false, },
  { path: "/profile-user", name: "User Profile", icon: "pe-7s-user", component: UserProfile, layout: "/admin", role: "staff", subNav: false, },
  { path: "/change-password", name: "Change Password", icon: "pe-7s-user", component: ChangePassword, layout: "/admin", role: "staff", subNav: false, },
  { path: "/tutor", name: "Management Tutors", icon: "pe-7s-users", component: TutorList, layout: "/admin", role: "staff", subNav: false, },
  { path: "/add-new-tutor", name: "Add New Tutor", icon: "pe-7s-note2", component: AddNewTutor, layout: "/admin", role: "staff", subNav: true, },
  { path: "/edit-tutor", name: "Edit Tutor", icon: "pe-7s-note2", component: EditTutor, layout: "/admin", role: "staff", subNav: true, },
  { path: "/tutor-profile", name: "Tutor Profile", icon: "pe-7s-note2", component: TutorProfile, layout: "/admin", role: "staff", subNav: true, },
  { path: "/student", name: "Management Student", icon: "pe-7s-users", component: Students, layout: "/admin", role: "staff", subNav: false, },
  { path: "/add-new-student", name: "Add New Student", icon: "pe-7s-note2", component: AddNewStudent, layout: "/admin", role: "staff", subNav: true, },
  { path: "/edit-student", name: "Edit Student", icon: "pe-7s-note2", component: EditStudent, layout: "/admin", role: "staff", subNav: true, },
  { path: "/student-profile", name: "Tutor Profile", icon: "pe-7s-note2", component: StudentProfile, layout: "/admin", role: "staff", subNav: true, },

  { path: "/allocate", name: "Allocate", icon: "pe-7s-note2", component: AllocateList, layout: "/admin", role: "staff", subNav: false, },
  { path: "/edit-allocate", name: "Edit Allocate", icon: "pe-7s-note2", component: EditAllocate, layout: "/admin", role: "staff", subNav: true },
  { path: "/add-allocate", name: "Allocate Tutor and Student for class", icon: "pe-7s-note2", component: AddAllocate, layout: "/admin", role: "staff", subNav: true },
  
  { path: "/report-lastsevendays", name: "Report", icon: "pe-7s-graph3", component: ReportLastSevenDays, layout: "/admin", role: "staff", subNav: false, },

  // TUTOR Route
  { path: "/dashboard", name: "Dashboard", icon: "pe-7s-graph", component: DashboardTutor, layout: "/tutor", role: "tutor", subNav: false, },
  { path: "/profile-user", name: "User Profile", icon: "pe-7s-user", component: UserProfile, layout: "/tutor", role: "tutor", subNav: false, },
  { path: "/change-password", name: "Change Password", icon: "pe-7s-user", component: ChangePassword, layout: "/tutor", role: "tutor", subNav: false, },
  { path: "/documents", name: "Documents", icon: "pe-7s-note2", component: Documents, layout: "/tutor", role: "tutor", subNav: false, },
  { path: "/add-new-document", name: "Add New Document", icon: "pe-7s-note2", component: AddNewDocument, layout: "/tutor", role: "tutor", subNav: true, },
  { path: "/chat-room", name: "Chat Box", icon: "pe-7s-chat", component: ChatRoom, layout: "/tutor", role: "tutor", subNav: false, },
  { path: "/chat-message-box", name: "Chat Box", icon: "pe-7s-note2", component: ChatMessageBox, layout: "/tutor", role: "tutor", subNav: true, },
  { path: "/blogposts", name: "Blog", icon: "pe-7s-note2", component: BlogPosts, layout: "/tutor", role: "tutor", subNav: false, },

  { path: "/blogdetail", name: "Blog detail", icon: "pe-7s-note2", component: BlogDetail, layout: "/tutor", role: "tutor", subNav: true },
  { path: "/add-new-blog", name: "Add New Blog", icon: "pe-7s-note2", component: AddNewBlog, layout: "/tutor", role: "tutor", subNav: true, },
  { path: "/edit-blog", name: "Edit Blog", icon: "pe-7s-note2", component: EditBlog, layout: "/tutor", subNav: true, },

  { path: "/meeting", name: "Meeting", icon: "pe-7s-note2", component: Meeting, layout: "/tutor", role: "tutor", subNav: false, },
  //STUDENT Route
  { path: "/dashboard", name: "Dashboard", icon: "pe-7s-graph", component: DashboardStudent, layout: "/students", role: "student", subNav: false, },
  { path: "/profile-user", name: "User Profile", icon: "pe-7s-user", component: UserProfile, layout: "/students", role: "student", subNav: false, },
  { path: "/change-password", name: "Change Password", icon: "pe-7s-user", component: ChangePassword, layout: "/students", role: "student", subNav: false, },
  { path: "/documents", name: "Documents", icon: "pe-7s-note2", component: Documents, layout: "/students", role: "student", subNav: false, },
  { path: "/add-new-document", name: "Add New Document", icon: "pe-7s-note2", component: AddNewDocument, layout: "/students", role: "student", subNav: true, },
  { path: "/chat-room", name: "Chat Box", icon: "pe-7s-chat", component: ChatRoom, layout: "/students", role: "student", subNav: false, },
  { path: "/chat-message-box", name: "Chat Box", icon: "pe-7s-note2", component: ChatMessageBox, layout: "/students", role: "students", subNav: true, },
  { path: "/blogposts", name: "Blog", icon: "pe-7s-note2", component: BlogPosts, layout: "/students", role: "student", subNav: false, },
  { path: "/blogdetail", name: "Blog detail", icon: "pe-7s-note2", component: BlogDetail, layout: "/students", role: "student", subNav: true, },
  { path: "/add-new-blog", name: "Add New Blog", icon: "pe-7s-note2", component: AddNewBlog, layout: "/students", role: "student", subNav: true, },
  { path: "/edit-blog", name: "Edit Blog", icon: "pe-7s-note2", component: EditBlog, layout: "/students", subNav: true, },
  { path: "/meeting", name: "Meeting", icon: "pe-7s-note2", component: Meeting, layout: "/students", role: "student", subNav: false, },
  
];

export default dashboardRoutes;
