<template padding>
  <div class="container">
    <q-card class="my-card" flat bordered>
      <q-img :src="imageLink" height="300px" />
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">{{ spot.title }}</div>
          <div class="text-subtitle2">
            Vehicle Type: {{ spot.vehicle_type }}
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-paragragh text-grey">
          {{ spot.description }}
        </div>
        <q-space />
        <div class="text-caption text-grey">
          {{ spot.city }},{{ spot.address }}
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions class="row">
        <q-btn
          filler
          v-if="!checkOwnership"
          class="col"
          color="primary"
          :to="`/parking-spot/${spot.id}`"
        >
          Book now
        </q-btn>
        <q-btn
          filler
          v-if="checkOwnership"
          class="col"
          color="positive"
          :to="`/update-spot/${spot.id}`"
        >
          Update
        </q-btn>
        <q-btn
          filler
          v-if="checkOwnership"
          class="col"
          color="negative"
          @click="deleteSpot(spot.id)"
        >
          Delete
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useParkingSpotStore } from "src/stores/ParkingSpotStore";
import { useUserStore } from "src/stores/UserStore";
import { computed } from "vue";

const userStore = useUserStore();
const parkingSpotStore = useParkingSpotStore();
const $q = useQuasar();

const checkOwnership = computed(() => userStore.user.id === props.spot.user_id);

const imageLink = computed(
  () => `http://127.0.0.1:8000/storage/parking-spots/${props.spot.id}.png`
);

const props = defineProps({
  spot: {
    type: Object,
    required: true,
  },
});
const deleteSpot = (id) => {
  $q.dialog({
    title: "Delete Parking Spot",
    message: "Are you sure you want to delete this parking spot?",
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      console.log(id);

      parkingSpotStore.deleteSpot(id);
      parkingSpotStore.getUserParkingSpots(userStore.user.id);
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};
</script>

<style lang="sass" scoped>
.container
  max-width: 400px
  margin: 15px
</style>
