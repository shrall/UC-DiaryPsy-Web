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
          <td>: {{ tempQuestion.question }}</td>
        </tr>
        <tr>
          <td>Tipe</td>
          <td>: {{ tempQuestion.questiontype.name }}</td>
        </tr>
      </table>
      <div class="admin-button-red" @click="deleteQuestion">
        <span class="fa fa-fw fa-trash"></span>Hapus
      </div>
    </div>
  </div>
  <div class="grid grid-cols-12 font-nunito bg-neutral-100">
    <div class="col-span-2">
      <Sidebar activeNav="question" />
    </div>
    <div class="col-span-10 p-4">
      <div class="admin-card text-heading mb-8">Quiz - {{ modelName }}</div>
      <div class="grid grid-cols-12 gap-x-4">
        <div class="col-span-4 admin-card">
          <div class="flex justify-between mb-4">
            <div class="text-heading">Urutan pertanyaan</div>
            <div
              :class="editToggled ? 'admin-button-blue' : 'admin-button-white'"
              @click="toggleEdit"
            >
              <span class="fa fa-fw fa-edit"></span>
              Edit
            </div>
          </div>
          <draggable
            :key="questions"
            :list="questions"
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
                <div class="text-2xl font-bold">{{ element.order }}</div>
                <div v-if="element.questiontype_id == 1">
                  {{ element.question }}
                </div>
                <div v-else>
                  {{element.questiontype.name}}
                </div>
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
              {{ !tempQuestion.id ? "Tambah Pertanyaan" : "Edit Pertanyaan" }}
            </div>
          </div>
          <div class="flex flex-col gap-y-2">
            <form id="create-quiz" method="post">
              <div class="flex flex-col group">
                <label for="questiontype_id" class="admin-input-label-kasih">
                  Tipe
                </label>
                <select
                  name="questiontype_id"
                  id="questiontype_id"
                  class="admin-input-kasih"
                  v-model="tempQuestion.questiontype_id"
                >
                  <option
                    v-for="questiontype in questiontypes"
                    :key="questiontype"
                    :value="questiontype.id"
                  >
                    {{ questiontype.name }}
                  </option>
                </select>
              </div>
              <div
                class="flex flex-col group"
                v-if="tempQuestion.questiontype_id == 1"
              >
                <label for="question" class="admin-input-label-kasih"
                  >Pertanyaan
                </label>
                <textarea
                  type="text"
                  name="question"
                  class="admin-input-kasih"
                  v-model="tempQuestion.question"
                ></textarea>
              </div>
            </form>
            <div class="flex">
              <button
                @click="!tempQuestion.id ? createQuestion() : updateQuestion()"
                type="submit"
                :disabled="tempQuestion.questiontype_id == null"
                class="font-bold text-lg"
                :class="
                  !tempQuestion.id ? 'admin-button-green' : 'admin-button-blue'
                "
              >
                {{ !tempQuestion.id ? "Tambah" : "Simpan" }}
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
      pageModel: "Question",
      enabled: true,
      modelName: null,
      questions: [],
      questiontypes: [],
      editToggled: false,
      tempQuestion: {
        id: null,
        question: null,
        status: null,
        order: null,
        quiz_id: this.id,
        questiontype_id: null,
        questiontype: {
          id: null,
          name: null,
        },
      },
      deleteClicked: false,
      isLoading: true,
    };
  },
  created() {
    this.getQuizDetail();
    this.getAllQuestionTypes();
  },
  methods: {
    resetQuestion: function () {
      this.tempQuestion = {
        id: null,
        question: null,
        status: null,
        order: null,
        quiz_id: this.id,
        questiontype_id: null,
        questiontype: {
          id: null,
          name: null,
        },
      };
    },
    toggleEdit: function () {
      this.editToggled = !this.editToggled;
      if (!this.editToggled) {
        this.resetQuestion();
      }
    },
    dragEnd: function (e) {
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
      });
      instance
        .post("admin/question/reorder", {
          questions: this.questions,
        })
        .then((data) => {
          this.isLoading = false;
          this.getQuizDetail();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showEdit(id) {
      this.tempQuestion = this.questions.find((obj) => {
        return obj.id === id;
      });
    },
    showDelete(id) {
      this.deleteClicked = true;
      this.tempQuestion = this.questions.find((obj) => {
        return obj.id === id;
      });
    },
    getQuizDetail: function () {
      const instance = axios.create({
        baseURL: this.url,
      });
      instance
        .get("/admin/quiz/" + this.id)
        .then((data) => {
          this.isLoading = false;
          this.modelName = data.data.data.results.name;
          this.questions = data.data.data.results.questions.map((item) => {
            return {
              id: item.id,
              question: item.question,
              order: item.order,
              quiz_id: item.quiz_id,
              questiontype_id: item.questiontype_id,
              questiontype: item.questiontype,
            };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllQuestionTypes: function () {
      const instance = axios.create({
        baseURL: this.url,
      });
      instance
        .get("/admin/questiontype")
        .then((data) => {
          this.questiontypes = data.data.data.results.map((item) => {
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
    createQuestion() {
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
      });
      instance
        .post("admin/question", {
          question: this.tempQuestion.question,
          quiz_id: this.tempQuestion.quiz_id,
          questiontype_id: this.tempQuestion.questiontype_id,
        })
        .then((data) => {
          this.isLoading = false;
          this.getQuizDetail();
          this.resetQuestion();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateQuestion() {
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
      });
      instance
        .post("admin/question/" + this.tempQuestion.id, {
          _method: "PATCH",
          question: this.tempQuestion.question,
        })
        .then((data) => {
          this.isLoading = false;
          this.getQuizDetail();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteQuestion() {
      this.deleteClicked = false;
      this.isLoading = true;
      const instance = axios.create({
        baseURL: this.url,
      });
      instance
        .post("admin/question/" + this.tempQuestion.id, {
          _method: "DELETE",
        })
        .then((data) => {
          this.isLoading = false;
          this.getQuizDetail();
          this.toggleEdit();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>