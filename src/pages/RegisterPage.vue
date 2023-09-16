<template>
  <q-page padding>
    <!-- content -->
    <div
      class="full-width column wrap justify-center items-center content-start"
      style="height: 80vh"
    >
      <div class="fit row wrap justify-center items-center content-center">
        <q-card class="my-card justify-center">
          <q-card-section style>
            <div class="text-h6">Fill your details to register.</div>
          </q-card-section>
          <q-form @submit.prevent="register">
            <q-input filled v-model="user.name" label="Name" />
            <q-input filled v-model="user.last_name" label="Last Name" />
            <q-input filled v-model="user.username" label="Username" />
            <q-input filled v-model="user.email" label="Email" />
            <q-input
              filled
              v-model="user.password"
              type="password"
              label="Password"
            />
            <q-input
              filled
              v-model="user.password_confirmation"
              type="password"
              label="Confirm Password"
            />

            <div>
              <q-btn color="primary" type="submit" label="Register" />
            </div>
          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "src/stores/UserStore";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();

const user = ref({
  username: "",
  name: "",
  last_name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const register = async () => {
  await userStore
    .register({
      username: user.value.username,
      name: user.value.name,
      last_name: user.value.last_name,
      email: user.value.email,
      password: user.value.password,
      password_confirmation: user.value.password_confirmation,
    })
    .then(() => {
      router.push({ path: "/" });
    });
};
</script>
