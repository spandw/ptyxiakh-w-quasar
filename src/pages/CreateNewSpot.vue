<template>
  <q-page padding>
    <!-- content -->
    <div
      class="full-width column wrap justify-center items-center content-start"
    >
      <div class="fit row wrap justify-center items-center content-center">
        <q-card class="my-card justify-center">
          <q-form @submit.prevent="createNewSpot()">
            <q-input filled v-model="newSpot.title" label="Title" />
            <q-input
              filled
              v-model="newSpot.description"
              label="Description"
              type="textarea"
              maxlength="128"
            />
            <q-input filled v-model="newSpot.city" label="City" />
            <q-input filled v-model="newSpot.address" label="Address" />
            <div class="q-gutter-sm">
              <q-radio
                v-model="newSpot.type"
                val="motorbike"
                label="Motorbike"
              />
              <q-radio v-model="newSpot.type" val="car" label="Car" />
              <q-radio v-model="newSpot.type" val="suv" label="SUV" />
              <q-radio v-model="newSpot.type" val="truck" label="Truck" />
            </div>
            <q-file
              filled
              v-model="photo"
              label="Upload a photo for your spot."
              @input="filepicked"
            />

            <div>
              <q-btn label="Add new spot" color="primary" @click="confirm" />
            </div>
          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useParkingSpotStore } from "src/stores/ParkingSpotStore";
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const parkingSpotStore = useParkingSpotStore();
const $q = useQuasar();
const router = useRouter();
const newSpot = ref({
  title: "",
  description: "",
  city: "",
  address: "",
  type: "car",
  photo: "",
});

const photo = ref();

const createNewSpot = () => {
  parkingSpotStore
    .createNewSpot({
      title: newSpot.value.title,
      description: newSpot.value.description,
      city: newSpot.value.city,
      address: newSpot.value.address,
      type: newSpot.value.type,
      photo: newSpot.value.photo,
    })
    .then(() => {
      console.log("spot created");
    })
    .catch(() => {
      console.log("failed to create spot");
    });
};

const filepicked = (file) => {
  var filereader = new FileReader();
  filereader.readAsDataURL(file.target.files[0]);
  filereader.onload = function (evt) {
    var base64 = evt.target.result;
    newSpot.value.photo = base64;
  };
};

const confirm = () => {
  $q.dialog({
    title: "Confirm",
    message: "Would you like to create this spot?",
    cancel: true,
    persistent: true,
  }).onOk(() => {
    createNewSpot();
  });
};
</script>
