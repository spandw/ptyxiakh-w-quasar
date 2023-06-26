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

  const getAllParkingSpots = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/parking-spots")
      .then((response) => {
        console.log(response.data);
        parkingSpotList.value = response.data;
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

  const deleteSpot = (spotId) => {
    //parkingSpotList.value.splice(spotId,1)
    return axios
      .delete(`http://127.0.0.1:8000/api/delete-spot/${spotId}`)
      .then(console.log("delete ok"));
  };

  return {
    cities,
    parkingSpotList,
    getUniqueCities,
    getAllParkingSpots,
    createNewSpot,
    deleteSpot,
  };
});
