import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import axios from "axios";
import { computed, ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const router = useRouter();
  const user = ref(null);
  const loggedIn = computed(() => !!user.value);

  const register = async (credentials) => {
    return axios.post("http://127.0.0.1:8000/api/register", credentials);
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
      router.push({ path: "/" });
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
        });
    }
  };


  return { user, loggedIn, register, logout, login, loadUser };
});
