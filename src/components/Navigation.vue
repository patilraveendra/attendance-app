<template>
<html>
  <div class="phone-viewport">
    <md-toolbar class="md-accent" md-elevation="1">
      <h3 class="md-title" style="flex: 1">Title</h3>
      <md-button>Home</md-button>
      <md-button @click="logout" class="md-primary">Logout</md-button>
    </md-toolbar>
  </div>
</html>
</template>

<script>
const fb = require("../firebaseConfig.ts");
export default {
  methods: {
    logout() {
      fb.auth
        .signOut()
        .then(() => {
          this.$store.dispatch("clearData");
          this.$router.push("/login");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>