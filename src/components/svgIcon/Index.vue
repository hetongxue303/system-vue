<template>
  <svg aria-hidden="true" class="svg-icon" :width="size" :height="size">
    <use :xlink:href="symbolId" rel="external nofollow" :fill="color"/>
  </svg>
</template>

<script setup lang="ts">
import {computed} from 'vue';

const props = defineProps({
  prefix: {type: String, default: 'icon'},
  name: {type: String, required: true},
  color: {type: String, default: ''},
  size: {type: String, defalut: '1em'}
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`);

</script>

<style scoped lang="scss">
.svg-icon {
  vertical-align: -0.15em;
  overflow: hidden;
  fill: currentColor;
}
</style>
