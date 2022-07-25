<template>
  <div class="grid grid-cols-12 font-nunito bg-neutral-100">
    <div class="col-span-2">
      <Sidebar activeNav="religion" />
    </div>
    <div class="col-span-10 p-4">
      <form method="post" id="create-religion">
        <div class="admin-card text-heading mb-8">Buat {{ pageModel }}</div>
        <div class="flex flex-col gap-y-2 admin-card">
          <div class="flex flex-col group">
            <label for="name" class="admin-input-label-kasih">Name</label>
            <input
              type="text"
              name="name"
              class="admin-input-kasih"
              v-model="tempReligion.name"
            />
          </div>
          <div class="flex items-center justify-end">
            <div class="admin-button-green" @click="updateReligion()">Submit</div>
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
      pageModel: "Religion",
      tempReligion: {
        name: null,
      },
      isLoading: true,
    };
  },
  created() {
    this.getReligionDetail();
  },
  methods: {
    getReligionDetail: function () {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: 'Bearer ' + localStorage['access_token'] },
      });
      instance
        .get("/admin/religion/" + this.id)
        .then((data) => {
          this.isLoading = false;
          this.tempReligion.name = data.data.data.results.name;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateReligion() {
      const formData = new FormData();
      formData.append("name", this.tempReligion.name);
      formData.append("_method", "PATCH");
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: 'Bearer ' + localStorage['access_token'] },
      });
      instance
        .post("admin/religion/" + this.id, formData)
        .then((data) => {
          this.isLoading = false;
          this.$router.push("/religion");
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
  },
};
</script>