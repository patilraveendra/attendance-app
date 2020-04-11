<template>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons"
    />
    <title>Attendance</title>
  </head>

  <body>
    <div id="app">
      <Navigation v-if="currentUser"></Navigation>
      <router-view />
    </div>
  </body>
</html>
</template>

<script>
import { mapState } from "vuex";
import Navigation from "./components/Navigation.vue";
export default {
  name:"App",
  components: { Navigation },
  computed: {
    ...mapState(["currentUser"])
  }
};
</script>