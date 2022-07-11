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
          <td>: {{ tempCharacter.name }}</td>
        </tr>
        <tr>
          <td>Status</td>
          <td>: {{ tempCharacter.status == "0" ? "Tidak Aktif" : "Aktif" }}</td>
        </tr>
      </table>
      <div class="admin-button-red" @click="deleteCharacter">
        <span class="fa fa-fw fa-trash"></span>Hapus
      </div>
    </div>
  </div>
  <div class="grid grid-cols-12 font-nunito bg-neutral-100">
    <div class="col-span-2">
      <Sidebar activeNav="character" />
    </div>
    <div class="col-span-10 p-4">
      <div class="admin-card text-heading mb-8">Modul - {{ modelName }}</div>
      <div class="grid grid-cols-12 gap-x-4">
        <div class="col-span-4 admin-card">
          <div class="flex justify-between mb-4">
            <div class="text-heading">Urutan {{ pageModel }}</div>
            <div
              :class="editToggled ? 'admin-button-blue' : 'admin-button-white'"
              @click="toggleEdit"
            >
              <span class="fa fa-fw fa-edit"></span>
              Edit
            </div>
          </div>
          <draggable
            :key="characters"
            :list="characters"
            :disabled="!enabled"
            handle=".model-item-drag-handle"
            item-key="order"
            class="list-group"
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
                <router-link :to="{ path: `/character/${element.id}` }" class="hover:text-blue-500">
                  {{ element.name }}
                </router-link>
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
              {{
                !tempCharacter.id ? "Tambah " + pageModel : "Edit " + pageModel
              }}
            </div>
          </div>
          <div class="flex flex-col gap-y-2">
            <form id="create-character" method="post">
              <div class="flex flex-col group">
                <label for="name" class="admin-input-label-kasih">Name</label>
                <input
                  type="text"
                  name="name"
                  class="admin-input-kasih"
                  v-model="tempCharacter.name"
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
                  v-model="tempCharacter.status"
                >
                  <option value="1" selected>Aktif</option>
                  <option value="0">Tidak Aktif</option>
                </select>
              </div>
            </form>
            <div class="flex">
              <button
                @click="
                  !tempCharacter.id ? createCharacter() : updateCharacter()
                "
                type="submit"
                :disabled="!tempCharacter.name || tempCharacter.status == null"
                class="font-bold text-lg"
                :class="
                  !tempCharacter.id ? 'admin-button-green' : 'admin-button-blue'
                "
              >
                {{ !tempCharacter.id ? "Tambah" : "Simpan" }}
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
export default {
  components: {
    draggable,
  },
  props: ["id"],
  data() {
    return {
      pageModel: "Karakter",
      enabled: true,
      modelName: null,
      characters: [],
      editToggled: false,
      tempCharacter: {
        id: null,
        name: null,
        status: null,
        order: null,
        module_id: null,
      },
      deleteClicked: false,
      isLoading: false,
    };
  },
  created() {
    this.getModuleDetail();
  },
  methods: {
    resetCharacter: function () {
      this.tempCharacter = {
        id: null,
        name: null,
        status: null,
        order: null,
        module_id: null,
      };
    },
    toggleEdit: function () {
      this.editToggled = !this.editToggled;
      if (!this.editToggled) {
        this.resetCharacter();
      }
    },
    dragEnd: function (e) {
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
      });
      instance
        .post("admin/character/reorder", {
          characters: this.characters,
        })
        .then((data) => {
          this.isLoading = false;
          this.getModuleDetail();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showEdit(id) {
      this.tempCharacter = this.characters.find((obj) => {
        return obj.id === id;
      });
      console.log(this.tempCharacter);
    },
    showDelete(id) {
      this.deleteClicked = true;
      this.tempCharacter = this.characters.find((obj) => {
        return obj.id === id;
      });
    },
    getModuleDetail: function () {
      const instance = axios.create({
        baseURL: this.url,
      });
      instance
        .get("/admin/module/" + this.id)
        .then((data) => {
          this.modelName = data.data.data.results.name;
          this.characters = data.data.data.results.characters.map((item) => {
            return {
              id: item.id,
              name: item.name,
              status: item.status,
              order: item.order,
              module_id: item.module_id,
            };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createCharacter() {
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
      });
      instance
        .post("admin/character", {
          name: this.tempCharacter.name,
          status: this.tempCharacter.status,
          module_id: this.id,
        })
        .then((data) => {
          this.isLoading = false;
          this.getModuleDetail();
          this.resetCharacter();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateCharacter() {
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
      });
      instance
        .post("admin/character/" + this.tempCharacter.id, {
          _method: "PATCH",
          name: this.tempCharacter.name,
          status: this.tempCharacter.status,
        })
        .then((data) => {
          this.isLoading = false;
          this.getModuleDetail();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteCharacter() {
      this.deleteClicked = false;
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
      });
      instance
        .post("admin/character/" + this.tempCharacter.id, {
          _method: "DELETE",
        })
        .then((data) => {
          this.isLoading = false;
          this.getModuleDetail();
          this.resetCharacter();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>