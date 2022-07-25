<template>
  <div
    class="
      flex
      items-center
      justify-center
      bg-neutral-100
      min-h-screen
      font-nunito
    "
  >
    <div class="admin-card w-vw-60">
      <div class="text-heading">Login Administrator Area</div>
      <form id="login" method="post">
        <div class="flex flex-col group">
          <label for="email" class="admin-input-label-kasih">E-Mail</label>
          <input
            type="text"
            name="email"
            class="admin-input-kasih"
            v-model="userEmail"
          />
        </div>
        <div class="flex flex-col group">
          <label for="password" class="admin-input-label-kasih">Password</label>
          <input
            type="password"
            name="password"
            class="admin-input-kasih"
            v-model="userPassword"
          />
        </div>
      </form>
      <div class="flex items-center justify-center mt-4">
        <div class="admin-button-blue" @click="submitLogin" v-if="!isSubmitted">
          Login
        </div>
        <div class="admin-button-blue" v-else>
          <div class="animate-spin">
            <span class="fa fa-fw fa-circle-notch"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      isSubmitted: false,
      userEmail: null,
      userPassword: null,
    };
  },
  methods: {
    submitLogin: function () {
      if (this.userEmail && this.userPassword) {
        this.isSubmitted = true;
        let self = this;
        axios
          .post(this.url + "login", {
            email: this.userEmail,
            password: this.userPassword,
          })
          .then((data) => {
            localStorage["access_token"] = data.data.data.results.access_token;
            localStorage["user_id"] = data.data.data.results.user_id;
            localStorage["role_id"] = data.data.data.results.role_id;
            self.$router.push("/");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("E-Mail / Password belum di isi!");
      }
    },
  },
};
</script>