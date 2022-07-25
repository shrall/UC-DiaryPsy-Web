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
    class="admin-outer-modal z-50"
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
          <td>: {{ tempTribe.name }}</td>
        </tr>
      </table>
      <div class="admin-button-red" @click="deleteTribe">
        <span class="fa fa-fw fa-trash"></span>Hapus
      </div>
    </div>
  </div>
  <div class="grid grid-cols-12 font-nunito bg-neutral-100">
    <div class="col-span-2">
      <Sidebar activeNav="tribe" />
    </div>
    <div class="col-span-10 p-4">
      <div class="admin-card mb-8 flex justify-between">
        <div class="text-heading">{{ pageModel }}</div>
        <router-link :to="{ name: 'TribeCreate' }">
          <div class="admin-button-green">
            <span class="fa fa-fw fa-plus"></span>
            Buat
          </div>
        </router-link>
      </div>
      <div class="admin-card w-full h-vh-80">
        <ag-grid-vue
          class="ag-theme-alpine"
          style="width: 100%; height: 100%"
          :context="context"
          :columnDefs="columnDefs.value"
          :rowData="tribes.value"
          :pagination="true"
          :paginationAutoPageSize="true"
          :defaultColDef="defaultColDef"
        >
        </ag-grid-vue>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Sidebar from "../components/Sidebar.vue";
import TableAction from "../components/TableAction.vue";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";
import { reactive } from "vue";
export default {
  beforeMount() {
    this.context = {
      componentParent: this,
    };
  },
  components: {
    AgGridVue,
    Sidebar,
    TableAction,
  },
  setup() {
    const tribes = reactive({
      value: [],
    });
    const columnDefs = reactive({
      value: [
        { field: "id" },
        { field: "name" },
        {
          field: "action",
          cellRenderer: "TableAction",
          cellRendererParams: {
            clicked(field) {
              alert(`deleted`);
            },
          },
        },
      ],
    });
    const defaultColDef = {
      flex: 1,
      sortable: true,
      filter: true,
    };

    return {
      defaultColDef,
      tribes,
      columnDefs,
    };
  },
  data() {
    return {
      pageModel: "Tribe",
      tempTribe: {
        id: null,
        name: null,
      },
      deleteClicked: false,
      isLoading: false,
    };
  },
  methods: {
    getAllTribes: function () {
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: 'Bearer ' + localStorage['access_token'] },
      });
      instance
        .get("/admin/tribe")
        .then((data) => {
          this.isLoading = false;
          this.tribes.value = data.data.data.results.map((item) => {
            return {
              id: item.id,
              name: item.name,
            };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showDelete(id) {
      this.deleteClicked = true;
      this.tempTribe = this.tribes.value.find((obj) => {
        return obj.id === id;
      });
    },
    deleteTribe() {
      this.deleteClicked = false;
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
        headers: { Authorization: 'Bearer ' + localStorage['access_token'] },
      });
      instance
        .post("admin/tribe/" + this.tempTribe.id, {
          _method: "DELETE",
        })
        .then((data) => {
          this.isLoading = false;
          this.getAllTribes();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getAllTribes();
  },
};
</script>