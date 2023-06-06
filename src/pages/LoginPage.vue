<template>

  <q-page-container>
    <q-page class="home-page window-height window-width row justify-center items-center">
      <q-card class="col justify-center q-pa-md " style="">

        <h5>Login To Access Website</h5>
          <q-form @submit.prevent="login" class="q-gutter-md">
            <q-input v-model="user.email" label="Email" />
            <q-input v-model="user.password" type="password" label="Password" />

            <div>
              <q-btn color="primary" type="submit" label="Login" />
            </div>
          </q-form>

        </q-card>
  </q-page>
    </q-page-container>
</template>

<script setup>

import { ref } from 'vue'
import { useUserStore } from 'src/stores/UserStore';
import { useRouter } from "vue-router";



const router = useRouter();
const userStore = useUserStore();

const user = ref({
  email: "",
  password: "",
})

const login = async () => {
  await userStore.login({
    email: user.value.email,
    password: user.value.password,

  }).then(() => {
    router.push({ path: '/about' });
  });
};
</script>

