<template>
  <router-view></router-view>
</template>

<script>
export default {
  setup() {},
  beforeMount() {
    this.checkLogin();
  },
  watch: {
    $route(to) {
      document.title = `Diary - ${to.meta.title}`;
    },
  },
  methods: {},
  created() {},
};
</script>
