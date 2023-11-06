<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        v-if="userReservations"
        title="Reservations"
        :rows="userReservations"
        :columns="columns"
        row-key="reservation"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              color="primary"
              icon="search"
              :to="`/parking-spot/${props.row.parking_spot_id}`"
              ><q-tooltip> See parking spot </q-tooltip></q-btn
            >
            <q-btn
              color="negative"
              icon="delete"
              @click="deleteReservation(props.row.id)"
              ><q-tooltip> Cancel Reservation </q-tooltip></q-btn
            >
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { useParkingSpotStore } from "src/stores/ParkingSpotStore";
import { ref } from "vue";
import { date } from "quasar";

const parkingSpotStore = useParkingSpotStore();
const $q = useQuasar();

const { userReservations } = storeToRefs(parkingSpotStore);
await parkingSpotStore.getUserReservations();
console.log("Apo to component: ", userReservations.value);

const columns = [
  {
    name: "id",
    required: true,
    label: "Reservation",
    align: "left",
    field: "id",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "title",
    required: true,
    label: "Title",
    align: "left",
    field: (row) => row.parkingspot.title,
    sortable: true,
  },
  {
    name: "city",
    required: true,
    label: "City",
    align: "left",
    field: (row) => row.parkingspot.city,
    sortable: true,
  },
  {
    name: "address",
    required: true,
    label: "Address",
    align: "left",
    field: (row) => row.parkingspot.address,
    sortable: true,
  },
  {
    name: "from",
    label: "Starting Date",
    field: (row) => date.formatDate(row.start_date, "DD-MM-YYYY"),
    sortable: true,
  },
  {
    name: "to",
    label: "Ending Date",
    field: (row) => date.formatDate(row.end_date, "DD-MM-YYYY"),
    sortable: true,
  },
  { name: "actions", label: "Actions", field: "actions" },
];

const deleteReservation = (id) => {
  $q.dialog({
    title: "Cancel reservation.",
    message: "Are you sure you want to cancel this reservation?",
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      parkingSpotStore.cancelReservation(id);
      console.log("Delete:", id);
      parkingSpotStore.getUserReservations();
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};
</script>
