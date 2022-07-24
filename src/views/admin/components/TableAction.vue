<template>
  <div class="flex items-center gap-2">
    <a :href="`/${this.params.context.componentParent.pageModel}/edit/${params.data.id}`">
      <div class="admin-button-blue">
        <span class="fa fa-fw fa-edit"></span>
      </div>
    </a>
    <a @click="showDelete(params.data.id)">
      <div class="admin-button-red">
        <span class="fa fa-fw fa-trash"></span>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "TableAction",
  methods: {
    showDelete(id) {
      this.params.context.componentParent.showDelete(id);
    },
  },
};
</script>