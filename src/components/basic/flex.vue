<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const container = ref<HTMLDivElement>();
const emit = defineEmits(['resize']);
const observer = new ResizeObserver(([entry]) => {
	emit('resize', {
		width: entry.borderBoxSize[0].inlineSize,
		height: entry.borderBoxSize[0].blockSize,
	});
});

defineProps<{
	direction?: 'row' | 'column';
	gap?: string;
	grow?: number;
}>();

onMounted(() => {
	observer.observe(container.value!);
});

onBeforeUnmount(() => {
	observer.unobserve(container.value!);
});
</script>

<template>
	<div ref="container" class="flex">
		<slot />
	</div>
</template>

<style scoped>
.flex {
	display: flex;
}
</style>
