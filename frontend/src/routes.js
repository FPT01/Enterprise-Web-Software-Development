/*!

 =========================================================
 * Enterprise Web Software Development
 * Based on Light Bootstrap Dashboard React - v1.3.0
 * Based on Light Bootstrap Dashboard - v1.3.0
 =========================================================

*/

import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import TableList from "views/TableList.jsx";
import Maps from "views/Maps.jsx";
import Notifications from "views/Notifications.jsx";
import Upgrade from "views/Upgrade.jsx";
import ChangePassword from "views/ChangePassword.jsx";
import UserRole from "views/UserRole.jsx";
import TutorList from "views/tutor/List.jsx";
import StudentList from "views/student/List.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/changepassword",
    name: "Change Password",
    icon: "pe-7s-user",
    component: ChangePassword,
    layout: "/admin"
  },
  {
    path: "/userrole",
    name: "Users Role",
    icon: "pe-7s-note2",
    component: UserRole,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    icon: "pe-7s-note2",
    component: TableList,
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
    path: "/list",
    name: "Tutor List",
    icon: "pe-7s-note2",
    component: TutorList,
    layout: "/tutor"
  },
  {
    path: "/list",
    name: "Student List",
    icon: "pe-7s-note2",
    component: StudentList,
    layout: "/student"
  },
];

export default dashboardRoutes;
