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
      <div class="admin-card mb-8 flex justify-between">
        <div class="text-heading">{{ pageModel }}</div>
        <router-link :to="{ name: 'UserCreate' }">
          <div class="admin-button-green">
            <span class="fa fa-fw fa-plus"></span>
            Buat
          </div></router-link
        >
      </div>
      <div class="admin-card w-full h-vh-80">
        <ag-grid-vue
          class="ag-theme-alpine"
          style="width: 100%; height: 100%"
          :columnDefs="columnDefs.value"
          :rowData="users.value"
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
import Sidebar from "../components/Sidebar.vue";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";
import { reactive } from "vue";
export default {
  components: {
    AgGridVue,
    Sidebar,
  },
  setup() {
    const users = reactive({
      value: [
        {
          id: 1,
          name: "kurnin",
          email: "korni@gmail.com",
        },
        {
          id: 2,
          name: "monica",
          email: "monica@gmail.com",
        },
      ],
    });
    const columnDefs = reactive({
      value: [
        { field: "name" },
        { field: "email" },
        {
          field: "action",
          cellRenderer: (params) => {
            console.log(params.data);
            return `
      <div class="flex items-center gap-2">
        <div class="admin-button-green">
          <span class="fa fa-fw fa-eye"></span>
        </div>
        <div class="admin-button-blue">
          <span class="fa fa-fw fa-edit"></span>
        </div>
      </div>`;
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
      users,
      columnDefs,
    };
  },
  data() {
    return {
      pageModel: "User",
      isLoading: false,
    };
  },
  methods: {},
};
</script>