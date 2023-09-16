import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import LandingPage from "pages/LandingPage";
import ParkingSpotList from "pages/ParkingSpotList";
import CreateNewSpot from "pages/CreateNewSpot";
import UpdateExistingSpot from "pages/UpdateExistingSpot";
import UserProfile from "pages/UserProfile";
import EditUser from "pages/EditUser";
import SingleSpotPage from "pages/SingleSpotPage";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "login",
        component: LoginPage,
        meta: { requiresAuth: false },
      },
      {
        path: "register",
        component: RegisterPage,
        meta: { requiresAuth: false },
      },
      {
        path: "landing",
        component: LandingPage,
        meta: { requiresAuth: false },
      },
      {
        path: "parking-spots",
        component: ParkingSpotList,
        meta: { requiresAuth: true },
        children: [],
      },
      {
        path: "parking-spot/:id",
        component: SingleSpotPage,
        meta: { requiresAuth: true },
      },
      {
        path: "create-spot",
        component: CreateNewSpot,
        meta: { requiresAuth: true },
      },
      {
        path: "update-spot/:id",
        component: UpdateExistingSpot,
        meta: { requiresAuth: true },
      },
      {
        path: "profile",
        component: UserProfile,
        meta: { requiresAuth: true },
      },
      {
        path: "edit-user",
        component: EditUser,
        meta: { requiresAuth: true },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
