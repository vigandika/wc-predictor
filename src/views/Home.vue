<template>
  <div class="home">
    <Predictor />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Predictor from '@/components/Predictor.vue'; // @ is an alias to /src

@Component({
  components: {
    Predictor,
  },
})
export default class Home extends Vue {}
</script>
