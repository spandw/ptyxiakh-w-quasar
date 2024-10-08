<template>
  <q-page padding class="flex flex-center items-center">
    <q-card class="my-card" v-if="parkingSpot" flat bordered>
      <q-img :src="imageLink" />
      <q-card-section>
        <q-card-section class="q-pt-xs">
          <div class="text-h5 q-mt-sm q-mb-xs">{{ parkingSpot.title }}</div>
          <div class="text-overline">
            Space for your {{ parkingSpot.vehicle_type }}.
          </div>

          <div class="text-subtitle2">
            {{ parkingSpot.city }} , {{ parkingSpot.address }}
          </div>
          <div class="text-caption text-grey">
            {{ parkingSpot.description }}
          </div>
        </q-card-section>
      </q-card-section>
      <q-separator />
      <q-card-actions>
        <q-input
          bg-color="white"
          outlined
          :model-value="stringDate"
          class="q-mx-sm"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="date"
                  minimal
                  range
                  :options="filteredDateOptions"
                  @update:model-value="validateDate"
                  mask="YYYY-MM-DD"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-btn flat color="primary" @click="reserveSpot"> Reserve </q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import ParkingSpotCard from "src/components/ParkingSpotCard.vue";
import { useParkingSpotStore } from "src/stores/ParkingSpotStore";
import { useUserStore } from "src/stores/UserStore";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const parkingSpotStore = useParkingSpotStore();
const userStore = useUserStore();
const { parkingSpot, spotReservations } = storeToRefs(parkingSpotStore);
const stringDate = ref("");
const date = ref({
  from: "",
  to: "",
});
const $q = useQuasar();

const imageLink = computed(
  () =>
    `http://127.0.0.1:8000/storage/parking-spots/${parkingSpot.value.id}.png`
);

const id = ref(route.params.id);
parkingSpotStore.fetchParkingSpot(id.value);
await parkingSpotStore.getParkingSpotReservations(id.value);

console.log("apo to component: ", spotReservations.value);

const validateDate = () => {
  console.log(
    "date.value.from",
    date.value.from,
    "-",
    "date.value.to",
    date.value.to,
    "date.value",
    date.value
  );
  if (date.value.from) {
    stringDate.value = `${date.value.from} - ${date.value.to}`;
  } else {
    stringDate.value = date.value;
  }
};

const filteredDateOptions = (date) => {
  return !spotReservations.value?.includes(date);
};

const reserveSpot = () => {
  $q.dialog({
    title: "Reserve Parking Spot",
    message: "Are you sure you want to reseerve this parking spot?",
    cancel: true,
    persistent: true,
  }).onOk(() => {
    parkingSpotStore.reserveParkingSpot({
      parking_spot_id: id.value,
      start_date: date.value.from,
      end_date: date.value.to,
      date: date.value,
    });
    parkingSpotStore.getParkingSpotReservations(id.value);
    userStore.loadUser();
  });
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 60vh
</style>
