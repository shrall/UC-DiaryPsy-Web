<template>
  <div
    id="loading-modal"
    class="admin-outer-modal"
    :class="isLoading ? 'flex' : 'hidden'"
  >
    <div
      class="bg-black opacity-50 absolute -z-10 min-w-full min-h-screen"
    ></div>
    <div class="text-light text-6xl animate-spin">
      <span class="fa fa-circle-notch"></span>
    </div>
  </div>
  <div class="grid grid-cols-12 font-nunito bg-neutral-100">
    <div class="col-span-2">
      <Sidebar activeNav="user" />
    </div>
    <div class="col-span-10 p-4">
      <div class="admin-card text-heading mb-8">{{ pageModel }} Detail</div>
      <div class="grid grid-cols-12 gap-x-4 gap-y-2">
        <div class="col-span-3 flex flex-col gap-y-2">
          <div class="admin-card flex flex-col items-center">
            <img
              :src="this.files_url + tempUser.photo"
              class="rounded-full w-36 h-36"
            />
            <div class="text-heading">{{ tempUser.name }}</div>
            <div class="text-subheading">{{ tempUser.email }}</div>
          </div>
          <div class="admin-card">
            <div class="text-heading">Action</div>
            <div class="grid grid-cols-2 justify-center items-center gap-2">
              <div class="admin-button-black col-span-2" @click="exportPDF()">
                <span class="fa fa-fw fa-file-export"></span>
                Export PDF
              </div>
              <router-link
                :to="{ path: `/user/edit/${this.id}` }"
                class="admin-button-blue col-span-2"
              >
                <span class="fa fa-fw fa-edit"></span>
                Edit
              </router-link>
              <!-- <div class="admin-button-red">
                <span class="fa fa-fw fa-trash"></span>
                Hapus
              </div> -->
            </div>
          </div>
        </div>
        <div class="col-span-9 admin-card">
          <div class="text-heading mb-4">Personal Detail</div>
          <div class="grid grid-cols-2 gap-y-2">
            <div class="flex flex-col">
              <div class="text-caption">Telepon</div>
              <div class="text-xl">{{ tempUser.phone }}</div>
            </div>
            <div class="flex flex-col">
              <div class="text-caption">Alamat</div>
              <div class="text-xl">{{ tempUser.address }}</div>
            </div>
            <div class="flex flex-col">
              <div class="text-caption">Institusi</div>
              <div class="text-xl">{{ tempUser.institute }}</div>
            </div>
            <div class="flex flex-col">
              <div class="text-caption">Kota</div>
              <div class="text-xl">{{ tempUser.city }}</div>
            </div>
            <div class="flex flex-col">
              <div class="text-caption">Agama</div>
              <div class="text-xl">{{ tempUser.religion }}</div>
            </div>
            <div class="flex flex-col">
              <div class="text-caption">Suku</div>
              <div class="text-xl">{{ tempUser.tribe }}</div>
            </div>
            <div class="flex flex-col">
              <div class="text-caption">Tahun Lahir</div>
              <div class="text-xl">{{ tempUser.year_born }}</div>
            </div>
          </div>
        </div>
        <!-- <div class="col-span-3 admin-card">
          <div class="text-heading mb-2">Completed Module</div>
          <div class="item-card">Kasih</div>
        </div> -->
        <div class="col-span-12 admin-card">
          <div class="flex justify-between mb-2">
            <div class="text-heading">Modul Yang Dimiliki</div>
            <div class="flex gap-x-2">
              <div
                :class="
                  editToggled ? 'admin-button-blue' : 'admin-button-white'
                "
                @click="toggleEdit"
              >
                <span class="fa fa-fw fa-edit"></span>
                Edit
              </div>
              <select class="admin-button-green" @change="addModule($event)">
                <option>Tambah Modul</option>
                <option
                  v-for="module in modules"
                  :key="module.id"
                  :value="module.id"
                >
                  {{ module.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-4 gap-2">
            <div
              class="item-card justify-between"
              v-for="data in tempUser.modules"
              :key="data.module.id"
            >
              {{ data.module.name }}
              <div
                class="admin-button-red"
                v-if="editToggled"
                @click="deleteModule(data.id)"
              >
                <span class="fa fa-fw fa-trash"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      tempUser: {
        name: null,
        email: null,
        year_born: null,
        phone: null,
        photo: null,
        address: null,
        institute: null,
        city: null,
        religion: null,
        tribe: null,
        modules: [],
      },
      modules: [],
      editToggled: false,
      pageModel: "User",
      isLoading: false,
      deleteClicked: false,
      tempModule: { name: null, id: null, status: null, color_hex: null },
    };
  },
  created() {
    this.getUserDetail();
    this.getAllModules();
  },
  methods: {
    exportPDF: function () {
      var printWindow = window.open(
        "http://uc-diarypsy.test/user/1",
        "Print",
        "left=200, top=200, width=950, height=500, toolbar=0, resizable=0"
      );
      printWindow.addEventListener(
        "load",
        function () {
          printWindow.print();
          printWindow.close();
        },
        true
      );
    },
    addModule: function (event) {
      const formData = new FormData();
      formData.append("module_id", event.target.value);
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post(`admin/user/${this.id}/module/add`, formData)
        .then((data) => {
          this.getUserDetail();
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
    deleteModule: function (id) {
      console.log(id);
      const formData = new FormData();
      formData.append("usermodule_id", id);
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .post(`admin/user/${this.id}/module/delete`, formData)
        .then((data) => {
          this.getUserDetail();
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
    getUserDetail: function () {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/user/" + this.id)
        .then((data) => {
          this.isLoading = false;
          this.tempUser.name = data.data.data.results.name;
          this.tempUser.email = data.data.data.results.email;
          this.tempUser.phone = data.data.data.results.phone;
          this.tempUser.photo = data.data.data.results.photo;
          this.tempUser.year_born = data.data.data.results.year_born;
          this.tempUser.address = data.data.data.results.address;
          this.tempUser.institute = data.data.data.results.institute.name;
          this.tempUser.city = data.data.data.results.city.name;
          this.tempUser.religion = data.data.data.results.religion.name;
          this.tempUser.education = data.data.data.results.education.name;
          this.tempUser.tribe = data.data.data.results.tribe.name;
          this.tempUser.modules = data.data.data.results.modules;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toggleEdit: function () {
      this.editToggled = !this.editToggled;
      if (!this.editToggled) {
        this.tempModule = {
          name: null,
          id: null,
          status: null,
          color_hex: null,
        };
      }
    },
    showDelete(id) {
      this.deleteClicked = true;
      this.tempModule = this.modules.find((obj) => {
        return obj.id === id;
      });
    },
    getAllModules: function () {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: "Bearer " + localStorage["access_token"] },
      });
      instance
        .get("/admin/module")
        .then((data) => {
          this.isLoading = false;
          this.modules = data.data.data.results.map((item) => {
            return {
              id: item.id,
              name: item.name,
              status: item.status,
              order: item.order,
              color_hex: item.color_hex,
            };
          });
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 401) {
            router.push("/login");
          }
        });
    },
  },
};
</script>