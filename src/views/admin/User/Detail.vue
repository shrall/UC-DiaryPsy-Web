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
  <div
    id="delete-modal"
    class="admin-outer-modal"
    :class="deleteClicked ? 'flex' : 'hidden'"
  >
    <div
      class="bg-black opacity-50 absolute -z-10 min-w-full min-h-screen"
    ></div>
    <div class="admin-modal">
      <div @click="deleteClicked = false">
        <span class="fa fa-fw fa-times admin-close-modal-button"></span>
      </div>
      <div class="text-2xl">
        Apakah kamu yakin ingin menghapus modul
        <span class="font-bold">{{ tempModule.name }}</span> dari user ini?
      </div>
      <div class="admin-button-red">
        <span class="fa fa-fw fa-trash"></span>Hapus
      </div>
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
              src="https://images.unsplash.com/photo-1508185159346-bb1c5e93ebb4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=55cf14db6ed80a0410e229368963e9d8&auto=format&fit=crop&w=1900&q=80"
              class="rounded-full w-36 h-36"
            />
            <div class="text-heading">User Name</div>
            <div class="text-subheading">email@user.com</div>
          </div>
          <div class="admin-card">
            <div class="text-heading">Action</div>
            <div class="flex items-center gap-2">
              <div class="admin-button-blue">
                <span class="fa fa-fw fa-edit"></span>
                Edit
              </div>
              <div class="admin-button-red">
                <span class="fa fa-fw fa-trash"></span>
                Hapus
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-6 admin-card">
          <div class="text-heading mb-4">Personal Detail</div>
          <div class="grid grid-cols-2 gap-y-2">
            <div class="flex flex-col">
              <div class="text-caption">Telepon</div>
              <div class="text-xl">01882138</div>
            </div>
            <div class="flex flex-col">
              <div class="text-caption">Alamat</div>
              <div class="text-xl">Jl. Mawar 123</div>
            </div>
            <div class="flex flex-col">
              <div class="text-caption">Institusi</div>
              <div class="text-xl">Universitas ABC</div>
            </div>
            <div class="flex flex-col">
              <div class="text-caption">Kota</div>
              <div class="text-xl">Surabaya</div>
            </div>
            <div class="flex flex-col">
              <div class="text-caption">Agama</div>
              <div class="text-xl">Kristen</div>
            </div>
            <div class="flex flex-col">
              <div class="text-caption">Suku</div>
              <div class="text-xl">Tionghoa</div>
            </div>
            <div class="flex flex-col">
              <div class="text-caption">Tahun Lahir</div>
              <div class="text-xl">2001</div>
            </div>
          </div>
        </div>
        <div class="col-span-3 admin-card">
          <div class="text-heading mb-2">Completed Module</div>
          <div class="item-card">Kasih</div>
        </div>
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
                Toggle
              </div>
              <select class="admin-button-green">
                <option>Tambah Modul</option>
                <option value="1">Kasih</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-4 gap-2">
            <div
              class="item-card justify-between"
              v-for="module in modules"
              :key="module.id"
            >
              {{ module.name }}
              <div
                class="admin-button-red"
                v-if="editToggled"
                @click="showDelete(module.id)"
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
export default {
  components: {},
  props: ["id"],
  created() {
    console.log(this.id);
  },
  data() {
    return {
      modules: [
        { name: "Kasih", id: 1, status: 1, color_hex: "#fffe00" },
        { name: "Sukacita", id: 2, status: 1, color_hex: "#fffe00" },
        { name: "Damai Sejahtera", id: 3, status: 0, color_hex: "#fffe00" },
        { name: "Kesabaran", id: 4, status: 0, color_hex: "#fffe00" },
        { name: "Kemurahan", id: 5, status: 0, color_hex: "#fffe00" },
      ],
      editToggled: false,
      pageModel: "User",
      isLoading: false,
      deleteClicked: false,
      tempModule: { name: null, id: null, status: null, color_hex: null },
    };
  },
  methods: {
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
      console.log(this.tempModule);
      this.tempModule = this.modules.find((obj) => {
        return obj.id === id;
      });
    },
  },
};
</script>