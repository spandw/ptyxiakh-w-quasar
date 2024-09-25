<template>
  <q-page>
    <div
      class="fit row wrap justify-evenly content-start q-pa-md"
      style="margin-top: 100px"
    >
      <!-- <div class="q-col-gutter-md col"> -->
      <!-- :imageUrl="item.imageUrl" :imageAlt="item.imageAlt" -->
      <ParkingSpotCard
        v-for="(parking, index) in parkingSpotList"
        :key="index"
        :spot="parking"
      />

      <!-- </div> -->
    </div>
    <q-page-sticky
      expand
      position="top"
      style="background-color: #4f759b; opacity: 100%"
    >
      <div
        class="flex fit row wrap justify-center items-start content-center q-pa-md"
      >
        <q-btn-group push>
          <!-- <q-btn push color="positive" label="Add Currency" icon="payments" /> -->
          <q-btn
            push
            color="positive"
            label="Edit User Information"
            icon="person"
            to="/edit-user"
          />
        </q-btn-group>
      </div>
    </q-page-sticky>
  </q-page>
</template>
<script setup>
import ParkingSpotCard from "src/components/ParkingSpotCard.vue";
import { useUserStore } from "src/stores/UserStore";
import { storeToRefs } from "pinia";
import { useParkingSpotStore } from "src/stores/ParkingSpotStore";
import { useQuasar } from "quasar";

const userStore = useUserStore();
const parkingSpotStore = useParkingSpotStore();
const { user } = storeToRefs(userStore);
const { parkingSpotList } = storeToRefs(parkingSpotStore);
const $q = useQuasar();

parkingSpotStore.getUserParkingSpots(user.value.id);
</script>
