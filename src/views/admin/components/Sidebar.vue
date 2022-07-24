<template>
  <div
    class="
      flex flex-col
      gap-y-1
      bg-kasih-300
      px-4
      py-12
      text-light
      min-h-screen
      h-full
      rounded-r-3xl
    "
  >
    <div class="text-heading mb-4">Halo, Anonymous</div>
    <div class="text-heading">Pertanyaan</div>
    <div class="flex flex-col gap-y-2 ml-4 mb-4">
      <router-link :to="{ name: 'ModuleIndex' }">
        <div class="cursor-pointer hover:text-gray-300">
          <span
            v-if="activeNav == 'module'"
            class="fa fa-fw fa-chevron-right"
          ></span>
          Modul
        </div>
      </router-link>
    </div>
    <div class="text-heading">Users</div>
    <div class="flex flex-col gap-y-2 ml-4 mb-4">
      <router-link :to="{ name: 'UserIndex' }">
        <div class="cursor-pointer hover:text-gray-300">
          <span
            v-if="activeNav == 'user'"
            class="fa fa-fw fa-chevron-right"
          ></span>
          User
        </div>
      </router-link>
      <router-link :to="{ name: 'TribeIndex' }">
        <div class="cursor-pointer hover:text-gray-300">
          <span
            v-if="activeNav == 'tribe'"
            class="fa fa-fw fa-chevron-right"
          ></span>
          Suku
        </div>
      </router-link>
      <router-link :to="{ name: 'ReligionIndex' }">
        <div class="cursor-pointer hover:text-gray-300">
          <span
            v-if="activeNav == 'religion'"
            class="fa fa-fw fa-chevron-right"
          ></span>
          Agama
        </div>
      </router-link>
      <router-link :to="{ name: 'InstituteIndex' }">
      <div class="cursor-pointer hover:text-gray-300">
        <span
          v-if="activeNav == 'institute'"
          class="fa fa-fw fa-chevron-right"
        ></span>
        Institusi
      </div>
      </router-link>
      <div class="cursor-pointer hover:text-gray-300">
        <span
          v-if="activeNav == 'education'"
          class="fa fa-fw fa-chevron-right"
        ></span>
        Pendidikan
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  activeNav: String,
  clickNav: { type: Function },
});
</script>