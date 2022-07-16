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
      <form method="post" id="create-user">
        <div class="admin-card text-heading mb-8">Buat {{ pageModel }}</div>
        <div class="flex flex-col gap-y-2 admin-card">
          <div class="flex items-center gap-2">
            <img
              id="user-photo"
              :src="tempUser.photo"
              class="rounded-full w-24 h-24"
            />
            <div class="flex flex-col gap-1">
              <div class="flex">
                <label for="photo" class="admin-button-blue">
                  <span class="fa fa-fw fa-upload"></span>Upload Gambar
                </label>
              </div>
              <div class="text-caption">{{ tempUser.photo_name }}</div>
              <input
                type="file"
                name="photo"
                id="photo"
                class="hidden"
                @change="onFileChange"
              />
            </div>
          </div>
          <div class="flex flex-col group">
            <label for="name" class="admin-input-label-kasih">Name</label>
            <input
              type="text"
              name="name"
              class="admin-input-kasih"
              v-model="tempUser.name"
            />
          </div>
          <div class="flex flex-col group">
            <label for="email" class="admin-input-label-kasih">E-Mail</label>
            <input
              type="email"
              name="email"
              class="admin-input-kasih"
              v-model="tempUser.email"
            />
          </div>
          <div class="flex flex-col group">
            <label for="password" class="admin-input-label-kasih">
              Password
            </label>
            <input
              type="password"
              name="password"
              class="admin-input-kasih"
              v-model="tempUser.password"
            />
          </div>
          <div class="flex flex-col group">
            <label for="password_confirmation" class="admin-input-label-kasih">
              Password Confirmation
            </label>
            <input
              type="password"
              name="password_confirmation"
              class="admin-input-kasih"
              v-model="tempUser.password_confirmation"
            />
          </div>
          <div class="flex flex-col group">
            <label for="year_born" class="admin-input-label-kasih">
              Tahun Lahir
            </label>
            <input
              type="number"
              name="year_born"
              class="admin-input-kasih"
              v-model="tempUser.year_born"
            />
          </div>
          <div class="flex flex-col group">
            <label for="phone" class="admin-input-label-kasih"> Telepon </label>
            <input
              type="text"
              name="phone"
              class="admin-input-kasih"
              v-model="tempUser.phone"
            />
          </div>
          <div class="flex flex-col group">
            <label for="address" class="admin-input-label-kasih">
              Alamat
            </label>
            <input
              type="text"
              name="address"
              class="admin-input-kasih"
              v-model="tempUser.address"
            />
          </div>
          <div class="flex flex-col group">
            <label for="institute" class="admin-input-label-kasih">
              Institusi
            </label>
            <select name="institute" id="institute" class="admin-input-kasih">
              <option
                v-for="institute in institutes"
                :key="institute.id"
                value="{{institute.id}}"
              >
                {{ institute.name }}
              </option>
            </select>
          </div>
          <div class="flex flex-col group">
            <label for="religion" class="admin-input-label-kasih">
              Agama
            </label>
            <select name="religion" id="religion" class="admin-input-kasih">
              <option
                v-for="religion in religions"
                :key="religion.id"
                value="{{religion.id}}"
              >
                {{ religion.name }}
              </option>
            </select>
          </div>
          <div class="flex flex-col group">
            <label for="tribe" class="admin-input-label-kasih"> Suku </label>
            <select name="tribe" id="tribe" class="admin-input-kasih">
              <option
                v-for="tribe in tribes"
                :key="tribe.id"
                value="{{tribe.id}}"
              >
                {{ tribe.name }}
              </option>
            </select>
          </div>
          <div class="flex flex-col group">
            <label for="city" class="admin-input-label-kasih">
              Institusi
            </label>
            <select name="city" id="city" class="admin-input-kasih">
              <option v-for="city in cities" :key="city.id" value="{{city.id}}">
                {{ city.name }}
              </option>
            </select>
          </div>
          <div class="flex items-center justify-end">
            <div class="admin-button-green">Submit</div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "../components/Sidebar.vue";
</script>

<script>
export default {
  components: {},
  data() {
    return {
      pageModel: "User",
      tempUser: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
        year_born: null,
        phone: null,
        photo: null,
        photo_name: null,
        address: null,
        institute_id: 1,
        religion_id: 1,
        tribe_id: 1,
        city_id: 1,
        role_id: 1,
      },
      institutes: [
        {
          id: 1,
          name: "SCB",
        },
        {
          id: 2,
          name: "St.Louis",
        },
      ],
      religions: [
        {
          id: 1,
          name: "Katolik",
        },
        {
          id: 2,
          name: "Kristen",
        },
      ],
      tribes: [
        {
          id: 1,
          name: "Dayak",
        },
        {
          id: 2,
          name: "Tionghoa",
        },
      ],
      cities: [
        {
          id: 1,
          name: "Surabaya",
        },
        {
          id: 2,
          name: "Jakarta",
        },
      ],
      roles: [
        {
          id: 1,
          name: "User",
        },
        {
          id: 2,
          name: "Admin",
        },
      ],
      isLoading: false,
    };
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.tempUser.photo = URL.createObjectURL(file);
      this.tempUser.photo_name = file.name;
    },
  },
};
</script>