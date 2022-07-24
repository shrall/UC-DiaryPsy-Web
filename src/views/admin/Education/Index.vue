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
          <td>: {{ tempEducation.name }}</td>
        </tr>
      </table>
      <div class="admin-button-red" @click="deleteEducation">
        <span class="fa fa-fw fa-trash"></span>Hapus
      </div>
    </div>
  </div>
  <div class="grid grid-cols-12 font-nunito bg-neutral-100">
    <div class="col-span-2">
      <Sidebar activeNav="education" />
    </div>
    <div class="col-span-10 p-4">
      <div class="admin-card mb-8 flex justify-between">
        <div class="text-heading">{{ pageModel }}</div>
        <router-link :to="{ name: 'EducationCreate' }">
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
          :rowData="educations.value"
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
    const educations = reactive({
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
            activeNav: "education"
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
      educations,
      columnDefs,
    };
  },
  data() {
    return {
      pageModel: "Education",
      tempEducation: {
        id: null,
        name: null,
      },
      deleteClicked: false,
      isLoading: false,
    };
  },
  methods: {
    getAllEducations: function () {
      const instance = axios.create({
        baseURL: this.url,
      });
      instance
        .get("/admin/education")
        .then((data) => {
          this.isLoading = false;
          this.educations.value = data.data.data.results.map((item) => {
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
      this.tempEducation = this.educations.value.find((obj) => {
        return obj.id === id;
      });
    },
    deleteEducation() {
      this.deleteClicked = false;
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
      });
      instance
        .post("admin/education/" + this.tempEducation.id, {
          _method: "DELETE",
        })
        .then((data) => {
          this.isLoading = false;
          this.getAllEducations();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getAllEducations();
  },
};
</script>