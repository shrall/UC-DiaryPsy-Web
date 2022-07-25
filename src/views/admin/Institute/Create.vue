<template>
  <div class="grid grid-cols-12 font-nunito bg-neutral-100">
    <div class="col-span-2">
      <Sidebar activeNav="institute" />
    </div>
    <div class="col-span-10 p-4">
      <form method="post" id="create-institute">
        <div class="admin-card text-heading mb-8">Buat {{ pageModel }}</div>
        <div class="flex flex-col gap-y-2 admin-card">
          <div class="flex flex-col group">
            <label for="name" class="admin-input-label-kasih">Name</label>
            <input
              type="text"
              name="name"
              class="admin-input-kasih"
              v-model="tempInstitute.name"
            />
          </div>
          <div class="flex items-center justify-end">
            <div class="admin-button-green" @click="createInstitute()">Submit</div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "../components/Sidebar.vue";
</script>

<script>
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      pageModel: "Institute",
      tempInstitute: {
        name: null,
      },
      isLoading: false,
    };
  },
  methods: {
    createInstitute() {
      const formData = new FormData();
      formData.append("name", this.tempInstitute.name);
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: 'Bearer ' + localStorage['access_token'] },
      });
      instance
        .post("admin/institute", formData)
        .then((data) => {
          this.isLoading = false;
          this.$router.push("/institute");
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
  },
};
</script>