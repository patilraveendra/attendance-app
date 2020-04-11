<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div> RAveendra Home page </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

