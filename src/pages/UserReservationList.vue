<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        title="Reservations"
        :rows="rows"
        :columns="columns"
        row-key="reservation"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              color="negative"
              icon="delete"
              @click="deleteReservation()"
            ></q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useParkingSpotStore } from "src/stores/ParkingSpotStore";

const parkingSpotStore = useParkingSpotStore();
await parkingSpotStore.getUserReservations();

const { userReservations } = storeToRefs(parkingSpotStore);
const columns = [
  {
    name: "reservation",
    required: true,
    label: "Reservation",
    align: "left",
    field: (row) => row.reservation,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "parkingSpot",
    align: "center",
    label: "Parking Spot",
    field: "parkingSpot",
    sortable: true,
  },
  { name: "from", label: "Starting Date", field: "from", sortable: true },
  { name: "to", label: "Ending Date", field: "to", sortable: true },
  { name: "actions", label: "Actions", field: "actions" },
];

const rows = [
  {
    reservation: userReservations.value.id,
    parkingSpot: 159,
    from: 6.0,
    to: 24,
  },
];

console.log(userReservations.value);
</script>
