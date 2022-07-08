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
        Apakah kamu yakin ingin menghapus {{ pageModel }} dengan data
      </div>
      <table>
        <tr>
          <td>Nama</td>
          <td>: {{ tempModule.name }}</td>
        </tr>
        <tr>
          <td>Status</td>
          <td>: {{ tempModule.status == "0" ? "Tidak Aktif" : "Aktif" }}</td>
        </tr>
        <tr>
          <td>Color Hex</td>
          <td>: {{ tempModule.color_hex }}</td>
        </tr>
      </table>
      <div class="admin-button-red" @click="deleteModule">
        <span class="fa fa-fw fa-trash"></span>Hapus
      </div>
    </div>
  </div>
  <div class="grid grid-cols-12 font-nunito bg-neutral-100">
    <div class="col-span-2">
      <Sidebar activeNav="module" />
    </div>
    <div class="col-span-10 p-4">
      <div class="admin-card text-heading mb-8">{{ pageModel }}</div>
      <div class="grid grid-cols-12 gap-x-4">
        <div class="col-span-4 admin-card">
          <div class="flex justify-between mb-4">
            <div class="text-heading">Urutan {{ pageModel }}</div>
            <div
              :class="editToggled ? 'admin-button-blue' : 'admin-button-white'"
              @click="toggleEdit"
            >
              <span class="fa fa-fw fa-edit"></span>
              Toggle
            </div>
          </div>
          <draggable
            :list="modules"
            :disabled="!enabled"
            handle=".model-item-drag-handle"
            item-key="order"
            class="list-group"
            :move="checkMove"
            @start="dragging = true"
            @end="dragEnd"
          >
            <template #item="{ element }">
              <div
                class="list-group-item item-card"
                :class="{ 'not-draggable': !enabled }"
              >
                <span
                  class="fa fa-fw fa-circle"
                  :class="
                    element.status == 1 ? 'text-lime-600' : 'text-kasih-400'
                  "
                ></span>
                {{ element.name }}
                <div class="model-item-drag-handle p-1" v-if="!editToggled">
                  <span class="fas fa-ellipsis-v"></span>
                  <span class="fas fa-ellipsis-v"></span>
                </div>
                <div class="flex gap-2 ml-auto" v-else>
                  <div @click="showEdit(element.id)">
                    <span class="admin-button-blue fa fa-fw fa-edit"></span>
                  </div>
                  <div @click="showDelete(element.id)">
                    <span class="admin-button-red fa fa-fw fa-trash-can"></span>
                  </div>
                </div>
              </div>
            </template>
          </draggable>
        </div>
        <div class="col-span-8 admin-card">
          <div class="flex justify-between mb-4">
            <div class="text-heading">
              {{ !tempModule.id ? "Tambah " + pageModel : "Edit " + pageModel }}
            </div>
          </div>
          <div class="flex flex-col gap-y-2">
            <form id="create-module" method="post">
              <div class="flex flex-col group">
                <label for="name" class="admin-input-label-kasih">Name</label>
                <input
                  type="text"
                  name="name"
                  class="admin-input-kasih"
                  v-model="tempModule.name"
                />
              </div>
              <div class="flex flex-col group">
                <label for="status" class="admin-input-label-kasih"
                  >Status
                </label>
                <select
                  name="status"
                  id="status"
                  class="admin-input-kasih"
                  v-model="tempModule.status"
                >
                  <option value="1">Aktif</option>
                  <option value="0">Tidak Aktif</option>
                </select>
              </div>
              <div class="flex flex-col group">
                <label for="color" class="admin-input-label-kasih"
                  >Color Hex
                </label>
                <input
                  placeholder="contoh: #FFFFFF"
                  type="text"
                  name="color_hex"
                  class="admin-input-kasih"
                  v-model="tempModule.color_hex"
                />
              </div>
            </form>
            <div class="flex">
              <button
                @click="!tempModule.id ? createModule() : updateModule()"
                type="submit"
                :disabled="
                  !tempModule.name ||
                  !tempModule.status ||
                  !tempModule.color_hex
                "
                class="font-bold text-lg"
                :class="
                  !tempModule.id ? 'admin-button-green' : 'admin-button-blue'
                "
              >
                {{ !tempModule.id ? "Tambah" : "Simpan" }}
              </button>
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
import draggable from "vuedraggable";
import axios from "axios";
let id = 1;
export default {
  components: {
    draggable,
  },
  data() {
    return {
      pageModel: "Modul",
      enabled: true,
      modules: [],
      editToggled: false,
      tempModule: {
        name: null,
        id: null,
        status: null,
        order: null,
        color_hex: null,
      },
      deleteClicked: false,
      isLoading: false,
    };
  },
  created() {
    this.getAllModules();
  },
  methods: {
    resetModule: function () {
      this.tempModule = {
        name: null,
        id: null,
        status: null,
        order: null,
        color_hex: null,
      };
    },
    toggleEdit: function () {
      this.editToggled = !this.editToggled;
      if (!this.editToggled) {
        this.resetModule();
      }
    },
    dragEnd: function (e) {
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
      });
      instance
        .post("admin/module/reorder", {
          modules: this.modules,
        })
        .then((data) => {
          this.isLoading = false;
          this.getAllModules();
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showEdit(id) {
      this.tempModule = this.modules.find((obj) => {
        return obj.id === id;
      });
    },
    showDelete(id) {
      this.deleteClicked = true;
      this.tempModule = this.modules.find((obj) => {
        return obj.id === id;
      });
    },
    checkMove: function (e) {
      window.console.log("Future index: " + e.draggedContext.futureIndex);
    },
    getAllModules: function () {
      const instance = axios.create({
        baseURL: this.url,
      });
      instance
        .get("/admin/module")
        .then((data) => {
          console.log(data)
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
        });
    },
    createModule() {
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
      });
      instance
        .post("admin/module", {
          name: this.tempModule.name,
          status: this.tempModule.status,
          color_hex: this.tempModule.color_hex,
        })
        .then((data) => {
          this.isLoading = false;
          this.getAllModules();
          this.resetModule();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateModule() {
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
      });
      instance
        .post("admin/module/" + this.tempModule.id, {
          _method: "PATCH",
          name: this.tempModule.name,
          status: this.tempModule.status,
          color_hex: this.tempModule.color_hex,
        })
        .then((data) => {
          this.isLoading = false;
          this.getAllModules();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteModule() {
      this.deleteClicked = false;
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
      });
      instance
        .post("admin/module/" + this.tempModule.id, {
          _method: "DELETE",
        })
        .then((data) => {
          this.isLoading = false;
          this.getAllModules();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>