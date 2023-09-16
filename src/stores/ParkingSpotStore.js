import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useUserStore } from "./UserStore";
import { route } from "quasar/wrappers";

export const useParkingSpotStore = defineStore("parkingSpotStore", () => {
  const router = useRouter();
  const userStore = useUserStore();

  const parkingSpot = ref(null);
  const parkingSpotList = ref(null);
  const cities = ref([]);
  const spotReservations = ref([]);

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

  const createNewSpot = async (credentials) => {
    return axios.post("http://127.0.0.1:8000/api/create-spot", credentials);
  };

  const updateParkingSpot = async (credentials) => {
    console.log("credentials: ", credentials);
    return axios.post(
      `http://127.0.0.1:8000/api/update-spot/${credentials.id}`,
      credentials
    );
  };

  const deleteSpot = (spotId) => {
    //parkingSpotList.value.splice(spotId,1)
    return axios
      .delete(`http://127.0.0.1:8000/api/delete-spot/${spotId}`)
      .then(console.log("delete ok"));
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

  return {
    cities,
    parkingSpotList,
    parkingSpot,
    spotReservations,
    getUniqueCities,
    getAllParkingSpots,
    getUserParkingSpots,
    createNewSpot,
    updateParkingSpot,
    fetchParkingSpot,
    deleteSpot,
    getParkingSpotReservations,
    filterParkingSpotByDate,
  };
});
