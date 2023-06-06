import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import LandingPage from "pages/LandingPage";
import ParkingSpotList from "pages/ParkingSpotList";
import CreateNewSpot from "pages/CreateNewSpot";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "home", component: () => import("pages/IndexPage.vue"), meta: { requiresAuth: true }},
      {
        path: "login",
        component: LoginPage,
        meta: { requiresAuth: false }
      },
      {
        path: "register",
        component: RegisterPage,
        meta: { requiresAuth: false }
      },
      {
        path: "",
        component: LandingPage,
        meta: { requiresAuth: false }
      },
      {
        path: "about",
        component: ParkingSpotList,
        meta: { requiresAuth: true }
      },
      {
        path: "create-spot",
        component: CreateNewSpot,
        meta: { requiresAuth: true }
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
