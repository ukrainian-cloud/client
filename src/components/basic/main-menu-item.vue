<script lang="ts"></script>

<script setup lang="ts">
defineProps<{
	icon: string;
	text: string;
	link: string;
	disabled?: boolean;
}>();
</script>

<template>
	<RouterLink to="/" class="menu-item" :disabled="disabled">{{
		text
	}}</RouterLink>
</template>

<style scoped>
.menu-item {
	background-color: gray;
	border-radius: 3px;
}
</style>
