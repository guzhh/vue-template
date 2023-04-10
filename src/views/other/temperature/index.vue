<template>
	<page-content>
		<n-card size="small" title="三测单">
			<temperature ref="temperatureRef"></temperature>
		</n-card>
	</page-content>
</template>

<script setup>
import Temperature from "@/components/Temperature/index.vue";

defineOptions({ name: "modal" });
</script>

<style scoped></style>
