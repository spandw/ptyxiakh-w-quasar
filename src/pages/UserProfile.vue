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
        :title="parking.title"
        :description="parking.description"
        :address="parking.address"
        :city="parking.city"
        :price="parking.price"
        :id="parking.id"
        :userId="parking.user_id"
        :deleteSpot="deleteSpot"
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
          <q-btn push color="positive" label="Add Currency" icon="payments" />
          <q-btn
            push
            color="positive"
            label="Edit User Information"
            icon="person"
          />
        </q-btn-group>
      </div>
    </q-page-sticky>
  </q-page>
</template>
<script setup>
import { useUserStore } from "src/stores/UserStore";
import { useParkingSpotStore } from "src/stores/ParkingSpotStore";
import ParkingSpotCard from "src/components/ParkingSpotCard.vue";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";

// const userStore = useUserStore();
const parkingSpotStore = useParkingSpotStore();

parkingSpotStore.getUserParkingSpots(user.id);

const { parkingSpotList } = storeToRefs(parkingSpotStore);

const deleteSpot = (id) => {
  $q.dialog({
    title: "Delete Parking Spot",
    message: "Are you sure you want to delete this parking spot?",
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      console.log(id);
      parkingSpotStore
        .deleteSpot(id)
        .then(parkingSpotStore.getUserParkingSpots(userStore.user.id));
    })
    .onOk(() => {
      console.log(">>>> second OK catcher");
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};
</script>
