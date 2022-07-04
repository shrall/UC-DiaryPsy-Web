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
      rounded-r-3xl
    "
  >
    <div class="text-xl font-bold mb-4">Hello, Anonymous</div>
    <div class="text-xl font-bold">Questions</div>
    <div class="flex flex-col gap-y-2 ml-4 mb-4">
      <div
        @click="clickNav('module')"
        class="cursor-pointer hover:text-gray-300"
      >
        <span
          v-if="activeNav == 'module'"
          class="fa fa-fw fa-chevron-right"
        ></span>
        Module
      </div>
      <div
        @click="clickNav('character')"
        class="cursor-pointer hover:text-gray-300"
      >
        <span
          v-if="activeNav == 'character'"
          class="fa fa-fw fa-chevron-right"
        ></span>
        Character
      </div>
      <div @click="clickNav('quiz')" class="cursor-pointer hover:text-gray-300">
        <span
          v-if="activeNav == 'quiz'"
          class="fa fa-fw fa-chevron-right"
        ></span>
        Quiz
      </div>
      <div
        @click="clickNav('question')"
        class="cursor-pointer hover:text-gray-300"
      >
        <span
          v-if="activeNav == 'question'"
          class="fa fa-fw fa-chevron-right"
        ></span>
        Question
      </div>
      <div
        @click="clickNav('quiztype')"
        class="cursor-pointer hover:text-gray-300"
      >
        <span
          v-if="activeNav == 'quiztype'"
          class="fa fa-fw fa-chevron-right"
        ></span>
        Quiz Type
      </div>
    </div>
    <div class="text-xl font-bold">Users</div>
    <div class="flex flex-col gap-y-2 ml-4 mb-4">
      <div
        @click="clickNav('user')"
        class="cursor-pointer hover:text-gray-300"
      >
        <span
          v-if="activeNav == 'user'"
          class="fa fa-fw fa-chevron-right"
        ></span>
        User
      </div>
      <div
        @click="clickNav('tribe')"
        class="cursor-pointer hover:text-gray-300"
      >
        <span
          v-if="activeNav == 'tribe'"
          class="fa fa-fw fa-chevron-right"
        ></span>
        Tribe
      </div>
      <div @click="clickNav('religion')" class="cursor-pointer hover:text-gray-300">
        <span
          v-if="activeNav == 'religion'"
          class="fa fa-fw fa-chevron-right"
        ></span>
        Religion
      </div>
      <div
        @click="clickNav('institute')"
        class="cursor-pointer hover:text-gray-300"
      >
        <span
          v-if="activeNav == 'institute'"
          class="fa fa-fw fa-chevron-right"
        ></span>
        Institute
      </div>
      <div
        @click="clickNav('city')"
        class="cursor-pointer hover:text-gray-300"
      >
        <span
          v-if="activeNav == 'city'"
          class="fa fa-fw fa-chevron-right"
        ></span>
        City
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