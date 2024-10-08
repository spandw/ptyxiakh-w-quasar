import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useUserStore } from "./UserStore";
import { route } from "quasar/wrappers";
import { useQuasar } from "quasar";

export const useParkingSpotStore = defineStore("parkingSpotStore", () => {
  const router = useRouter();
  const userStore = useUserStore();
  const $q = useQuasar();

  const parkingSpot = ref(null);
  const parkingSpotList = ref(null);
  const cities = ref([]);
  const spotReservations = ref([]);
  const userReservations = ref([]);

  const getAllParkingSpots = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/parking-spots")
      .then((response) => {
        console.log("Get all parking spots(store): ", response.data);
        parkingSpotList.value = response.data;
        //console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  const getUserParkingSpots = async (userId) => {
    await axios
      .get(`http://127.0.0.1:8000/api/parking-spots/${userId}`)
      .then((response) => {
        console.log(userStore.user.id);
        console.log(response.data);
        parkingSpotList.value = response.data;
        //console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  const getUserReservations = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/user-reservations")
      .then((response) => {
        userReservations.value = response.data;
        console.log("sto store: ", userReservations.value);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const fetchParkingSpot = async (id) => {
    console.log("psaxnw gia spot");
    await axios
      .get(`http://127.0.0.1:8000/api/parking-spot/${id}`)
      .then((response) => {
        console.log(response.data);
        parkingSpot.value = response.data;
        //console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const getUniqueCities = () => {
    axios
      .get("http://127.0.0.1:8000/api/cities")
      .then((response) => {
        console.log(response.data);
        cities.value = response.data;
        //console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const createNewSpot = async (data) => {
    return axios
      .post("http://127.0.0.1:8000/api/create-spot", data)
      .then((response) => {
        $q.notify({
          color: "positive",
          message: response.data.message,
          icon: "report_problem",
        });
        router.push({ path: "/" });
      })
      .catch((error) => {
        $q.notify({
          color: "negative",
          message: error.response.data.message,
          icon: "report_problem",
        });
      });
  };

  const updateParkingSpot = async (data) => {
    console.log("data: ", data);
    return axios
      .post(`http://127.0.0.1:8000/api/update-spot/${data.id}`, data)
      .then(
        $q.notify({
          color: "positive",
          message: response.data.message,
          icon: "report_problem",
        })
      );
  };

  const deleteSpot = async (spotId) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/delete-spot/${spotId}`
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

  const getParkingSpotReservations = async (spotId) => {
    await axios
      .get(`http://127.0.0.1:8000/api/check/${spotId}`)
      .then((response) => {
        console.log("sto store: ", response.data);
        spotReservations.value = response.data;
        //console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const filterParkingSpotByDate = async (date) => {
    await axios
      .get(
        `http://127.0.0.1:8000/api/check?start_date=${
          date.value.from ?? date.value
        }&end_date=${date.value.to ?? ""}`
      )
      .then((response) => {
        console.log("Reservations Object:", response.data);
        parkingSpotList.value = response.data.available_spots;
        console.log(
          "New Spot List(after date filter): ",
          parkingSpotList.value
        );
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const reserveParkingSpot = async (data) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/create-reservation",
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

  const cancelReservation = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/cancel-reservation/${id}`
      );
      $q.notify({
        color: "warning",
        message: response.data.message,
        icon: "report_problem",
      });
    } catch (error) {
      $q.notify({
        color: "negative",
        message: error.response.data.message,
        icon: "report_problem",
      });
    }
  };

  return {
    cities,
    parkingSpotList,
    parkingSpot,
    spotReservations,
    userReservations,
    getUniqueCities,
    getAllParkingSpots,
    getUserParkingSpots,
    createNewSpot,
    updateParkingSpot,
    fetchParkingSpot,
    deleteSpot,
    getParkingSpotReservations,
    filterParkingSpotByDate,
    reserveParkingSpot,
    getUserReservations,
    cancelReservation,
  };
});
