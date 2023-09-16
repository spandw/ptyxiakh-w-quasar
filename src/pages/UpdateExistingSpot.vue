<template>
  <q-page padding>
    <!-- content -->
    <div
      class="full-width column wrap justify-center items-center content-start"
    >
      <div
        v-if="parkingSpot"
        class="fit row wrap justify-center items-center content-center"
      >
        <q-card class="my-card justify-center">
          <q-form @submit.prevent="updateParkingSpot()">
            <q-input filled v-model="parkingSpot.title" label="Title" />
            <q-input
              filled
              v-model="parkingSpot.description"
              label="Description"
              vehicle_type="textarea"
              maxlength="128"
            />
            <q-input filled v-model="parkingSpot.city" label="City" />
            <q-input filled v-model="parkingSpot.address" label="Address" />
            <div class="q-gutter-sm">
              <q-radio
                v-model="parkingSpot.vehicle_type"
                val="motorbike"
                label="Motorbike"
              />
              <q-radio
                v-model="parkingSpot.vehicle_type"
                val="car"
                label="Car"
              />
              <q-radio
                v-model="parkingSpot.vehicle_type"
                val="suv"
                label="SUV"
              />
              <q-radio
                v-model="parkingSpot.vehicle_type"
                val="truck"
                label="Truck"
              />
            </div>
            <q-file
              filled
              v-model="photo"
              label="Upload a photo for your spot."
              @input="filepicked"
            />

            <div>
              <q-btn label="Update Spot" color="primary" @click="confirm" />
            </div>
          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { useParkingSpotStore } from "src/stores/ParkingSpotStore";

import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const parkingSpotStore = useParkingSpotStore();
const route = useRoute();
const { parkingSpot } = storeToRefs(parkingSpotStore);
const $q = useQuasar();
const router = useRouter();
const photo = ref();
const id = ref(route.params.id);
parkingSpotStore.fetchParkingSpot(id.value);

const updateParkingSpot = () => {
  parkingSpotStore
    .updateParkingSpot({
      title: parkingSpot.value.title,
      description: parkingSpot.value.description,
      city: parkingSpot.value.city,
      address: parkingSpot.value.address,
      vehicle_type: parkingSpot.value.vehicle_type,
      photo: parkingSpot.value.photo,
      id: id.value,
    })
    .then(() => {
      console.log("Spot Updated");
    })
    .catch(() => {
      console.log("failed to update spot");
    });
};

const confirm = () => {
  $q.dialog({
    title: "Confirm",
    message: "Would you like to update the spot?",
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      updateParkingSpot();
      router.push({ path: "/" });
      // console.log('>>>> OK')
    })
    .onOk(() => {
      // console.log('>>>> second OK catcher')
    })
    .onCancel(() => {
      console.log(">>>> Cancel");
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};

const filepicked = (file) => {
  // parkingSpot.value.photo = window.URL.createObjectURL(photo.value);
  var filereader = new FileReader();
  filereader.readAsDataURL(file.target.files[0]);
  filereader.onload = function (evt) {
    var base64 = evt.target.result;
    parkingSpot.value.photo = base64;
  };
};
</script>
