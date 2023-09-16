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
            <div class="text-h6">Edit your profile.</div>
          </q-card-section>
          <q-form @submit.prevent="update">
            <q-input filled v-model="user.name" label="Name" />
            <q-input filled v-model="user.last_name" label="Last Name" />
            <q-input filled v-model="user.username" label="Username" />
            <q-input filled v-model="user.email" label="Email" />
            <q-card-section padding>
              <q-btn-group spread>
                <q-btn color="primary" type="submit" label="Update" />
                <q-btn
                  color="negative"
                  type="submit"
                  label="Cancel"
                  to="/profile"
                />
              </q-btn-group>
            </q-card-section>
          </q-form>
        </q-card>
        <q-dialog v-model="alert">
          <q-card>
            <q-card-section>
              <div class="text-h6">Details update</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              User Details Updated Successfully!
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "src/stores/UserStore";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";

const router = useRouter();
const userStore = useUserStore();
const $q = useQuasar();
const alert = ref(false);

const { user } = storeToRefs(userStore);

const update = async () => {
  $q.dialog({
    title: "Edit User Details.",
    message: "Are you sure you want to edit user?",
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      userStore
        .update({
          username: user.value.username,
          name: user.value.name,
          last_name: user.value.last_name,
          email: user.value.email,
        })
        .then(() => {
          //alert.value = true;
          router.push({ path: "/profile" });
        });
      // .finally(() => {
      //   router.push("/home");
      // });
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      //router.push({ path: "/" });
    });
};
</script>
