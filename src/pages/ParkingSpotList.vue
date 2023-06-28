<template>
  <q-page>
    <div
      class="fit row wrap justify-evenly content-start q-pa-md"
      style="margin-top: 100px"
    >
      <!-- <div class="q-col-gutter-md col"> -->
      <!-- :imageUrl="item.imageUrl" :imageAlt="item.imageAlt" -->
      <ParkingSpotCard
        v-for="(parking, index) in filteredSpots"
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
        <q-select
          class="q-mx-sm"
          bg-color="white"
          outlined
          v-model="selectedCity"
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          :options="filteredCities"
          @filter="filterFn"
          clearable
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-select
          class="q-mx-sm"
          bg-color="white"
          outlined
          v-model="selectedCarType"
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          :options="carTypes"
          clearable
        >
        </q-select>

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
                  range
                  minimal
                  @update:model-value="validateDate"
                  mask="DD/MM/YYYY"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </q-page-sticky>
  </q-page>
  <div style="color: antiquewhite">
    <!-- {{ filteredSpots.map(el => el.id) }}<br> -->
    {{ parkingSpotList.map((el) => el.id) }}
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import ParkingSpotCard from "src/components/ParkingSpotCard.vue";
import { useParkingSpotStore } from "src/stores/ParkingSpotStore";
import { computed, ref } from "vue";

const parkingSpotStore = useParkingSpotStore();

const { cities, parkingSpotList } = storeToRefs(parkingSpotStore);

await parkingSpotStore.getAllParkingSpots();
parkingSpotStore.getUniqueCities();

const selectedCity = ref(null);
const selectedCarType = ref(null);
const filteredCities = ref(null);
// const filteredSpots = ref(parkingSpotList.value)

const stringDate = ref("");
const date = ref({
  from: "01/01/2023",
  to: "02/01/2023",
});
const $q = useQuasar();

const carTypes = ["motorbike", "car", "suv", "truck"];

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

const filterFn = (val, update) => {
  update(() => {
    const needle = val.toLowerCase();
    filteredCities.value = cities.value.filter((v) => {
      return v.toLowerCase().indexOf(needle) > -1;
    });
  });
};

const filteredSpots = computed(() => {
  return parkingSpotList.value.filter((parkingSpot) => {
    return (
      (parkingSpot.city === selectedCity.value ||
        selectedCity.value === null) &&
      (selectedCarType.value === parkingSpot.vehicle_type ||
        selectedCarType.value === null)
    );
  });
});

//otan h polh tou parkingSpot einai idia me ti selectedCity || otan h selectedCity einai null
//otan to selectedCarType einai iso me to parkingSpot.vehicle_type || otan to selectedCarType einai null
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
        .then(parkingSpotStore.getAllParkingSpots());
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

const search = () => {
  console.log(selectedCity.value, selectedCarType.value);
};
</script>
