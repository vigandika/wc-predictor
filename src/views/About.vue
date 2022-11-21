<template>
  <div class="about">
    <Rankings />
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Rankings from '@/components/Rankings.vue'; // @ is an alias to /src

@Component({
  components: {
    Rankings,
  },
})
export default class About extends Vue {

}
</script>
