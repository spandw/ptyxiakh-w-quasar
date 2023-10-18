import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import axios from "axios";
import { computed, ref } from "vue";
import { useQuasar } from "quasar";

export const useUserStore = defineStore("user", () => {
  const router = useRouter();
  const user = ref(null);
  const $q = useQuasar();
  const loggedIn = computed(() => !!user.value);

  const register = async (data) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        data
      );
      $q.notify({
        color: "positive",
        message: response.data.message,
        icon: "report_problem",
      });
      router.push({ path: "/" });
    } catch (error) {
      $q.notify({
        color: "negative",
        message: error.response.data.message,
        icon: "report_problem",
      });
    }
  };
  const update = async (data) => {
    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/edit-user",
        data
      );
      $q.notify({
        color: "positive",
        message: response.data.message,
        icon: "report_problem",
      });
      router.push({ path: "/profile" });
    } catch (error) {
      $q.notify({
        color: "negative",
        message: error.response.data.message,
        icon: "report_problem",
      });
    }
  };

  const login = async (credentials) => {
    return axios
      .post("http://127.0.0.1:8000/api/login", credentials)
      .then((response) => {
        console.log(response.data.user);
        user.value = response.data.user;
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.user);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
      });
  };
  const logout = async () => {
    return axios.post("http://127.0.0.1:8000/api/logout").then((response) => {
      console.log("logged out", response.data);
      user.value = null;
      localStorage.removeItem("token");
      axios.defaults.headers.common["Authorization"] = null;
      router.push({ path: "/landing" });
    });
  };

  const loadUser = () => {
    console.log("should load user");
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get("http://127.0.0.1:8000/api/user")
        .then((response) => {
          user.value = response.data;
        })
        .catch(() => {
          axios.defaults.headers.common["Authorization"] = null;
          localStorage.removeItem("token");
          console.log("failed to login user");
          router.push({ path: "/landing" });
        });
    }
  };

  return { user, loggedIn, register, update, logout, login, loadUser };
});
