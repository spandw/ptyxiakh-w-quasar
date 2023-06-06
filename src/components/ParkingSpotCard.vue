<template padding>
  <div class="container">
    <q-card class="my-card" flat bordered>
      <!-- <q-img :src="require(`/src/assets/${imageUrl}`)" /> -->
      <q-img
        src="https://img.freepik.com/free-photo/underground-car-parking-shopping-center_93675-134540.jpg?size=626&ext=jpg" />
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{ title }}
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-paragragh text-grey">
          {{ description }}
        </div>
        <q-space />
        <div class="text-caption text-grey">
          {{ city }},{{ address }}
        </div>
        <div class="text-h6">
          {{ price }}€
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions class="row">
        <q-btn filler class="col" color="primary">
          Book now
        </q-btn>
        <q-btn filler v-if="checkOwnership" class="col" color="positive">
          Update
        </q-btn>
        <q-btn filler v-if="checkOwnership" class="col" color="negative" @click="deleteSpot(id)">
          Delete
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { useParkingSpotStore } from 'src/stores/ParkingSpotStore';
import { useUserStore } from 'src/stores/UserStore';
import { computed } from 'vue';

const userStore = useUserStore()
const parkingSpotStore = useParkingSpotStore()




const checkOwnership = computed(() => userStore.user.id == props.userId);

const props = defineProps({
  imageUrl: {
    type: String,
    required: false,
  },
  imageAlt: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  deleteSpot: {
    type: Function,
    required: true
  }

})




</script>

<style lang="sass" scoped>
.container
  max-width: 400px
  margin: 15px
  </style>
