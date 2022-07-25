<template>
  <div class="grid grid-cols-12 font-nunito bg-neutral-100">
    <div class="col-span-2">
      <Sidebar activeNav="tribe" />
    </div>
    <div class="col-span-10 p-4">
      <form method="post" id="create-tribe">
        <div class="admin-card text-heading mb-8">Buat {{ pageModel }}</div>
        <div class="flex flex-col gap-y-2 admin-card">
          <div class="flex flex-col group">
            <label for="name" class="admin-input-label-kasih">Name</label>
            <input
              type="text"
              name="name"
              class="admin-input-kasih"
              v-model="tempTribe.name"
            />
          </div>
          <div class="flex items-center justify-end">
            <div class="admin-button-green" @click="updateTribe()">Submit</div>
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
  props: ["id"],
  data() {
    return {
      pageModel: "Tribe",
      tempTribe: {
        name: null,
      },
      isLoading: true,
    };
  },
  created() {
    this.getTribeDetail();
  },
  methods: {
    getTribeDetail: function () {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: 'Bearer ' + localStorage['access_token'] },
      });
      instance
        .get("/admin/tribe/" + this.id)
        .then((data) => {
          this.isLoading = false;
          this.tempTribe.name = data.data.data.results.name;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateTribe() {
      const formData = new FormData();
      formData.append("name", this.tempTribe.name);
      formData.append("_method", "PATCH");
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: 'Bearer ' + localStorage['access_token'] },
      });
      instance
        .post("admin/tribe/" + this.id, formData)
        .then((data) => {
          this.isLoading = false;
          this.$router.push("/tribe");
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
  },
};
</script>