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
      <div class="admin-button-red">
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
            item-key="id"
            class="list-group"
            :move="checkMove"
            @start="dragging = true"
            @end="dragEnd"
          >
            <template #item="{ element }">
              <div
                class="
                  list-group-item
                  bg-kasih-200
                  mb-2
                  rounded-lg
                  p-4
                  flex
                  gap-2
                  items-center
                "
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
                  type="text"
                  name="color_hex"
                  class="admin-input-kasih"
                  v-model="tempModule.color_hex"
                />
              </div>
            </form>
            <div class="flex">
              <div
                class="font-bold text-lg"
                :class="
                  !tempModule.id ? 'admin-button-green' : 'admin-button-blue'
                "
              >
                {{ !tempModule.id ? "Tambah" : "Simpan" }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "./components/Sidebar.vue";
</script>

<script>
import draggable from "vuedraggable";
let id = 1;
export default {
  components: {
    draggable,
  },
  data() {
    return {
      pageModel: "Modul",
      enabled: true,
      modules: [
        { name: "Kasih", id: 1, status: 1, color_hex: "#fffe00" },
        { name: "Sukacita", id: 2, status: 1, color_hex: "#fffe00" },
        { name: "Damai Sejahtera", id: 3, status: 0, color_hex: "#fffe00" },
      ],
      editToggled: false,
      tempModule: { name: null, id: null, status: null, color_hex: null },
      deleteClicked: false,
      isLoading: false,
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
    dragEnd: function (e) {
      window.console.log(e.oldIndex);
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
  },
};
</script>