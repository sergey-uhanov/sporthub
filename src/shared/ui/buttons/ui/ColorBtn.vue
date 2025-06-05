
<script setup lang="ts">
interface Props {
  color?: string;
  size: string;
  background?: string;
  padding: string;
  disabled?: boolean; // Просто указываем тип boolean
  disabledColor?: string;
  disabledBackground?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

</script>
<template>
      <button
          class="color-button"
          :style="{
            color: props.disabled ? '#ffffff' : props.color,
            fontSize: props.size + 'px',
            background: props.disabled ? '#6d6d6e' :props.background,
            padding: props.padding
          }"
          :disabled="props.disabled"
      >
        <slot/>
      </button>

</template>

<style lang="scss">
.color-button{
  font-weight: 600;
  border-radius: 8px;
  background: $light;
  color: $white-color;
  line-height: 1.3;
}
</style>