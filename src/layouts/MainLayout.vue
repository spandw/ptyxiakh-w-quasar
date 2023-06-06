<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated v-if="userStore.loggedIn">
      <q-toolbar>
        <q-btn-group push>
          <q-btn push label="Home" icon="home" to="/home" />
          <q-btn push label="Search For Spot" icon="visibility" to="/about" />
        </q-btn-group>
        <q-space />
        <q-btn color="accent" icon="add" label="Add New Spot" to="create-spot" />
          <q-btn-dropdown color="accent" :label=userStore.user.username>
            <div class="row no-wrap q-pa-sm">
              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                </q-avatar>
                <q-list dense padding>
                  <q-item>
                    <q-item-section>
                      <q-btn color="positive" label="My Spots" push size="m" v-close-popup to="my-spots" />
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section>
                      <q-btn color="primary" label="Logout" push size="m" v-close-popup @click="userStore.logout()" />
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-page-container>

      <Suspense>
        <!-- component with nested async dependencies -->
        <router-view />

        <!-- loading state via #fallback slot -->
        <template #fallback>
          Loading...
        </template>
      </Suspense>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useParkingSpotStore } from 'src/stores/ParkingSpotStore';
import { useUserStore } from 'src/stores/UserStore';

const userStore = useUserStore();
const parkingSpotStore = useParkingSpotStore();


userStore.loadUser()




</script>
